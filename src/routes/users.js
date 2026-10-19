// src/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../utils/authMiddleware');

// گرفتن همه کاربران
router.get('/all', authMiddleware, async (req, res) => {
    try {
        const users = await User.find(
            { username: { $ne: req.user.username } },
            'username avatar'
        );

        const result = users.map(u => ({
            ...u.toObject(),
            id: u._id
        }));

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});


// گرفتن اطلاعات کاربر جاری
router.get('/me', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(
            req.user.id,
            'username title email avatar cityCode roleId status'
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            ...user.toObject(),
            id: user._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});


// آپدیت پروفایل
router.post('/update-profile', authMiddleware, async (req, res) => {
    try {
        const { id, email, mobile, tel, office, avatar , title , roleId } = req.body;

        console.log("update-profile :",req.body);

        const updateData = {};

        // فقط فیلدهای مجاز
        if (email !== undefined) updateData.email = email;
        if (title !== undefined) updateData.title = title;
        if (mobile !== undefined) updateData.mobile = mobile;
        if (tel !== undefined) updateData.tel = tel;
        if (office !== undefined) updateData.office = office;
        if (roleId.id !== undefined) updateData.roleId = roleId.id;

        // فقط اگر avatar مسیر واقعی بود ذخیره کن
        if (avatar && avatar.startsWith('/uploads/')) {
            updateData.avatar = avatar;
        }

        updateData.updatedAt = Date.now();

        const user = await User.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json({
            ...user.toObject(),
            id: user._id
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update user' });
    }
});

module.exports = router;