const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  permissionIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


// آپدیت خودکار updatedAt قبل از ذخیره
roleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


roleSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
    return ret
  }
})

module.exports = mongoose.model('Role', roleSchema);
