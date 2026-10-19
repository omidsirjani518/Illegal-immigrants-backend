// src/socket/index.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Message = require('../models/Message');
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// مسیر درست پوشه uploads
const uploadDir = path.join(__dirname, "../public/uploads");
console.log("UPLOAD DIR:", uploadDir);

// اگر پوشه وجود ندارد → بساز
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';

// کاربران آنلاین و وضعیت‌ها
const activeUserSockets = {};
const unreadCounts = {};
const publicUnreadCounts = {};

// ذخیره فایل Base64 روی دیسک
function saveBase64File(base64String, fileName) {
    const matches = base64String.match(/^data:(.+);base64,(.+)$/);

    if (!matches || matches.length !== 3) {
        throw new Error("Invalid base64 file");
    }

    const mimeType = matches[1];
    const data = matches[2];

    const originalExt = mimeType.split("/")[1];
    const cleanName = fileName.includes(".")
        ? fileName
        : `${fileName}.${originalExt}`;

    // فایل خام
    const rawName = `${Date.now()}-raw-${cleanName}`;
    const rawPath = path.join(uploadDir, rawName);

    fs.writeFileSync(rawPath, data, "base64");

    // اگر صوت نیست → همان را برگردان
    if (!mimeType.startsWith("audio/")) {
        return {
            url: `/uploads/${rawName}`,
            name: rawName,
            mime: mimeType
        };
    }

    // 🔥 تبدیل به AAC استاندارد (قابل پخش در مرورگر)
    const finalName = `${Date.now()}-audio.m4a`;
    const finalPath = path.join(uploadDir, finalName);

    try {
        execSync(
            `ffmpeg -y -i "${rawPath}" -c:a aac -b:a 128k "${finalPath}"`,
            { stdio: "ignore" }
        );

        // حذف فایل خام (اختیاری)
        // fs.unlinkSync(rawPath);

        return {
            url: `/uploads/${finalName}`,
            name: finalName,
            mime: "audio/mp4"
        };

    } catch (err) {
        console.error("FFmpeg conversion error:", err);

        // اگر تبدیل شکست خورد، نسخهٔ خام را نگه دار
        return {
            url: `/uploads/${rawName}`,
            name: rawName,
            mime: mimeType
        };
    }
}


module.exports = function socketHandler(io) {

    // ----------------- احراز هویت سوکت (JWT) -----------------
    io.use((socket, next) => {
        const token = socket.handshake.auth?.token;

        if (token) {
            try {
                const payload = jwt.verify(token, SECRET_KEY);
                socket.user = payload;
                return next();
            } catch (err) {
                return next(new Error("Authentication error"));
            }
        }

        socket.user = null;
        next();
    });

    // ----------------- تابع مشترک لاگین -----------------
    async function handleUserLogin(socket, username, isJWT) {
        socket.user = { username };
        socket.userId = username;

        // اگر قبلاً آنلاین بوده، اتصال قبلی را ببند
        if (activeUserSockets[username]) {
            const oldSocketId = activeUserSockets[username].socketId;
            const oldSocket = io.sockets.sockets.get(oldSocketId);
            if (oldSocket) {
                oldSocket.emit('disconnect_reason', 'New login detected');
                oldSocket.disconnect(true);
            }
            delete activeUserSockets[username];
        }

        const userData = await User.findOne({ username }, { color: 1, avatar: 1 });

        activeUserSockets[username] = {
            username,
            socketId: socket.id,
            color: userData?.color,
            avatar: userData?.avatar,
            currentChattingWith: null
        };

        io.emit('online_users', Object.values(activeUserSockets));

        socket.emit('loginSuccess', {
            message: 'Login successful',
            username,
            socketId: socket.id,
            jwtLogin: isJWT
        });

        if (unreadCounts[username]) {
            socket.emit('update_unread_counts', unreadCounts[username]);
        }

        if (publicUnreadCounts[username]) {
            socket.emit('update_public_unread_count', publicUnreadCounts[username]);
        }

        const lastMessages = await Message.find({ receiver: null })
            .sort({ createdAt: -1 })
            .limit(20);

        socket.emit('chat_history', lastMessages.reverse());
    }

    // ----------------- اتصال سوکت -----------------
    io.on('connection', async (socket) => {

        const getUsername = () => socket.user?.username;

        if (socket.user && socket.user.username) {
            await handleUserLogin(socket, socket.user.username, true);
        }

        socket.on('login', async (userId) => {
            if (!userId) return;
            await handleUserLogin(socket, userId, false);
        });

        // ----------------- وضعیت چت فعال -----------------
        socket.on('im_chatting_with', (targetUser) => {
            const u = getUsername();
            if (!u) return;

            activeUserSockets[u].currentChattingWith = targetUser || null;

            if (targetUser && unreadCounts[u] && unreadCounts[u][targetUser]) {
                delete unreadCounts[u][targetUser];
                socket.emit('update_unread_counts', unreadCounts[u]);
            }
        });

        // ----------------- خواندن پیام عمومی -----------------
        socket.on('mark_public_as_read', () => {
            const u = getUsername();
            if (!u) return;

            delete publicUnreadCounts[u];
            socket.emit('update_public_unread_count', 0);
        });

        // ----------------- خواندن پیام خصوصی -----------------
        socket.on('mark_private_as_read', async (targetUser) => {
            const reader = getUsername();
            if (!reader || !targetUser) return;

            await Message.updateMany(
                { sender: targetUser, receiver: reader, status: { $in: ['sent', 'delivered'] } },
                { $set: { status: 'read' } }
            );

            if (unreadCounts[reader] && unreadCounts[reader][targetUser]) {
                delete unreadCounts[reader][targetUser];
                socket.emit('update_unread_counts', unreadCounts[reader]);
            }

            const senderSocket = activeUserSockets[targetUser];
            if (senderSocket) {
                io.to(senderSocket.socketId).emit('message_status_update', {
                    status: 'read',
                    from: reader
                });
            }
        });

        // ----------------- ارسال پیام -----------------
        socket.on('send_message', async (data) => {
            const sender = getUsername();
            if (!sender) return;

            const receiver = data.receiver || null;
            const isPrivate = !!receiver;

            let fileData = null;

            if (data.file && data.file.url) {
                fileData = saveBase64File(data.file.url, data.file.name);
            }

            const msg = new Message({
                sender,
                receiver,
                text: data.text || "",
                file: fileData,
                color: activeUserSockets[sender]?.color,
                createdAt: new Date(),
                status: 'sent'
            });

            await msg.save();

            socket.emit('new_message', {
                ...msg.toObject(),
                id: data.id
            });

            // پیام خصوصی
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

                    socket.emit('message_status_update', {
                        messageIds: [msg._id.toString()],
                        status: newStatus
                    });
                }

                return;
            }

            // پیام عمومی
            socket.broadcast.emit('new_message', msg);

            Object.keys(activeUserSockets).forEach(user => {
                if (user === sender) return;
                publicUnreadCounts[user] = (publicUnreadCounts[user] || 0) + 1;
                io.to(activeUserSockets[user].socketId).emit(
                    'update_public_unread_count',
                    publicUnreadCounts[user]
                );
            });
        });

        // ----------------- تایپینگ -----------------
        socket.on('typing', (data) => {
            const sender = getUsername();
            if (!sender) return;

            if (data.target) {
                const receiverSocket = activeUserSockets[data.target];
                if (receiverSocket) {
                    io.to(receiverSocket.socketId).emit('typing', {
                        sender,
                        isTyping: data.isTyping,
                        target: data.target
                    });
                }
            } else {
                socket.broadcast.emit('typing', {
                    sender,
                    isTyping: data.isTyping,
                    target: null
                });
            }
        });

        // ----------------- قطع اتصال -----------------
        socket.on('disconnect', () => {
            const u = getUsername();
            if (!u) return;

            if (activeUserSockets[u] && activeUserSockets[u].socketId === socket.id) {
                delete activeUserSockets[u];
            }

            io.emit('online_users', Object.values(activeUserSockets));
        });
    });
};
