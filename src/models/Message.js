const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    receiver: { type: String, default: null },
    text: { type: String },

    file: {
        url: String,
        name: String,
        mime: String   // ← این خط حیاتی است
    },

    color: { type: String },
    status: { type: String, default: 'sent' },

    replyTo: {
        messageId: mongoose.Schema.Types.ObjectId,
        sender: String,
        text: String
    }
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
