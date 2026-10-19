const express = require('express');
const router = express.Router();
const { upload } = require('../utils/multerConfig');

router.post('/', upload.single('file'), (req, res) => {

    console.log("BODY:", req.body)
    console.log("FILE:", req.file)


    if (!req.file) return res.status(400).json({ error: 'هیچ فایلی آپلود نشده است' });

    res.json({
        fileUrl: `/uploads/${req.file.filename}`,
        originalName: req.file.originalname,
    });
});

module.exports = router;
