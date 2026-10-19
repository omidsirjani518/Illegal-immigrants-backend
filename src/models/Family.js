const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  trackingCode: { type: String, unique: true, required: true }, // کد یکتا 12 رقمی
  address: { type: String },
  mobile : { type : String , required: true}, // موبایل
  tel : { type : String , required: true}, // تلفن ضروری

  location: {
    type: { type: String, enum: ['Point'], default: 'Point' },
    coordinates: { type: [Number], required: true }
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Index برای فیلتر و تحلیل GIS
familySchema.index({ location: '2dsphere' });

// آپدیت خودکار updatedAt قبل از ذخیره
familySchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Family', familySchema);
