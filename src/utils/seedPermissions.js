require('dotenv').config();
const mongoose = require('mongoose');
const Permission = require('../models/Permission');

const MONGO_URI = process.env.MONGO_URI;

// لیست رکوردهای اولیه Permission
const permissions = [
  { name: 'person.create', description: 'ایجاد اطلاعات فردی' },
  { name: 'person.edit', description: 'ویرایش اطلاعات فردی' },
  { name: 'person.delete', description: 'حذف اطلاعات فردی' },
  { name: 'family.create', description: 'ایجاد خانواده' },
  { name: 'family.edit', description: 'ویرایش خانواده' },
  { name: 'family.delete', description: 'حذف خانواده' },
  { name: 'job.create', description: 'ایجاد شغل' },
  { name: 'job.edit', description: 'ویرایش شغل' },
  { name: 'job.delete', description: 'حذف شغل' },
  { name: 'role.create', description: 'ایجاد رول' },
  { name: 'user.create', description: 'ایجاد کاربر' },
  { name: 'view.reports', description: 'مشاهده گزارشات' }
];

async function seedPermissions() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB Connected');

    for (const perm of permissions) {
      // اگر وجود دارد بروزرسانی کن، در غیر این صورت ایجاد کن
      await Permission.findOneAndUpdate(
        { name: perm.name },
        perm,
        { upsert: true, new: true }
      );
    }

    console.log('✅ Permissions seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedPermissions();
