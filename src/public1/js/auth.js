// ---------------- توابع سرور (Login/Register/Avatar) ----------------

//let socket;
let token;
let username;
let userAvatar = '/defaults/default-avatar.png';

async function login() {
    username = document.getElementById('username').value.trim();
    const p = document.getElementById('password').value.trim();
    if (!username || !p) return;
    try {
        const res = await fetch('/api/auth/sign-in', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password: p })
        });
        const data = await res.json();
        if (data.error) document.getElementById('loginMsg').textContent = data.error;
        else {
            token = data.token;
            userAvatar = data?.user?.avatar;
            // set global username (already set above from input)
            document.getElementById('usernameDisplay').textContent = `${username} (عمومی)`;
            const avatarElement = document.getElementById('userAvatarDisplay');
            if (avatarElement) {
                avatarElement.src = userAvatar;
            }

            document.getElementById('login').style.display = 'none';
            document.getElementById('chat').style.display = 'flex';
            startChat();
            console.log("startChat called");
            window.socket.connected

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
        const res = await fetch('/api/auth/register', {
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
    form.append('avatar', fileInput.files[0]); // ← فیلد باید avatar باشد

    const res = await fetch('/api/profile/avatar', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: form,
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
}
