// src/models/ParameterItem.js (اصلاح شده)
const mongoose = require('mongoose');

const parameterItemSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  value: { type: String, required: true }, // مثال: "مرد", "زن"
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterCategory', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// آپدیت خودکار updatedAt قبل از ذخیره
parameterItemSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('ParameterItem', parameterItemSchema);