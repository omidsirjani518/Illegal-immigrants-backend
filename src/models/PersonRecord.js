const mongoose = require('mongoose');

const personRecordSchema = new mongoose.Schema({
  personId: { type: mongoose.Schema.Types.ObjectId, ref: 'Person', required: true },
  familyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', required: true },
  periodId: { type: mongoose.Schema.Types.ObjectId, ref: 'Period', required: true },

  roleInFamily: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  nationality: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  religion: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  maritalStatus: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  ethnicity: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  education: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  residence: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  expertise: { type: mongoose.Schema.Types.ObjectId, ref: 'ParameterItem', required: true },
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  district: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },



  CertNum: { type : String }, // شماره مدرک  
  certvalid:{ type : Boolean , default : false }, // اعتبار مدرک 
  childs: { type : Number , default : 0 }, // تعداد فرزند
  entrance:{ type : Boolean , default : false }, // نحوه ورود
  resduration: { type : String }, // مدت سکونت 
  curResDuration: { type : String }, // مدت سکونت فعلی
  empname: { type : String }, // نام کارفرما
  emptel: { type : String }, // شماره تماس کارفرما
  jobaddress: { type : String }, // آدرس محل کار
  wpermit:{ type : Boolean , default : false }, // مجوز اشتغال 
 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});


personRecordSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});


module.exports = mongoose.model('PersonRecord', personRecordSchema);
