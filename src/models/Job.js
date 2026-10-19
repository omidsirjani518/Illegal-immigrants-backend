const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'JobCategory' },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// آپدیت خودکار updatedAt قبل از ذخیره
jobSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Job', jobSchema);
