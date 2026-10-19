
const mongoose = require('mongoose');

const districtProvinceSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true }, 
    name: { type: String, required: true },
    label: { type: String, required: true },

}, {
    // 🚀 بخش حیاتی برای اطمینان از خروجی GraphQL
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});


module.exports = mongoose.model('DistrictProvince', districtProvinceSchema);
