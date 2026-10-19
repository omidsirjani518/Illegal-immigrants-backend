// src/socket/index.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const ffmpegPath = require("ffmpeg-static");
process.env.FFMPEG_PATH = ffmpegPath;

// مسیر پوشه uploads
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';

// کاربران آنلاین و وضعیت‌ها
const activeUserSockets = {};
const unreadCounts = {};
const publicUnreadCounts = {};

// ---------------------
// صف تبدیل صدا
class AudioQueue {
    constructor(limit = 2) {
        this.limit = limit;
        this.running = 0;
        this.queue = [];
    }

    add(task) {
        return new Promise((resolve, reject) => {
            this.queue.push({ task, resolve, reject });
            this.next();
        });
    }

    next() {
        if (this.running >= this.limit) return;
        if (this.queue.length === 0) return;

        const job = this.queue.shift();
        this.running++;

        job.task()
            .then(res => job.resolve(res))
            .catch(err => job.reject(err))
            .finally(() => {
                this.running--;
                this.next();
            });
    }
}

const audioQueue = new AudioQueue(2); // تعداد تبدیل همزمان

// ---------------------
// تابع async تبدیل صدا
function convertAudio(inputPath, outputPath) {
    return new Promise((resolve, reject) => {
        const ff = spawn(process.env.FFMPEG_PATH, [
            "-y",
            "-i", inputPath,
            "-c:a", "aac",
            "-b:a", "128k",
            outputPath
        ]);

        ff.on("close", code => code === 0 ? resolve(true) : reject(new Error("ffmpeg failed")));
        ff.on("error", reject);
    });
}

// ---------------------
// ذخیره فایل Base64 (صوت و غیر صوت)
async function saveBase64File(base64String, fileName) {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);
    if (!matches) throw new Error("Invalid base64");

    const mimeType = matches[1];
    const data = matches[2];
    const ext = mimeType.split("/")[1] || "bin";
    const safeName = fileName?.includes(".") ? fileName : `${Date.now()}.${ext}`;
    const rawPath = path.join(uploadDir, safeName);
    fs.writeFileSync(rawPath, data, "base64");

    if (!mimeType.startsWith("audio/")) {
        return { url: `/uploads/${safeName}`, name: safeName, mime: mimeType };
    }

    const finalName = `${Date.now()}-audio.m4a`;
    const finalPath = path.join(uploadDir, finalName);

    try {
        await audioQueue.add(() => convertAudio(rawPath, finalPath));
        return { url: `/uploads/${finalName}`, name: finalName, mime: "audio/mp4" };
    } catch {
        return { url: `/uploads/${safeName}`, name: safeName, mime: mimeType };
    }
}

// ---------------------
// ذخیره فایل (Base64 یا URL)
async function saveFile(fileUrl, fileName, mimeType) {
    if (fileUrl.startsWith("data:")) {
        return await saveBase64File(fileUrl, fileName);
    }

    if (fileUrl.startsWith("/uploads/")) {
        const fileOnly = fileUrl.replace("/uploads/", "");
        const safePath = path.join(uploadDir, fileOnly);
        if (!fs.existsSync(safePath)) throw new Error("Source file not found: " + safePath);

        if (!mimeType?.startsWith("audio/")) {
            return { url: fileUrl, name: fileOnly, mime: mimeType };
        }

        const finalName = `${Date.now()}-audio.m4a`;
        const finalPath = path.join(uploadDir, finalName);

        try {
            await audioQueue.add(() => convertAudio(safePath, finalPath));
            return { url: `/uploads/${finalName}`, name: finalName, mime: "audio/mp4" };
        } catch {
            return { url: fileUrl, name: fileOnly, mime: mimeType };
        }
    }

    throw new Error("Invalid file url");
}

// ---------------------
// سوکت هندلر اصلی
module.exports = function socketHandler(io) {

    // JWT Middleware
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;
        if (token) {
            try { socket.user = jwt.verify(token, SECRET_KEY); } 
            catch { return next(new Error("Authentication error")); }
        }
        next();
    });

    // تابع لاگین
    async function handleUserLogin(socket, username, isJWT) {
        socket.user = { username };
        socket.userId = username;

        if (activeUserSockets[username]) {
            const oldSocket = io.sockets.sockets.get(activeUserSockets[username].socketId);
            if (oldSocket) { oldSocket.emit('disconnect_reason', 'New login detected'); oldSocket.disconnect(true); }
            delete activeUserSockets[username];
        }

        const userData = await User.findOne({ username }, { color: 1, avatar: 1 });
        activeUserSockets[username] = { username, socketId: socket.id, color: userData?.color, avatar: userData?.avatar, currentChattingWith: null };

        io.emit('online_users', Object.values(activeUserSockets));

        socket.emit('loginSuccess', { message: 'Login successful', username, socketId: socket.id, jwtLogin: isJWT });

        if (unreadCounts[username]) socket.emit('update_unread_counts', unreadCounts[username]);
        if (publicUnreadCounts[username]) socket.emit('update_public_unread_count', publicUnreadCounts[username]);

        const lastMessages = await Message.find({ receiver: null }).sort({ createdAt: -1 }).limit(20);
        socket.emit('chat_history', lastMessages.reverse());
    }

    // ----------------- اتصال سوکت -----------------
    io.on('connection', async (socket) => {
        const getUsername = () => socket.user?.username;

        if (socket.user?.username) await handleUserLogin(socket, socket.user.username, true);

        socket.on('login', async (userId) => { if (userId) await handleUserLogin(socket, userId, false); });

        // پیام خصوصی و عمومی
        socket.on('send_message', async (data) => {
            const sender = getUsername();
            if (!sender) return;

            const receiver = data.receiver || null;
            const isPrivate = !!receiver;

            let fileData = null;
            if (data.file?.url) {
                fileData = await saveFile(data.file.url, data.file.name, data.file.mime);
            }

            const msg = new Message({
                sender, receiver, text: data.text || "", file: fileData,
                color: activeUserSockets[sender]?.color,
                createdAt: new Date(),
                status: 'sent'
            });

            await msg.save();

            // emit برای فرستنده
            socket.emit('new_message', { ...msg.toObject(), id: data.id });

            if (isPrivate) {
                const receiverSocket = activeUserSockets[receiver];
                const isChatOpen = receiverSocket?.currentChattingWith === sender;

                if (!isChatOpen) {
                    unreadCounts[receiver] = unreadCounts[receiver] || {};
                    unreadCounts[receiver][sender] = (unreadCounts[receiver][sender] || 0) + 1;
                }

                if (receiverSocket) {
                    io.to(receiverSocket.socketId).emit('new_message', msg);
                    const newStatus = isChatOpen ? 'read' : 'delivered';
                    await Message.findByIdAndUpdate(msg._id, { status: newStatus });

                    socket.emit('message_status_update', { messageIds: [msg._id.toString()], status: newStatus });
                }
                return;
            }

            // پیام عمومی
            socket.broadcast.emit('new_message', msg);
            Object.keys(activeUserSockets).forEach(user => {
                if (user === sender) return;
                publicUnreadCounts[user] = (publicUnreadCounts[user] || 0) + 1;
                io.to(activeUserSockets[user].socketId).emit('update_public_unread_count', publicUnreadCounts[user]);
            });
        });

        // تایپینگ
        socket.on('typing', (data) => {
            const sender = getUsername();
            if (!sender) return;

            if (data.target) {
                const receiverSocket = activeUserSockets[data.target];
                if (receiverSocket) {
                    io.to(receiverSocket.socketId).emit('typing', { sender, isTyping: data.isTyping, target: data.target });
                }
            } else {
                socket.broadcast.emit('typing', { sender, isTyping: data.isTyping, target: null });
            }
        });

        // قطع اتصال
        socket.on('disconnect', () => {
            const u = getUsername();
            if (!u) return;
            if (activeUserSockets[u]?.socketId === socket.id) delete activeUserSockets[u];
            io.emit('online_users', Object.values(activeUserSockets));
        });
    });
};
