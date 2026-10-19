// script.js 
let socket;
let token;
let username;
let userAvatar = '/defaults/default-avatar.png';
let skip = 0;
let loadingOlder = false;
let selectedReceiver = '';
let allUsers = [];
let activeUsers = {};
let unreadMessageCounts = {};
let publicUnreadCount = 0;
let currentReplyContext = null;
let currentlyHighlightedMessageId = null;

// 💡 متغیرهای مدیریت تایپ
let typingTimeout;
let isTyping = false;
let lastTargetUser = null;
const messagesDiv = document.getElementById('messages');

const MESSAGE_LIMIT = 20;
const EMOJIS = ['😀', '😂', '🥲', '😍', '😎', '🥳', '😢', '😭', '🤔', '👏', '🔥', '👍', '👎', '❤️', '🔥', '💯', '🙏', '🤯'];

// ---------------- توابع کمکی وضعیت پیام (جدید) ----------------

/**
 * آیکون وضعیت پیام را برمی‌گرداند 
 * @param {string} status - وضعیت پیام ('sending', 'sent', 'delivered', 'read').
 * @param {boolean} isSelf - آیا پیام توسط کاربر فعلی ارسال شده است.
 * @returns {string} - HTML آیکون وضعیت.
 */
function getMessageStatusIcon(status, isSelf) {
    // پیام‌های عمومی و پیام‌های دریافتی تیک ندارند.
    if (selectedReceiver === '' || !isSelf) return '';

    switch (status) {
        case 'read':
            return '<i class="fas fa-check-double read-icon" title="خوانده شده"></i>'; // دو تیک آبی
        case 'delivered':
            return '<i class="fas fa-check-double delivered-icon" title="تحویل داده شده"></i>'; // دو تیک خاکستری
        case 'sent':
            return '<i class="fas fa-check single-icon" title="ارسال شده"></i>'; // تک تیک خاکستری
        case 'sending': // <<< حالت جدید: در حال ارسال
            return '<i class="fa-regular fa-clock sending-icon" title="در حال ارسال" style="color:#aaa;"></i>'; // آیکون ساعت
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


// ---------------- توابع کمکی ----------------
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
        // اگر در حال ضبط هستیم، هیچکدام نشان داده نشود
        sendBtn.style.display = 'none';
        recordBtn.style.display = 'none';
        return;
    }

    if (hasContent) {
        // اگر متن یا فایل داریم، فقط دکمه ارسال نمایش داده شود
        sendBtn.style.display = 'flex';
        recordBtn.style.display = 'none';
    } else {
        // اگر محتوایی نیست، فقط دکمه ضبط نمایش داده شود
        sendBtn.style.display = 'none';
        recordBtn.style.display = 'flex';
    }
}


function insertEmoji(emoji) {
    const textarea = document.getElementById('text');
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.substring(0, start) + emoji + text.substring(end);
    textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
    textarea.focus();
    autoResizeTextarea();

    if (!isTyping) sendTypingStart();
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(sendTypingStop, 1500);
}

function toggleEmojiPanel() {
    const panel = document.getElementById('emoji-panel');
    if (!panel) return;
    panel.style.display = panel.style.display === 'none' ? 'flex' : 'none';
    if (panel.style.display === 'flex') {
        const inputBarRect = document.getElementById('input-bar-container').getBoundingClientRect();
        panel.style.right = (window.innerWidth - inputBarRect.right) + 'px';
        panel.style.bottom = (window.innerHeight - inputBarRect.top + 10) + 'px';
    }
}

function toggleTheme() {
    const htmlTag = document.getElementById('htmlTag');
    if (!htmlTag) return;
    const isNight = htmlTag.classList.toggle('night');

    localStorage.setItem('theme', isNight ? 'night' : 'light');

    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.innerHTML = isNight ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
}

function triggerAvatarChange() {
    const input = document.getElementById('avatarFileInput');
    if (input) input.click();
}

// ---------------- توابع سرور (Login/Register/Avatar) ----------------

async function login() {
    username = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (!username || !p) return;
    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: p })
        });
        const data = await res.json();
        if (data.error) document.getElementById('loginMsg').textContent = data.error;
        else {
            token = data.token;
            userAvatar = data.avatar;
            // set global username (already set above from input)
            document.getElementById('usernameDisplay').textContent = `${username} (عمومی)`;
            const avatarElement = document.getElementById('userAvatarDisplay');
            if (avatarElement) {
                avatarElement.src = userAvatar;
            }

            document.getElementById('login').style.display = 'none';
            document.getElementById('chat').style.display = 'flex';
            startChat();
        }
    } catch (err) {
        document.getElementById('loginMsg').textContent = 'خطای شبکه یا سرور';
        console.error(err);
    }
}

async function register() {
    const u = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (!u || !p) return;
    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: u, password: p })
        });
        const data = await res.json();
        if (data.error) document.getElementById('loginMsg').textContent = data.error;
        else document.getElementById('loginMsg').textContent = 'ثبت نام موفق، اکنون وارد شوید';
    } catch (err) {
        document.getElementById('loginMsg').textContent = 'خطای شبکه یا سرور';
        console.error(err);
    }
}

async function updateAvatar() {
    const fileInput = document.getElementById('avatarFileInput');
    if (!fileInput || fileInput.files.length === 0) return;

    const form = new FormData();
    form.append('avatar', fileInput.files[0]);

    try {
        const res = await fetch('/api/profile/avatar', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: form
        });
        const data = await res.json();
        if (data.success) {
            userAvatar = data.newAvatarUrl;
            const avatarEl = document.getElementById('userAvatarDisplay');
            if (avatarEl) avatarEl.src = userAvatar;
            alert('آواتار با موفقیت به‌روز شد.');
        } else {
            alert('خطا در به‌روزرسانی آواتار: ' + (data.error || 'unknown'));
        }
    } catch (err) {
        alert('خطا در آپلود آواتار.');
        console.error(err);
    }
}


// ---------------- Socket & Chat Core ----------------

function startChat() {
    socket = io({ 
        auth: { token }, 
        secure: true,
        transports: ['websocket'] // فقط WSS
    });
    fetchUsers();

    const usernameDisplay = document.getElementById('usernameDisplay');
    const typingStatusDisplay = document.getElementById('typingStatus');

    // ۱. دریافت کاربران آنلاین
    socket.on('online_users', (users) => {
        activeUsers = users.reduce((acc, user) => {
            acc[user.username] = user;
            return acc;
        }, {});
        updateChatList();
    });

    // ۲. دریافت پیام جدید
    socket.on('new_message', (msg) => {
        const isPrivate = msg.receiver !== null && msg.receiver !== undefined;
        const isCurrentChat = (isPrivate && (msg.receiver === selectedReceiver || msg.sender === selectedReceiver)) || (!isPrivate && selectedReceiver === '');

        // اگر پیام از خود ما برگشت و حاوی id موقت است => حذف نسخه موقت
        if (msg.sender === username && msg.id) {
            const tempElement = document.getElementById(`msg-${msg.id}`);
            if (tempElement) {
                tempElement.remove();
            }
        }

        if (isCurrentChat) {
            addMessage(msg);
            scrollBottom();

            // اگر پیام خصوصی دریافت شد و در همان چت هستیم، آن را بخوان
            if (isPrivate && msg.receiver === username && msg.sender === selectedReceiver) {
                socket.emit('mark_private_as_read', msg.sender);
            }

        } else {
            // مدیریت شمارش نخوانده
            if (isPrivate) {
                const senderKey = msg.sender === username ? msg.receiver : msg.sender;
                unreadMessageCounts[senderKey] = (unreadMessageCounts[senderKey] || 0) + 1;
            } else {
                publicUnreadCount = (publicUnreadCount || 0) + 1;
            }
            updateChatList();
        }
    });

    // ✅ Listener برای به‌روزرسانی وضعیت پیام‌های ارسالی ما
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

    // ۴. مدیریت شمارش پیام‌های نخوانده
    socket.on('update_unread_counts', (counts) => {
        unreadMessageCounts = counts || {};
        updateChatList();
    });

    socket.on('update_public_unread_count', (count) => {
        publicUnreadCount = count || 0;
        updateChatList();
    });

    // ۵. مدیریت قطع شدن با دلیل
    socket.on('disconnect_reason', (reason) => {
        alert(reason || 'اتصال قطع شد');
        window.location.reload();
    });

    // ۶. مدیریت رویداد "در حال تایپ..." (Typing Indicator)
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

    // مدیریت اسکرول برای لود پیام‌های قدیمی‌تر
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

    selectUserForChat(''); // '' یعنی چت عمومی
}

// ---------------- آپدیت رابط کاربری ----------------

function updateChatList() {
    const userListDiv = document.getElementById('userList');
    if (!userListDiv) return;

    // آیتم چت عمومی
    userListDiv.innerHTML = `<div class="user-item ${selectedReceiver === '' ? 'selected' : ''}" id="public-chat-item" onclick="selectUserForChat('')">
        <i class="fa-solid fa-users" style="font-size:1.2em;"></i>
        <span style="font-weight:bold;">عمومی</span>
        <span class="unread-count" id="public-unread-count" style="display:${publicUnreadCount > 0 ? 'inline-block' : 'none'};">${publicUnreadCount}</span>
      </div>`;

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
              <span>${u}</span>
              <span class="unread-count" style="display:${count > 0 ? 'inline-block' : 'none'};">${count}</span>
            </div>
          `;
    });
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

    // منطق وضعیت خوانده شدن پیام در چت خصوصی
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

// ---------------- منطق ضبط صدا ----------------

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let stream;

function handleMicrophoneError(err) {
    let errorMessage = 'خطای نامشخص در دسترسی به میکروفون رخ داد.';

    switch (err?.name) {
        case 'NotAllowedError':
            errorMessage = 'دسترسی به میکروفون توسط شما یا تنظیمات مرورگر رد شده است. لطفاً تنظیمات سایت را بررسی کنید.';
            break;
        case 'NotFoundError':
            errorMessage = 'میکروفونی پیدا نشد. مطمئن شوید که میکروفون به درستی متصل و فعال است.';
            break;
        case 'NotReadableError':
            errorMessage = 'میکروفون شما توسط برنامه دیگری در حال استفاده است یا دستگاه در دسترس نیست. برنامه‌های دیگر را ببندید.';
            break;
        case 'SecurityError':
            errorMessage = 'خطای امنیتی. اگر از HTTP استفاده می‌کنید، باید روی localhost باشید.';
            break;
        default:
            errorMessage = `خطا در شروع ضبط (نوع خطا: ${err?.name}). لطفاً تنظیمات سیستم عامل را بررسی کنید.`;
    }

    console.error('Error starting recording:', err);
    alert('⚠️ خطا در ضبط صدا: ' + errorMessage);
}

async function startRecording() {
    if (isRecording) return;

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            uploadAudio(audioBlob);
        };

        mediaRecorder.start();
        isRecording = true;

        const textAreaContainer = document.getElementById('text-and-file-area');
        if (textAreaContainer) {
            textAreaContainer.style.opacity = '0.5';
            textAreaContainer.style.pointerEvents = 'none';
        }
        const sendBtn = document.getElementById('send-button');
        const recordBtn = document.getElementById('record-button');
        const stopBtn = document.getElementById('stop-recording-button');
        const recordStatus = document.getElementById('record-status');

        if (sendBtn) sendBtn.style.display = 'none';
        if (recordBtn) recordBtn.style.display = 'none';
        if (stopBtn) stopBtn.style.display = 'flex';
        if (recordStatus) recordStatus.style.display = 'block';

    } catch (err) {
        handleMicrophoneError(err);
    }
}

async function stopRecording() {
    if (!isRecording) return;

    isRecording = false;
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    const textAreaContainer = document.getElementById('text-and-file-area');
    if (textAreaContainer) {
        textAreaContainer.style.opacity = '1';
        textAreaContainer.style.pointerEvents = 'auto';
    }
    const stopBtn = document.getElementById('stop-recording-button');
    const recordStatus = document.getElementById('record-status');
    if (stopBtn) stopBtn.style.display = 'none';
    if (recordStatus) recordStatus.style.display = 'none';

    updateSendButtonVisibility();
}

/**
* فایل را با استفاده از XMLHttpRequest آپلود می‌کند و انیمیشن لودینگ را نمایش می‌دهد.
* @param {Blob|File} fileToUpload - فایل یا پیام صوتی برای آپلود.
*/
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
                // می‌توانید درصد آپلود را در اینجا نمایش دهید
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
                    if (data.error) {
                        reject(new Error(data.error));
                    } else {
                        resolve(data);
                    }
                } catch (e) {
                    alert('خطای پردازش پاسخ سرور.');
                    reject(e);
                }
            } else {
                alert(`خطا در آپلود: کد وضعیت ${xhr.status}`);
                reject(new Error(`HTTP Error: ${xhr.status}`));
            }
        };

        xhr.onerror = () => {
            if (indicator) {
                indicator.style.display = 'none';
                indicator.classList.remove('is-loading');
            }
            alert('خطای شبکه در حین آپلود.');
            reject(new Error('Network Error'));
        };

        xhr.send(form);
    });
}

// تابع به‌روز شده برای آپلود فایل صوتی
async function uploadAudio(audioBlob) {
    const targetReceiver = selectedReceiver;
    const fileName = `voice_message_${new Date().toISOString()}.webm`;
    const tempId = Date.now(); // ID موقت برای نمایش

    try {
        const uploadedData = await uploadFileWithProgress(audioBlob, fileName);

        if (uploadedData.error) { alert(uploadedData.error); return; }

        // نمایش پیام موقت
        const tempMsg = {
            id: tempId,
            sender: username,
            text: 'پیام صوتی 🎙️',
            file: { url: uploadedData.fileUrl, name: uploadedData.originalName, type: 'audio' },
            receiver: targetReceiver === '' ? null : targetReceiver,
            replyTo: currentReplyContext,
            createdAt: new Date().toISOString(),
            status: 'sending'
        };
        addMessage(tempMsg);
        scrollBottom();

        socket.emit('send_message', {
            id: tempId,
            text: 'پیام صوتی 🎙️',
            file: {
                url: uploadedData.fileUrl,
                name: uploadedData.originalName,
                type: 'audio'
            },
            receiver: targetReceiver === '' ? null : targetReceiver,
            replyTo: currentReplyContext
        });

        cancelReply();

    } catch (err) {
        alert('خطا در آپلود فایل صوتی.');
        console.error('Upload Audio Error:', err);
    }
}


// ---------------- مدیریت ریپلای و پرش ----------------

function replyTo(messageId, sender, text) {
    currentReplyContext = { messageId, sender, text };
    const replyBar = document.getElementById('replyBar');
    const replyContent = document.getElementById('replyContent');
    if (replyContent) replyContent.innerHTML = `<b>پاسخ به ${sender}:</b> ${text.substring(0, 50)}...`;
    if (replyBar) replyBar.style.display = 'flex';
    const ta = document.getElementById('text');
    if (ta) ta.focus();
}

function cancelReply() {
    currentReplyContext = null;
    const replyBar = document.getElementById('replyBar');
    if (replyBar) replyBar.style.display = 'none';
}

function jumpToMessage(messageId) {
    const target = document.getElementById(`msg-${messageId}`);
    if (currentlyHighlightedMessageId) {
        const prev = document.getElementById(`msg-${currentlyHighlightedMessageId}`);
        if (prev) prev.classList.remove('highlight');
    }

    if (target) {
        messagesDiv.scrollTo({ top: target.offsetTop - messagesDiv.clientHeight / 2, behavior: 'smooth' });

        target.classList.add('highlight');
        currentlyHighlightedMessageId = messageId;

        setTimeout(() => {
            target.classList.remove('highlight');
            currentlyHighlightedMessageId = null;
        }, 3000);
    } else {
        alert('پیام اصلی در تاریخچه فعلی موجود نیست. لطفاً پیام‌های قدیمی‌تر را لود کنید.');
    }
}

// ---------------- تابع اصلی ارسال پیام (اصلاح شده) ----------------

async function sendMessage() {
    const textInput = document.getElementById('text');
    const fileInput = document.getElementById('file');
    if (!textInput || !fileInput) return;

    const text = textInput.value.trim();
    if (!text && fileInput.files.length === 0) return;

    const receiver = selectedReceiver;
    let fileObj = null;

    // --- مدیریت آپلود فایل ---
    if (fileInput.files.length > 0) {
        try {
            const uploadedData = await uploadFileWithProgress(
                fileInput.files[0],
                fileInput.files[0].name
            );

            if (uploadedData.error) { alert(uploadedData.error); return; }

            let fileType = 'file';
            const mimeType = fileInput.files[0].type || '';
            if (mimeType.startsWith('image/')) fileType = 'image';
            else if (mimeType.startsWith('video/')) fileType = 'video';
            else if (mimeType.startsWith('audio/')) fileType = 'audio';

            fileObj = { url: uploadedData.fileUrl, name: uploadedData.originalName, type: fileType };

        } catch (err) {
            console.error("Upload failed in sendMessage:", err);
            alert('خطا در آپلود فایل');
            return;
        }
    }

    // --- نمایش پیام موقت (قبل از تایید سرور) ---
    const tempId = Date.now() + Math.random().toString(36).substring(2, 9);
    const targetReceiver = receiver === '' ? null : receiver;

    const tempMsg = {
        _id: tempId,
        id: tempId,
        sender: username,
        text: text || (fileObj ? (fileObj.type === 'audio' ? 'پیام صوتی 🎙️' : fileObj.name) : ''),
        file: fileObj,
        receiver: targetReceiver,
        replyTo: currentReplyContext,
        createdAt: new Date().toISOString(),
        status: 'sending'
    };
    addMessage(tempMsg);
    scrollBottom();

    // --- ارسال به سرور ---
    if (socket) {
        socket.emit('send_message', {
            id: tempId,
            text,
            file: fileObj,
            receiver: targetReceiver,
            replyTo: currentReplyContext
        });
    }

    // پاکسازی
    textInput.value = '';
    textInput.style.height = '38px';
    fileInput.value = '';
    updateFileNameDisplay();
    cancelReply();

    sendTypingStop();
}

// تابع کمکی برای SVG دم حباب 
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

    // آواتار فرستنده
    const user = activeUsers[msg.sender] || allUsers.find(u => u.username === msg.sender) || {};
    if (user && user.avatar) senderAvatar = user.avatar;
    content += `<img src="${senderAvatar}" alt="${msg.sender}" class="message-avatar">`;

    // محتوای اصلی پیام
    content += '<div class="message-body-content">';

    // نام کاربری برای پیام‌های دریافتی
    if (!isSelf) {
        content += `<div class="message-sender-name">${msg.sender}${msg.receiver == null ? ' (عمومی)' : ''}</div>`;
    }

    // ریپلای
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

    // فایل‌ها
    if (msg.file && msg.file.url && msg.file.name) {
        const ext = (msg.file.name.split('.').pop() || '').toLowerCase();
        switch (ext) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                content += `<img src="${msg.file.url}" alt="${msg.file.name}" style="max-height:200px;">`; break;
            case 'mp4':
            case 'webm':
            case 'ogg':
                content += `<video controls src="${msg.file.url}" style="max-height:200px;"></video>`; break;
            case 'mp3':
            case 'wav':
                content += `<audio controls src="${msg.file.url}"></audio>`; break;
            default:
                content += `<a href="${msg.file.url}" target="_blank" style="color:var(--primary-color); display:block; margin-top:5px;">
                <i class="fa-solid fa-file"></i> ${msg.file.name}</a>`; break;
        }
    }

    // متن پیام
    if (msg.text) {
        // جایگزینی \n با <br>
        const formattedText = msg.text.replace(/\n/g, '<br>');
        content += `<div class="message-text">${formattedText}</div>`;
    }


    // footer پیام
    const replyText = msg.text || (msg.file && msg.file.name ? 'فایل' : 'پیام');
    content += '<div class="message-footer">';
    content += `<button class="reply-button" onclick="replyTo('${msg._id || msg.id}', '${msg.sender}', '${String(replyText).replace(/'/g, "\\'")}')" 
        style="font-size:0.7em;background:none;border:none;cursor:pointer;color:#888;">
        <i class="fa-solid fa-reply"></i></button>`;
    content += `<div class="time" style="color:#888;font-size:0.65em;direction:ltr;">${new Date(msg.createdAt).toLocaleTimeString('fa-IR')}</div>`;
    if (isSelf) content += `<span class="message-status-icon">${getMessageStatusIcon(msg.status || 'sent', isSelf)}</span>`;
    content += '</div>'; // end footer

    // دم حباب
    content += `<div class="bubble-tail"></div>`;
    content += '</div>'; // end message-body-content

    div.innerHTML = content;

    if (prepend) messagesDiv.prepend(div);
    else messagesDiv.appendChild(div);

    const bodyContent = div.querySelector('.message-body-content');
    const delay = Math.random() * 200;
    bodyContent.style.animationDelay = `${delay}ms`;

    const bubbleTail = div.querySelector('.bubble-tail');
    if (bubbleTail) bubbleTail.style.animation = 'none'; // دم همیشه ثابت

    bodyContent.addEventListener('animationend', () => {
        div.classList.remove('animate-in');
        bodyContent.style.animationDelay = '0s';
    });

    if (!prepend && !isHistory) scrollBottom();
}



// ---------------- منطق ارسال رویداد تایپ (کامل) ----------------

const sendTypingStart = () => {
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
    if (!socket) return;
    if (!isTyping) return;
    socket.emit('typing', {
        isTyping: false,
        target: lastTargetUser === '' ? null : lastTargetUser
    });
    isTyping = false;
    lastTargetUser = null;
};

// ---------------- تنظیمات اولیه ----------------
document.addEventListener('DOMContentLoaded', () => {
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
        // اضافه کردن شنونده برای مدیریت تایپ
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

    // دکمه‌های ضبط
    const recordBtn = document.getElementById('record-button');
    const stopRecordBtn = document.getElementById('stop-recording-button');
    if (recordBtn) recordBtn.addEventListener('click', startRecording);
    if (stopRecordBtn) stopRecordBtn.addEventListener('click', stopRecording);

    // ارسال فرم لاگین با Enter
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
