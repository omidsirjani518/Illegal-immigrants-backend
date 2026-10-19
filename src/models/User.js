// src/models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, unique: true },
  mobile: { type: String, unique: true },
  tel: { type: String, default: null }, // new
  title: { type: String, default: null }, // new
  office: { type: String, default: null }, // new
  passwordHash: { type: String, required: true },
  roleId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    required: true,
    default: "691cbf4e8e23f0933a64b802" // user role
  },
  cityCode: { type: String, length: 3 },
  status: { type: Boolean, default: false }, // کاربران جدید غیرفعال هستند
  lastLogin: { type: Date },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  color: String,
  avatar: { type: String, default: '/defaults/default-avatar.png' },

  // 🔹 فیلدهای مربوط به فراموشی رمز
  resetCode: { type: String, default: null },
  resetCodeExpiry: { type: Date, default: null },
});

// آپدیت خودکار updatedAt قبل از ذخیره
userSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('User', userSchema);
