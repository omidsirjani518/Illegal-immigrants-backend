// ---------------- منطق ضبط صدا ----------------

let mediaRecorder;
let audioChunks = [];
let isRecording = false;
let stream;

// مدیریت خطاهای میکروفون
function handleMicrophoneError(err) {
    let errorMessage = 'خطای نامشخص در دسترسی به میکروفون رخ داد.';

    switch (err?.name) {
        case 'NotAllowedError':
            errorMessage = 'دسترسی به میکروفون توسط شما یا تنظیمات مرورگر رد شده است.';
            break;
        case 'NotFoundError':
            errorMessage = 'میکروفونی پیدا نشد.';
            break;
        case 'NotReadableError':
            errorMessage = 'میکروفون توسط برنامه دیگری در حال استفاده است.';
            break;
        case 'SecurityError':
            errorMessage = 'این خطا معمولاً به دلیل اجرا روی HTTP رخ می‌دهد.';
            break;
        default:
            errorMessage = `خطا در شروع ضبط (نوع خطا: ${err?.name}).`;
    }

    console.error('Error starting recording:', err);
    alert('⚠️ خطا در ضبط صدا: ' + errorMessage);
}


// -------- نمایش موج صوتی (Waveform) --------

let audioContext;
let analyser;
let dataArray;
let bufferLength;
let animationId;

const canvas = document.getElementById('waveform');
const canvasCtx = canvas ? canvas.getContext('2d') : null;

/** آماده‌سازی موج صوتی */
function prepareWaveform(stream) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioContext.createMediaStreamSource(stream);

    analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;

    bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);

    source.connect(analyser);

    // تنظیم ابعاد واقعی canvas نسبت به CSS
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    drawWaveform();
}

/** رسم موج صوتی */
function drawWaveform() {
    if (!canvasCtx || !analyser) return;

    const width = canvas.width;
    const height = canvas.height;
    analyser.fftSize = 2048; // دقت نمونه‌برداری
    const bufferLength = analyser.fftSize;
    dataArray = new Uint8Array(bufferLength);

    function draw() {
        animationId = requestAnimationFrame(draw);

        analyser.getByteTimeDomainData(dataArray);

        canvasCtx.fillStyle = '#111'; // پس‌زمینه
        canvasCtx.fillRect(0, 0, width, height);

        canvasCtx.lineWidth = 2;
        canvasCtx.strokeStyle = '#4caf50'; // رنگ موج
        canvasCtx.beginPath();

        const sliceWidth = width / bufferLength;
        let x = 0;

        for (let i = 0; i < bufferLength; i++) {
            const v = dataArray[i] / 128.0; // نرمال سازی بین 0 و 2
            const y = (v * height) / 2; // تبدیل به پیکسل

            if (i === 0) {
                canvasCtx.moveTo(x, y);
            } else {
                canvasCtx.lineTo(x, y);
            }

            x += sliceWidth;
        }

        canvasCtx.lineTo(width, height / 2);
        canvasCtx.stroke();
    }

    draw();
}


// -------- شروع ضبط --------

async function startRecording() {
    if (isRecording) return;

    try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });

        // شروع موج
        prepareWaveform(stream);

        // انتخاب بهترین فرمت قابل پشتیبانی
        let mimeType = "";

        if (MediaRecorder.isTypeSupported("audio/mp4;codecs=aac")) {
            mimeType = "audio/mp4;codecs=aac";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
            mimeType = "audio/mp4";
        } else if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
            mimeType = "audio/webm;codecs=opus";
        } else {
            mimeType = "";
        }

        mediaRecorder = new MediaRecorder(stream, { mimeType });

        audioChunks = [];

        mediaRecorder.ondataavailable = event => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            let audioType =
                mimeType.includes("mp4") ? "audio/mp4" : "audio/webm";

            const extension =
                mimeType.includes("mp4") ? "m4a" : "webm";

            const audioBlob = new Blob(audioChunks, { type: audioType });

            const file = new File(
                [audioBlob],
                "record_" + Date.now() + "." + extension,
                { type: audioType }
            );

            uploadAudio(file);

            // توقف موج
            cancelAnimationFrame(animationId);
            canvasCtx && canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
        };

        mediaRecorder.start();
        isRecording = true;

        // تغییر UI
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



// -------- توقف ضبط --------

async function stopRecording() {
    if (!isRecording) return;

    isRecording = false;

    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
        mediaRecorder.stop();
    }

    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    if (audioContext) {
        audioContext.close();
        audioContext = null;
    }

    // UI برگشت به حالت قبل
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


