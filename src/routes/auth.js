// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';
const DEFAULT_ROLE_ID = "691cbf4e8e23f0933a64b802"; // نقش پیش‌فرض User
const RESET_CODE_EXPIRY_MINUTES = 10; // مدت زمان اعتبار کد فراموشی رمز

// ---------------- Login ----------------
router.post('/sign-in', async (req, res) => {
  console.log("sign-in : ", req.body)

  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "username و password لازم است" });

    const user = await User.findOneAndUpdate(
      { username },
      { $set: { lastLogin: new Date() } },
      { new: true }
    ).populate({
      path: 'roleId',
      populate: { path: 'permissionIds' }
    })

    if (!user) return res.status(401).json({
      message: "نام کاربری یا رمز عبور اشتباه است"
    })

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) return res.status(401).json({
      message: "نام کاربری یا رمز عبور اشتباه است"
    })

    console.log(user)
    if (!user.status) return res.status(403).json({ message: "دسترسی مجاز نیست" });

    const permissions = user.roleId?.permissionIds?.map(p => p.name) || [];

    const token = jwt.sign(
      { id: user._id, username: user.username, roleId: user.roleId?._id, permissions },
      SECRET_KEY,
      { expiresIn: '1d' }
    );

    // console.log({
    //   token,
    //   user: {
    //     id: user._id,
    //     userName: user.username,
    //     authority: [user.roleId.name ?? null],
    //     cityCode: user.cityCode,
    //     role: user.roleId ?? null,
    //     status: user.status ?? true,
    //     avatar: user.avatar ?? '/defaults/default-avatar.png'
    //   }
    // })


    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        mobile: user.mobile,
        authority: [user.roleId.name ?? null],
        cityCode: user.cityCode,
        role: user.roleId ?? null,
        status: user.status ?? true,
        avatar: user.avatar || '/defaults/default-avatar.png'
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای سرور" });
  }
});

// ---------------- sign-up ----------------
router.post('/sign-up', async (req, res) => {
  try {
    const { username, email, mobile, password, cityCode, roleId } = req.body;

    console.log("sign-up : ", req.body)
    if (!username || !password)
      return res.status(400).json({ message: "username و password لازم است" });

    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "کاربر قبلاً ثبت شده" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      mobile,
      passwordHash,
      cityCode,
      roleId: roleId || DEFAULT_ROLE_ID,
      status: false,
    });

    await user.save();

    res.json({
      message: "ثبت نام موفق بود",
      user: { id: user._id, username: user.username, roleId: user.roleId }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
});

// ---------------- forgot-password ----------------
router.post('/forgot-password', async (req, res) => {
  try {
    // console.log(req.body);
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "email لازم است" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + RESET_CODE_EXPIRY_MINUTES * 60 * 1000);

    user.resetCode = code;
    user.resetCodeExpiry = expiry;
    await user.save();

    console.log(`کد فراموشی رمز برای ${email}: ${code}`);

    res.json({ message: "کد تایید ارسال شد" }); // فقط پیام، بدون ارسال کد در JSON برای امنیت

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "خطای سرور" });
  }
});

// ---------------- Verify Code ----------------
router.post('/verify-code', async (req, res) => {
  try {
    const { email, vCode } = req.body;
    if (!email || !vCode)
      return res.status(400).json({ message: "email و code لازم است" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    if (!user.resetCode || user.resetCode !== vCode)
      return res.status(400).json({ message: "کد تایید اشتباه است" });

    if (!user.resetCodeExpiry || user.resetCodeExpiry < new Date())
      return res.status(400).json({ message: "کد تایید منقضی شده است" });

    // 🔹 تولید resetToken
    const resetToken = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: '10m' } // فقط 10 دقیقه معتبر
    );

    res.json({ message: "کد تایید شد", resetToken });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
});

// ---------------- Reset Password ----------------
router.post('/reset-password', async (req, res) => {
  try {
    const { newPassword, resetToken } = req.body;
    if (!newPassword || !resetToken)
      return res.status(400).json({ message: "newPassword و resetToken لازم است" });

    let payload;
    try {
      payload = jwt.verify(resetToken, SECRET_KEY);
    } catch {
      return res.status(401).json({ message: "توکن منقضی شده یا معتبر نیست" });
    }

    const user = await User.findById(payload.id);
    if (!user) return res.status(404).json({ message: "کاربر یافت نشد" });

    user.passwordHash = await bcrypt.hash(newPassword, 10);
    user.resetCode = null;
    user.resetCodeExpiry = null;
    await user.save();

    res.json({ message: "رمز عبور با موفقیت بازنشانی شد" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "خطای سرور" });
  }
});


module.exports = router;
