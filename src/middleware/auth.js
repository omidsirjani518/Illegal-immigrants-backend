
// /middleware/auth.js

const { AuthenticationError } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = (resolver) => async (parent, args, context, info) => {
  if (!context || !context.req) {
    throw new AuthenticationError("Context یا req موجود نیست");
  }

  const authHeader = context.req.headers.token || '';
  const token = authHeader; // یا authHeader.replace('Bearer ', '');
  if (!token) throw new AuthenticationError("توکن معتبر نیست");

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);

    // پیدا کردن کاربر در دیتابیس
    const userFromDB = await User.findById(payload.userId);
    if (!userFromDB) throw new AuthenticationError("کاربر یافت نشد");

    context.user = {
      id: userFromDB._id,
      roleId: userFromDB.roleId,
      permissions: payload.permissions,
      cityCode: userFromDB.cityCode,      // ← اضافه شد
    };

  } catch (err) {
    throw new AuthenticationError("توکن منقضی یا نامعتبر است");
  }

  return resolver(parent, args, context, info);
};

const checkPermission = (requiredPermission) => (resolver) => async (parent, args, context, info) => {
  if (!context.user || !context.user.permissions.includes(requiredPermission)) {
    throw new AuthenticationError("!!!!دسترسی کافی نیست");
  }
  
  return resolver(parent, args, context, info);
};

module.exports = { authMiddleware, checkPermission };
