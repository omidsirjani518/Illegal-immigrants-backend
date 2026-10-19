// public/js/WebAudioPlayer.js

(function () {

    window.playM4A = async function (url, buttonId) {
        try {
            const btn = document.getElementById(buttonId);
            const container = btn.parentElement;

            // اگر قبلاً پخش‌کننده‌ای وجود دارد حذف کن
            const oldAudio = container.querySelector("audio");
            if (oldAudio) oldAudio.remove();

            // دانلود فایل
            const response = await fetch(url);
            const blob = await response.blob();

            // ساخت URL قابل پخش
            const objectUrl = URL.createObjectURL(blob);

            // ساخت پخش‌کننده
            const audio = document.createElement("audio");
            audio.controls = true;
            audio.src = objectUrl;
            audio.style.width = "100%";

            container.appendChild(audio);
            audio.play();

            btn.innerText = "⏸ توقف پخش";
            btn.onclick = () => {
                audio.pause();
                audio.remove();
                btn.innerText = "▶ پخش صوت";
                btn.onclick = () => playM4A(url, buttonId);
            };

        } catch (err) {
            console.error("Audio playback error:", err);
            alert("مرورگر قادر به پخش این فایل صوتی نیست.");
        }
    };

})();
