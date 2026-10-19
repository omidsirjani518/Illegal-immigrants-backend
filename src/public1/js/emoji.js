const EMOJIS = ['😀', '😂', '🥲', '😍', '😎', '🥳', '😢', '😭', '🤔', '👏', '🔥', '👍', '👎', '❤️', '🔥', '💯', '🙏', '🤯'];

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