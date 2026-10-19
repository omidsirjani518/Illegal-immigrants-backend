const express = require('express');
const router = express.Router();

router.get('/count', async (req, res) => {
    try {
        const data = { count: 10 }; // موقتی

        res.json(data)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to notification count'
        })
    }

})

router.get('/list', async (req, res) => {
    try {
        const data = [
            {
                "id": "b06ca3f5-8fb0-4979-a016-30dfe63e8fd6",
                "target": "علی شاهی",
                "description": "شما را به پروژه جدید دعوت کرد",
                "date": "4 دقیقه پیش",
                "image": "thumb-8.jpg",
                "type": 0,
                "location": "",
                "locationLabel": "",
                "status": "",
                "readed": false
            },
            {
                "id": "2152cd09-413a-44be-9d5a-b2b820c6a661",
                "target": "وحید",
                "description": "در تیکت خود نظر دهید",
                "date": "20 دقیقه پیش",
                "image": "",
                "type": 0,
                "location": "",
                "locationLabel": "",
                "status": "",
                "readed": false
            },
            {
                "id": "f644235d-dffc-4f17-883f-1ada117ff2c9",
                "target": "",
                "description": "لطفا گزارش روزانه خود را ارسال کنید.",
                "date": "1 ساعت پیش",
                "image": "",
                "type": 1,
                "location": "",
                "locationLabel": "",
                "status": "",
                "readed": false
            },
            {
                "id": "8ca04d2c-0262-417b-8a3d-4ade49939059",
                "target": "",
                "description": "درخواست شما رد شد",
                "date": "2 روز قبل",
                "image": "",
                "type": 2,
                "location": "",
                "locationLabel": "",
                "status": "failed",
                "readed": true
            },
            {
                "id": "e55adc24-1803-4ffd-b653-09be273f8df5",
                "target": "مهران رجبی",
                "description": "شما را در نظر ذکر کرد",
                "date": "2 روز قبل",
                "image": "thumb-4.jpg",
                "type": 0,
                "location": "",
                "locationLabel": "",
                "status": "",
                "readed": true
            },
            {
                "id": "8dd23dfd-a79b-40ad-b4e9-7e70a148d5b6",
                "target": "",
                "description": "درخواست شما تایید شد",
                "date": "4 دقیقه پیش",
                "image": "4 days ago",
                "type": 2,
                "location": "",
                "locationLabel": "",
                "status": "succeed",
                "readed": true
            }
        ]

        res.json(data)
    } catch (error) {
        res.status(500).json({
            error: 'Failed to notification list'
        })
    }

})

module.exports = router;