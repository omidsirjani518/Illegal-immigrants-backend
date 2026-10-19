// src/utils/seedRolesAndUsers.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Permission = require('../models/Permission');
const Role = require('../models/Role');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI;

async function seedRolesAndUsers() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Connected');

    // پاک کردن Roles و Users قبلی (اختیاری)
    await Role.deleteMany({});
    await User.deleteMany({});

    // گرفتن همه Permissions
    const allPermissions = await Permission.find();

    // ---------- ایجاد Roles ----------
    const adminRole = new Role({
      name: 'Admin',
      permissionIds: allPermissions.map(p => p._id),
    });
    await adminRole.save();

    const userRole = new Role({
      name: 'User',
      permissionIds: allPermissions
        .filter(p => !p.name.startsWith('role.') && !p.name.startsWith('user.'))
        .map(p => p._id),
    });
    await userRole.save();

    console.log('✅ Roles created');

    // ---------- ایجاد Users ----------
    const adminPassword = await bcrypt.hash('admin123', 10);
    const adminUser = new User({
      username: 'admin',
      passwordHash: adminPassword,
      roleId: adminRole._id,
      cityCode: '511'
    });
    await adminUser.save();

    const normalPassword = await bcrypt.hash('user123', 10);
    const normalUser = new User({
      username: 'user',
      passwordHash: normalPassword,
      roleId: userRole._id,
      cityCode: '511'
    });
    await normalUser.save();

    console.log('✅ Users created');
    console.log('Admin: admin / admin123');
    console.log('User: user / user123');

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seedRolesAndUsers();
