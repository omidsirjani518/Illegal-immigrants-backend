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