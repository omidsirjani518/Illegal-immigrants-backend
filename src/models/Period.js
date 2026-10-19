const mongoose = require('mongoose');

const periodSchema = new mongoose.Schema({
  title: { type: String, required: true },
  code: { type: Number, required: true },      // دو رقم prefix
  cityCode: { type: String, required: true },         // سه رقم شهر
  startDate: { type: String },
  endDate: { type: String },
  description: { type: String },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// آپدیت خودکار updatedAt
periodSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Period', periodSchema);
