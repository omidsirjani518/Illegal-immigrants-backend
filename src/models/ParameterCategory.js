const mongoose = require('mongoose');

const parameterCategorySchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, 
    label: { type: String, required: true },
    name: { type: String, required: true }, 
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
}, {
    // 🚀 بخش حیاتی برای اطمینان از خروجی GraphQL
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// آپدیت خودکار updatedAt قبل از ذخیره
parameterCategorySchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model('ParameterCategory', parameterCategorySchema);