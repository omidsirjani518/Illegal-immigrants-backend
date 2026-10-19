// script.js

// ---------------- Global state ----------------
window.socket = null;
window.chatStarted = false;

let skip = 0;
let loadingOlder = false;
let selectedReceiver = '';
let allUsers = [];
let activeUsers = {};
let unreadMessageCounts = {};
let publicUnreadCount = 0;
let currentReplyContext = null;
let currentlyHighlightedMessageId = null;

let typingTimeout;
let isTyping = false;
let lastTargetUser = null;

const messagesDiv = document.getElementById('messages');
const MESSAGE_LIMIT = 20;
const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

function getSocket() {
    return window.socket;
}

// ---------------- Message status helpers ----------------
function getMessageStatusIcon(status, isSelf) {
    if (selectedReceiver === '' || !isSelf) return '';

    switch (status) {
        case 'read':
            return '<i class="fas fa-check-double read-icon" title="خوانده شده"></i>';
        case 'delivered':
            return '<i class="fas fa-check-double delivered-icon" title="تحویل داده شده"></i>';
        case 'sent':
            return '<i class="fas fa-check single-icon" title="ارسال شده"></i>';
        case 'sending':
            return '<i class="fa-regular fa-clock sending-icon" title="در حال ارسال" style="color:#aaa;"></i>';
        default:
            return '';
    }
}

function animateMessage(msgElement) {
    msgElement.classList.add('animate-in');
    msgElement.addEventListener('animationend', () => {
        msgElement.classList.remove('animate-in');
    });
}

// ---------------- UI helpers ----------------
function scrollBottom() {
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function autoResizeTextarea() {
    const textarea = document.getElementById('text');
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = (textarea.scrollHeight + 5) + 'px';
    updateSendButtonVisibility();
}

function updateFileNameDisplay() {
    const fileInput = document.getElementById('file');
    const textarea = document.getElementById('text');
    if (!textarea || !fileInput) return;

    if (fileInput.files.length > 0) {
        textarea.placeholder = `فایل انتخاب شده: ${fileInput.files[0].name}`;
    } else {
        textarea.placeholder = 'پیام خود را بنویسید';
    }
    updateSendButtonVisibility();
}

function updateSendButtonVisibility() {
    const sendBtn = document.getElementById('send-button');
    const recordBtn = document.getElementById('record-button');
    const textInput = document.getElementById('text');
    const fileInput = document.getElementById('file');
    if (!sendBtn || !recordBtn || !textInput || !fileInput) return;

    const hasContent = textInput.value.trim() !== '' || fileInput.files.length > 0;

    if (isRecording) {
        sendBtn.style.display = 'none';
        recordBtn.style.display = 'none';
        return;
    }

    if (hasContent) {
        sendBtn.style.display = 'flex';
        recordBtn.style.display = 'none';
    } else {
        sendBtn.style.display = 'none';
        recordBtn.style.display = 'flex';
    }
}

// ---------------- Socket & Chat Core ----------------
function startChat() {
    console.log('🔥 startChat executed');

    if (window.chatStarted) return;
    window.chatStarted = true;

    if (!window.socket) {
        window.socket = io({
            auth: { token },
            secure: true,
            transports: ['websocket']
        });
    }

    const socket = getSocket();
    console.log('socket after:', socket);
    if (!socket) return;

    // جلوگیری از ثبت چندباره listenerها
    socket.off('online_users');
    socket.off('new_message');
    socket.off('message_status_update');
    socket.off('update_unread_counts');
    socket.off('update_public_unread_count');
    socket.off('disconnect_reason');
    socket.off('typing');

    fetchUsers();

    const usernameDisplay = document.getElementById('usernameDisplay');
    const typingStatusDisplay = document.getElementById('typingStatus');

    socket.on('online_users', (users) => {
        activeUsers = users.reduce((acc, user) => {
            acc[user.username] = user;
            return acc;
        }, {});
        updateChatList();
    });

    socket.on('new_message', (msg) => {
        const isPrivate = msg.receiver !== null && msg.receiver !== undefined;
        const isCurrentChat =
            (isPrivate && (msg.receiver === selectedReceiver || msg.sender === selectedReceiver)) ||
            (!isPrivate && selectedReceiver === '');

        if (msg.sender === username && msg.id) {
            const tempElement = document.getElementById(`msg-${msg.id}`);
            if (tempElement) tempElement.remove();
        }

        if (isCurrentChat) {
            addMessage(msg);
            scrollBottom();

            if (isPrivate && msg.receiver === username && msg.sender === selectedReceiver) {
                socket.emit('mark_private_as_read', msg.sender);
            }
        }

        if (!isCurrentChat || document.hidden) {
            if (isPrivate) {
                const senderKey = msg.sender === username ? msg.receiver : msg.sender;
                unreadMessageCounts[senderKey] = (unreadMessageCounts[senderKey] || 0) + 1;
            } else {
                publicUnreadCount = (publicUnreadCount || 0) + 1;
            }

            updateChatList();
            updateTabTitle();

            if (document.hidden) {
                const notificationTitle = isPrivate ? msg.sender : 'عمومی';
                const notificationBody = msg.text || (msg.file ? msg.file.name : 'پیام جدید');
                showNotification(notificationTitle, notificationBody);
            }
        }
    });

    socket.on('message_status_update', (data) => {
        const { messageIds, status } = data;
        if (!Array.isArray(messageIds)) return;

        messageIds.forEach(id => {
            const messageElement = document.getElementById(`msg-${id}`);
            if (messageElement) {
                messageElement.dataset.status = status;

                const statusIconSpan = messageElement.querySelector('.message-status-icon');
                if (statusIconSpan) {
                    statusIconSpan.innerHTML = getMessageStatusIcon(status, true);
                }
            }
        });
    });

    socket.on('update_unread_counts', (counts) => {
        unreadMessageCounts = counts || {};
        updateChatList();
    });

    socket.on('update_public_unread_count', (count) => {
        publicUnreadCount = count || 0;
        updateChatList();
    });

    socket.on('disconnect_reason', (reason) => {
        alert(reason || 'اتصال قطع شد');
        window.location.reload();
    });

    socket.on('typing', (data) => {
        const { sender, isTyping: sTyping, target } = data;
        if (!username) return;
        if (sender === username) return;

        const isTarget = (target === selectedReceiver) || (target === null && selectedReceiver === '');

        if (sTyping && isTarget) {
            if (typingStatusDisplay) {
                typingStatusDisplay.textContent = `${sender} در حال تایپ... `;
                typingStatusDisplay.style.display = 'inline';
            }
            if (usernameDisplay) usernameDisplay.style.display = 'none';
        } else {
            if (typingStatusDisplay) typingStatusDisplay.style.display = 'none';
            if (usernameDisplay) usernameDisplay.style.display = 'inline';
        }
    });

    updateSendButtonVisibility();

    messagesDiv.addEventListener('scroll', () => {
        if (messagesDiv.scrollTop === 0 && !loadingOlder) {
            loadMessages(selectedReceiver, true);
        }
    });

    const textElem = document.getElementById('text');
    if (textElem) {
        textElem.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });
    }

    selectUserForChat('');
}

// ---------------- UI: chat list & messages ----------------
function updateChatList() {
    const userListDiv = document.getElementById('userList');
    if (!userListDiv) return;

    userListDiv.innerHTML = `
      <div class="user-item ${selectedReceiver === '' ? 'selected' : ''}" id="public-chat-item" onclick="selectUserForChat('')">
        <i class="fa-solid fa-users" style="font-size:1.2em;"></i>
        <span style="font-weight:bold;">عمومی</span>
        <span class="unread-count" id="public-unread-count" style="display:${publicUnreadCount > 0 ? 'inline-block' : 'none'};">${publicUnreadCount}</span>
      </div>
    `;

    const uniqueUsers = Array.from(new Set([
        ...allUsers.map(u => u.username),
        ...Object.keys(activeUsers).filter(u => u !== username)
    ]));

    uniqueUsers.forEach(u => {
        if (u === username) return;

        const userObj = activeUsers[u] || allUsers.find(a => a.username === u) || {};
        const isOnline = !!activeUsers[u];
        const count = unreadMessageCounts[u] || 0;

        userListDiv.innerHTML += `
          <div class="user-item ${selectedReceiver === u ? 'selected' : ''}" onclick="selectUserForChat('${u}')">
            <div style="position: relative;">
              <img src="${userObj.avatar || '/defaults/default-avatar.png'}" alt="آواتار" class="avatar">
              ${isOnline ? '<i class="fa-solid fa-circle online-dot" title="آنلاین" style="font-size: 0.7em;"></i>' : ''}
            </div>
            <span>${isOnline ? '✅' : ''} ${u}</span>
            <span class="unread-count" style="display:${count > 0 ? 'inline-block' : 'none'};">${count}</span>
          </div>
        `;
    });

    updateTabTitle();
}

async function fetchUsers() {
    try {
        const res = await fetch('/api/users/all', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
            allUsers = data;
            updateChatList();
        } else {
            console.warn('Unexpected users response', data);
        }
    } catch (err) {
        console.error('Failed to fetch all users:', err);
    }
}

function selectUserForChat(targetUser) {
    if (isRecording) {
        alert('لطفاً ابتدا ضبط صدا را متوقف کنید.');
        return;
    }

    const usernameDisplay = document.getElementById('usernameDisplay');
    const typingStatusDisplay = document.getElementById('typingStatus');
    if (typingStatusDisplay && usernameDisplay) {
        typingStatusDisplay.style.display = 'none';
        usernameDisplay.style.display = 'inline';
    }

    const socket = getSocket();

    if (targetUser !== '' && targetUser !== selectedReceiver) {
        delete unreadMessageCounts[targetUser];
        if (socket) socket.emit('mark_private_as_read', targetUser);
    }

    selectedReceiver = targetUser;
    messagesDiv.innerHTML = '<div style="text-align:center; padding: 20px;">در حال بارگذاری...</div>';

    const targetName = targetUser === '' ? 'عمومی' : targetUser;
    const display = document.getElementById('usernameDisplay');
    if (display) display.textContent = `${username} (${targetName})`;

    if (targetUser === '') {
        publicUnreadCount = 0;
        if (socket) socket.emit('mark_public_as_read');
    }

    if (socket) socket.emit('im_chatting_with', targetUser);

    updateChatList();
    loadMessages(targetUser);
    updateSendButtonVisibility();
    cancelReply();
}

async function loadMessages(targetUser = null, prepend = false) {
    if (loadingOlder) return;

    if (!prepend) {
        messagesDiv.innerHTML = '';
        skip = 0;
    }

    const currentSkip = skip;
    const targetQuery = targetUser ? `&targetUser=${encodeURIComponent(targetUser)}` : '';
    const url = `/api/messages/older?skip=${currentSkip}&limit=${MESSAGE_LIMIT}${targetQuery}`;

    loadingOlder = true;
    try {
        const res = await fetch(url, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
            const oldScrollHeight = messagesDiv.scrollHeight;
            const oldScrollTop = messagesDiv.scrollTop;

            data.forEach(msg => addMessage(msg, prepend, true));
            skip += data.length;

            if (prepend) {
                messagesDiv.scrollTop = oldScrollTop + (messagesDiv.scrollHeight - oldScrollHeight);
            } else {
                scrollBottom();
            }
        } else if (!prepend) {
            messagesDiv.innerHTML = '<div style="text-align:center; padding: 20px;">پیامی برای نمایش وجود ندارد.</div>';
        }

    } catch (err) {
        console.error('Error loading messages:', err);
        messagesDiv.innerHTML = '<div style="text-align:center; padding: 20px;">خطا در بارگذاری پیام‌ها.</div>';
    } finally {
        loadingOlder = false;
    }
}


function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

function blobToBase64(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}


// ---------------- ارسال پیام ----------------
async function sendMessage() {
    const textInput = document.getElementById('text');
    const fileInput = document.getElementById('file');
    if (!textInput || !fileInput) return;

    const text = textInput.value.trim();
    if (!text && fileInput.files.length === 0) return;

    let fileObj = null;

    if (fileInput.files.length > 0) {
        const file = fileInput.files[0];

        const base64 = await fileToBase64(file);

        fileObj = {
            url: base64,
            name: file.name,
            mime: file.type
        };
    }

    const tempId = Date.now() + Math.random().toString(36).substring(2, 9);

    const socket = getSocket();
    socket.emit("send_message", {
        id: tempId,
        text,
        file: fileObj,
        receiver: selectedReceiver || null
    });

    textInput.value = '';
    fileInput.value = '';
}

// ---------------- addMessage ----------------
function getBubbleTailSVG() {
    return `
    <svg class="bubble-tail" width="11" height="20" viewBox="0 0 11 20">
      <path d="M11 0C11 1.5 11 2.5 8 5C5 7.5 0 20 0 20L11 20V0Z"/>
    </svg>
  `;
}

function addMessage(msg, prepend = false, isHistory = false) {
    if (!msg) return;

    const div = document.createElement('div');
    const isSelf = msg.sender === username;

    div.className = `message ${isSelf ? 'self' : 'other'} animate-in`;
    div.id = `msg-${msg._id || msg.id}`;
    div.dataset.status = msg.status || 'sent';

    let content = '';
    let senderAvatar = '/defaults/default-avatar.png';

    const user = activeUsers[msg.sender] || allUsers.find(u => u.username === msg.sender) || {};
    if (user && user.avatar) senderAvatar = user.avatar;

    content += `<img src="${senderAvatar}" alt="${msg.sender}" class="message-avatar">`;
    content += `<div class="message-body-content">`;

    if (!isSelf) {
        content += `<div class="message-sender-name">${msg.sender}${msg.receiver == null ? ' (عمومی)' : ''}</div>`;
    }

    if (msg.replyTo) {
        const jumpFunction = `jumpToMessage('${msg.replyTo.messageId}')`;
        const repliedText = msg.replyTo.text || 'پیام چندرسانه‌ای';
        content += `
          <div class="reply-info" onclick="${jumpFunction}">
            <span class="original-sender">${msg.replyTo.sender}</span>
            <span>${repliedText}</span>
          </div>
        `;
    }

    /* 🔥🔥🔥 مهم‌ترین بخش: تشخیص فایل بر اساس MIME نه پسوند 🔥🔥🔥 */
    if (msg.file && msg.file.url) {
        const mime = msg.file.mime || "";
        const url = msg.file.url;

        if (mime.startsWith("image/")) {
            content += `<img src="${url}" style="max-height:200px;">`;

        } else if (mime.startsWith("video/")) {
            content += `<video controls src="${url}" style="max-height:200px;width:300px;"></video>`;

        } else if (mime.startsWith("audio/")) {
            content += `<audio controls src="${msg.file.url}"></audio>`;
        }
               
         else {
            content += `
                <a href="${url}" target="_blank" style="color:var(--primary-color); display:block; margin-top:5px;">
                    <i class="fa-solid fa-file"></i> ${msg.file.name}
                </a>`;
        }
    }

    if (msg.text) {
        const formattedText = msg.text.replace(/\n/g, '<br>');
        content += `<div class="message-text">${formattedText}</div>`;
    }

    const replyText = msg.text || (msg.file && msg.file.name ? 'فایل' : 'پیام');

    content += `<div class="message-footer">`;
    content += `<button class="reply-button" onclick="replyTo('${msg._id || msg.id}', '${msg.sender}', '${String(replyText).replace(/'/g, "\\'")}')" 
        style="font-size:0.7em;background:none;border:none;cursor:pointer;color:#888;">
        <i class="fa-solid fa-reply"></i>پاسخ</button>`;
    content += `<div class="time" style="color:#888;font-size:0.65em;direction:ltr;">
        ${new Date(msg.createdAt).toLocaleTimeString('fa-IR')}
    </div>`;
    if (isSelf) content += `<span class="message-status-icon">${getMessageStatusIcon(msg.status || 'sent', isSelf)}</span>`;
    content += `</div>`;

    content += `<div class="bubble-tail"></div>`;
    content += `</div>`;

    div.innerHTML = content;

    if (prepend) messagesDiv.prepend(div);
    else messagesDiv.appendChild(div);

    const bodyContent = div.querySelector('.message-body-content');
    const delay = Math.random() * 200;
    bodyContent.style.animationDelay = `${delay}ms`;

    bodyContent.addEventListener('animationend', () => {
        div.classList.remove('animate-in');
        bodyContent.style.animationDelay = '0s';
    });

    if (!prepend && !isHistory) scrollBottom();
}

// ---------------- typing events ----------------
const sendTypingStart = () => {
    const socket = getSocket();
    if (!socket) return;
    if (isTyping) return;

    lastTargetUser = selectedReceiver;
    socket.emit('typing', {
        isTyping: true,
        target: lastTargetUser === '' ? null : lastTargetUser
    });
    isTyping = true;
};

const sendTypingStop = () => {
    const socket = getSocket();
    if (!socket) return;
    if (!isTyping) return;

    socket.emit('typing', {
        isTyping: false,
        target: lastTargetUser === '' ? null : lastTargetUser
    });
    isTyping = false;
    lastTargetUser = null;
};

// ---------------- Notifications & title blink ----------------
function requestNotificationPermission() {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            console.log('Notification permission:', permission);
        });
    }
}

let blinkInterval = null;
let originalTitle = document.title;
let unreadResetTimeout = null;

function showNotification(title, body, isPrivate = true) {
    if (!('Notification' in window)) return;

    if (Notification.permission === 'granted') {
        const notification = new Notification(title, {
            body: body.length > 100 ? body.substring(0, 100) + '...' : body,
            icon: '/defaults/default-avatar.png',
            silent: true
        });

        notification.onclick = () => {
            window.focus();
            notification.close();
            stopTitleBlink();
        };
    }

    const audio = new Audio('/defaults/alarm.mp3');
    audio.volume = 0.8;
    audio.play().catch(err => console.warn('Cannot play sound:', err));
}

function startTitleBlink(blinkText) {
    stopTitleBlink();
    let visible = true;
    blinkInterval = setInterval(() => {
        document.title = visible ? blinkText : originalTitle;
        visible = !visible;
    }, 800);
}

function stopTitleBlink() {
    if (blinkInterval) {
        clearInterval(blinkInterval);
        blinkInterval = null;
    }
    document.title = originalTitle;

    if (unreadResetTimeout) {
        clearTimeout(unreadResetTimeout);
        unreadResetTimeout = null;
    }

    const socket = getSocket();

    unreadResetTimeout = setTimeout(() => {
        if (selectedReceiver === '') {
            publicUnreadCount = 0;
            if (socket) socket.emit('mark_public_as_read');
        } else {
            if (unreadMessageCounts[selectedReceiver]) {
                delete unreadMessageCounts[selectedReceiver];
                if (socket) socket.emit('mark_private_as_read', selectedReceiver);
            }
        }
        updateChatList();
        updateTabTitle();
        unreadResetTimeout = null;
    }, 10000);
}

document.addEventListener('visibilitychange', () => {
    if (!document.hidden) stopTitleBlink();
    else {
        if (unreadResetTimeout) {
            clearTimeout(unreadResetTimeout);
            unreadResetTimeout = null;
        }
    }
});

function updateTabTitle() {
    const unreadTotal = publicUnreadCount + Object.values(unreadMessageCounts).reduce((a, b) => a + b, 0);

    if (unreadTotal > 0) {
        startTitleBlink(`(${unreadTotal}) پیام جدید`);
    } else {
        document.title = 'چت من';
    }
}
updateTabTitle();

// ---------------- Upload with progress ----------------
function uploadFileWithProgress(fileToUpload, fileName) {
    return new Promise((resolve, reject) => {
        const indicator = document.getElementById('loadingIndicator');
        const loadingText = document.getElementById('loadingText');

        if (loadingText) loadingText.textContent = 'در حال آپلود...';
        if (indicator) {
            indicator.style.display = 'flex';
            indicator.classList.add('is-loading');
        }

        const form = new FormData();
        form.append('file', fileToUpload, fileName);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/api/upload');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);

        xhr.upload.addEventListener('progress', (e) => {
            if (e.lengthComputable) {
                const percent = Math.round((e.loaded / e.total) * 100);
                const progressBar = document.getElementById('uploadProgress');
                if (progressBar) progressBar.style.width = `${percent}%`;
            }
        });

        xhr.onload = () => {
            if (indicator) {
                indicator.style.display = 'none';
                indicator.classList.remove('is-loading');
            }

            if (xhr.status === 200) {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.error) reject(new Error(data.error));
                    else resolve(data);
                } catch (e) {
                    alert('خطای پردازش پاسخ سرور.');
                    reject(e);
                }
            } else {
                try {
                    const data = JSON.parse(xhr.responseText);
                    if (data.error) {
                        alert(data.error);
                    } else {
                        alert(`خطا در آپلود: ${xhr.status}`);
                    }
                } catch (e) {
                    alert(`خطا در آپلود: ${xhr.status}`);
                }
                reject(new Error(`HTTP Error: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            if (indicator) {
                indicator.style.display = 'none';
                indicator.classList.remove('is-loading');
            }
            alert('خطای شبکه در آپلود.');
            reject(new Error('Network Error'));
        };

        xhr.send(form);
    });
}

// ---------------- Upload audio ----------------
async function uploadAudio(audioBlob) {
    const targetReceiver = selectedReceiver;

    const mime = audioBlob.type || "audio/webm";
    let extension = "webm";
    if (mime.includes("mp4")) extension = "m4a";
    if (mime.includes("aac")) extension = "m4a";

    const fileName = `voice_message_${Date.now()}.${extension}`;
    const tempId = Date.now();

    try {
        // تبدیل Blob به Base64
        const base64Audio = await blobToBase64(audioBlob);

        const tempMsg = {
            id: tempId,
            sender: username,
            text: "پیام صوتی 🎙️",
            file: {
                url: base64Audio,
                name: fileName,
                mime: mime,
                type: "audio"
            },
            receiver: targetReceiver === "" ? null : targetReceiver,
            replyTo: currentReplyContext,
            createdAt: new Date().toISOString(),
            status: "sending"
        };

        addMessage(tempMsg);
        scrollBottom();

        const socket = getSocket();
        if (socket) {
            socket.emit("send_message", {
                id: tempId,
                text: "پیام صوتی 🎙️",
                file: {
                    url: base64Audio,
                    name: fileName,
                    mime: mime,
                    type: "audio"
                },
                receiver: targetReceiver === "" ? null : targetReceiver,
                replyTo: currentReplyContext
            });
        }

        cancelReply();

    } catch (err) {
        alert("خطا در ارسال پیام صوتی.");
        console.error("Upload Audio Error:", err);
    }
}

// ---------------- Initial DOM setup ----------------
document.addEventListener('DOMContentLoaded', () => {
    requestNotificationPermission();

    const savedTheme = localStorage.getItem('theme');
    const htmlTag = document.getElementById('htmlTag');
    if (savedTheme === 'night' && htmlTag) {
        htmlTag.classList.add('night');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) themeToggle.innerHTML = '<i class="fa-solid fa-sun"></i>';
    }

    const emojiPanel = document.getElementById('emoji-panel');
    if (emojiPanel) emojiPanel.innerHTML = EMOJIS.map(e => `<span onclick="insertEmoji('${e}')">${e}</span>`).join('');

    const textInput = document.getElementById('text');
    if (textInput) {
        textInput.addEventListener('input', autoResizeTextarea);
        textInput.addEventListener('input', () => {
            if (isRecording) return;

            if (!isTyping && textInput.value.trim().length > 0) {
                sendTypingStart();
            }

            clearTimeout(typingTimeout);

            if (textInput.value.trim().length > 0) {
                typingTimeout = setTimeout(() => {
                    sendTypingStop();
                }, 1500);
            } else {
                sendTypingStop();
            }
        });
    }

    const fileInput = document.getElementById('file');
    if (fileInput) fileInput.addEventListener('change', updateFileNameDisplay);

    const recordBtn = document.getElementById('record-button');
    const stopRecordBtn = document.getElementById('stop-recording-button');
    if (recordBtn) recordBtn.addEventListener('click', startRecording);
    if (stopRecordBtn) stopRecordBtn.addEventListener('click', stopRecording);

    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                login();
            }
        });
    }
});
