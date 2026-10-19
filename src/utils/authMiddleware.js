const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || 'SECRET_KEY';

module.exports = function (req, res, next) {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token)
        return res.status(401).json({ error: "توکن ارسال نشده" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // 🔥 حالا decoded.id وجود دارد
        next();
    } catch (err) {
        return res.status(401).json({ error: "توکن نامعتبر است" });
    }
};
