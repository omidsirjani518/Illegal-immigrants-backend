const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const authMiddleware = require('../utils/authMiddleware');

router.get('/older', authMiddleware, async (req, res) => {
    try {
        const skip = parseInt(req.query.skip) || 0;
        const limit = parseInt(req.query.limit) || 20;
        const targetUser = req.query.targetUser || null;
        const username = req.user.username;

        const filter = targetUser
            ? {
                  $or: [
                      { sender: username, receiver: targetUser },
                      { sender: targetUser, receiver: username }
                  ]
              }
            : { receiver: null };

        const msgs = await Message.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        res.json(msgs.reverse());
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
