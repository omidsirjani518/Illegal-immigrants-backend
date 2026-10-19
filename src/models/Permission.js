// models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // مثال: "person.create"
  description: { type: String }
}, { timestamps: true }); // createdAt و updatedAt خودکار ساخته می‌شوند

module.exports = mongoose.model('Permission', permissionSchema);
