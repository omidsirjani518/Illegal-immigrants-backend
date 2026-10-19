const mongoose = require('mongoose');

const jobCategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    label: { type: String, required: true },
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    // 🚀 بخش حیاتی برای اطمینان از خروجی GraphQL
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// آپدیت خودکار updatedAt قبل از ذخیره
jobCategorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('JobCategory', jobCategorySchema);
