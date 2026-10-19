//routes\profile.js
const express = require('express');
const router = express.Router();
const { upload } = require('../utils/multerConfig');
const authMiddleware = require('../utils/authMiddleware');
const User = require('../models/User');

router.post('/avatar', authMiddleware, upload.single('avatar'), async (req, res) => {
    if (!req.file)
        return res.status(400).json({ error: 'No file uploaded' });

    try {
        const newAvatarUrl = `/uploads/${req.file.filename}`;

        // 🔥 حالا req.user.id مقدار دارد
        await User.findByIdAndUpdate(req.user.id, { avatar: newAvatarUrl });

        res.json({
            success: true,
            newAvatarUrl
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update avatar' });
    }
});

module.exports = router;
