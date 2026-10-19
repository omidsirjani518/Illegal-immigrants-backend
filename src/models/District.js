const mongoose = require('mongoose');

const districtSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  districtityProvinceId: { type: mongoose.Schema.Types.ObjectId, ref: 'DistrictProvince' },

});


module.exports = mongoose.model('District', districtSchema);
