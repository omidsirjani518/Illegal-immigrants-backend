const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
  personCode: { type: String, unique: true, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dateOfBirth: { type: String },
  gender: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

personSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Person', personSchema);
