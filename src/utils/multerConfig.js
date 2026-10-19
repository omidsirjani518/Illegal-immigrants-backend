const path = require('path');
const fs = require('fs');
const multer = require('multer');
const { Buffer } = require('buffer');

const rootDir = process.pkg ? path.dirname(process.execPath) : path.resolve();

// 🔥 مسیر درست برای public داخل src
const uploadsDir = path.join(rootDir, 'src', 'public', 'uploads');

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const MAX_FILE_SIZE = 200 * 1024 * 1024; // 200MB

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        const originalName_utf8 = Buffer.from(file.originalname, 'latin1').toString('utf8');
        const fileExtension = path.extname(originalName_utf8);
        const baseName = path.basename(originalName_utf8, fileExtension);
        const safeBaseName = baseName.replace(/[^a-zA-Z0-9؀-ۿ\s-.]/g, '');
        const finalSafeName = safeBaseName.trim().replace(/\s+/g, '-');
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + finalSafeName + fileExtension);
    },
});

const upload = multer({
    storage,
    limits: { fileSize: MAX_FILE_SIZE },
});

module.exports = {
    upload,
    uploadsDir,
};
