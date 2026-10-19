const express = require('express');
const router = express.Router();
const User = require('../models/User');


//----------------------------------------------------------------
router.get('/dashboard', async (req, res) => {
    const data = {
        statisticData: [
            {
                key: 'newLeads',
                label: 'درخواست جدید',
                value: 63,
                growShrink: 2.6,
            },
            {
                key: 'emailResponse',
                label: 'ویزا صادر شده',
                value: 25,
                growShrink: 5.5,
            },
            {
                key: 'proposals',
                label: 'استعلام',
                value: 49,
                growShrink: -0.7,
            },
            {
                key: 'appointment',
                label: 'نوبت',
                value: 12,
                growShrink: 2.6,
            },
        ],
        leadByRegionData : [
            { name: 'Kabul', value: 5, title: 'کابل', color: '#10B981' },
            { name: 'Zabul', value: 20, title: 'زابل', color: '#F59E0B' },
            { name: 'Nimroz', value: 25, title: 'نیمروز', color: '#EF4444' },
            { name: 'Balkh', value: 30, title: 'بلخ', color: '#8B5CF6' },
            { name: 'Khost', value: 12, title: 'خوست', color: '#06B6D4' },
            { name: 'Badakhshan', value: 18, title: 'بدخشان', color: '#EC4899' },
            { name: 'Bamyan', value: 22, title: 'بامیان', color: '#6366F1' },
            { name: 'Faryab', value: 28, title: 'فاریاب', color: '#F43F5E' },

            
        ],
        recentLeadsData: [
            {
                id: 1,
                name: 'ناصر اکبرزاده',
                avatar: '/img/avatars/thumb-1.jpg',
                status: 0,
                createdTime: 1623430400,
                email: 'eileen_h@hotmail.com',
                assignee: 'علی اکبری',
            },
            {
                id: 2,
                name: 'حسین',
                avatar: '/img/avatars/thumb-2.jpg',
                status: 1,
                createdTime: 1632393600,
                email: 'terrance_moreno@infotech.io',
                assignee: 'جواد نوری',
            },
            {
                id: 3,
                name: 'علی',
                avatar: '/img/avatars/thumb-3.jpg',
                status: 1,
                createdTime: 1632393600,
                email: 'ronnie_vergas@infotech.io',
                assignee: 'امیر اسدی',
            },
            {
                id: 4,
                name: 'سعید',
                avatar: '/img/avatars/thumb-4.jpg',
                status: 2,
                createdTime: 1632761600,
                email: 'cookie_lukie@hotmail.com',
                assignee: 'حسین کریمی',
            },
            {
                id: 5,
                name: 'ابولفضل',
                avatar: '/img/avatars/thumb-5.jpg',
                status: 3,
                createdTime: 1632416000,
                email: 'joyce991@infotech.io',
                assignee: 'داود سلیمانی',
            },
            {
                id: 6,
                name: 'ملیکا',
                avatar: '/img/avatars/thumb-6.jpg',
                status: 0,
                createdTime: 1633107200,
                email: 'samanthaphil@infotech.io',
                assignee: 'رضا جباری',
            },
        ],
        emailSentData: {
            precent: 85,
            opened: 893,
            unopen: 330,
            total: 1223,
        },
    }

    return res.json(data)
})

router.post('/customers', async (req, res) => {
    try {
        const {
            pageIndex = 1,
            pageSize = 10,
            sort = {},
            query = '',
            filterData = {},
        } = req.body

        const skip = (pageIndex - 1) * pageSize

        // -----------------------------
        // 🔵 BUILD MONGO FILTER
        // -----------------------------
        const mongoFilter = {}

        // status filter (boolean)
        if (filterData.status === true || filterData.status === false) {
            mongoFilter.status = filterData.status
        }

        // search query
        if (query) {
            mongoFilter.$or = [
                {
                    username: {
                        $regex: query,
                        $options: 'i',
                    },
                },
                {
                    title: {
                        $regex: query,
                        $options: 'i',
                    },
                },
                {
                    email: {
                        $regex: query,
                        $options: 'i',
                    },
                },
                {
                    mobile: {
                        $regex: query,
                        $options: 'i',
                    },
                },
            ]
        }

        // -----------------------------
        // 🔵 BASE QUERY
        // -----------------------------
        let dbQuery = User.find(mongoFilter).populate({
            path: 'roleId',
            populate: { path: 'permissionIds' },
        })

        // -----------------------------
        // 🔵 SAFE SORT
        // -----------------------------
        const allowedSortFields = [
            'username',
            'email',
            'createdAt',
            'lastLogin',
            'title',
        ]

        if (
            sort?.key &&
            sort?.order &&
            allowedSortFields.includes(sort.key)
        ) {
            dbQuery = dbQuery.sort({
                [sort.key]: sort.order === 'desc' ? -1 : 1,
            })
        }

        // -----------------------------
        // 🔵 EXECUTE QUERY
        // -----------------------------
        const users = await dbQuery
            .skip(skip)
            .limit(pageSize)

        // -----------------------------
        // 🔵 TOTAL (IMPORTANT FIX)
        // -----------------------------
        const total = await User.countDocuments(mongoFilter)

        // -----------------------------
        // 🔵 RESPONSE
        // -----------------------------
        return res.json({
            data: users,
            total,
            pageIndex,
            pageSize,
        })
    } catch (err) {
        console.error(err)
        return res.status(500).json({
            error: 'Failed to fetch customers',
        })
    }
})

router.get('/customers-statistic', async (req, res) => {
    try {

        const countAll =  await User.countDocuments({})
        const countActive =  await User.countDocuments({status : true})
        const countNotActive = countAll-countActive
        const data = {
            totalCustomers: {
                value: countAll,
                growShrink: 17.2,
            },
            activeCustomers: {
                value: countActive,
                growShrink: 32.7,
            },
            newCustomers: {
                value: countNotActive,
                growShrink: -2.3,
            },
        }

        res.json(data)

    } catch (error) {
        res.status(500).json({
            error: 'Failed to customers-statistic'
        })
    }


})


router.get('/customer-details', async (req, res) => {
    try {
        // console.log("customer-details:" , req.query)
        const id = req.query.id
        const user = await User.findById(id) 
            .populate({ path: 'roleId', populate: { path: 'permissionIds' } });
        //res.json(user)

        const data = {
            "id": user._id,
            "username": user.username || 'اکبر',
            "email": user.email || "iamfred@imaze.infotech.io",
            "img": user.avatar || "/img/avatars/thumb-8.jpg",
            "avatar": user.avatar || "/img/avatars/thumb-8.jpg",
            "role": user.roleId.name || "User",
            "mobile": user.mobile ||  "3216 588 911 98+",
            "tel": user.tel ||  "3216 588 911 98+",
            "title": user.title || "مدیر انطباق",
            "lastOnline": 1639219200,
            "status": "مسدود",
            "personalInfo": {
                "location": "ایران, تهران",
                "title": "مدیر انطباق",
                "birthday": "17/11/1993",
                "phoneNumber": "3216 588 911 98+",
                "mobile": user.mobile ||  "3216 588 911 98+",
                "tel": user.tel ||  "3216 588 911 98+",
                "facebook": "facebook.com/sample",
                "twitter": "twitter.com/sample",
                "pinterest": "pinterest.com/sample",
                "linkedIn": "linkedin/sample"
            },
            "orderHistory": [
                {
                    "id": "#36223",
                    "item": "تکمیل اطلاعات پروفایل",
                    "status": "انتظار",
                    "amount": 39.9,
                    "date": 1639132800
                },
                {
                    "id": "#34283",
                    "item": "ثبت دقیق تر اخبار",
                    "status": "مشاهده شده",
                    "amount": 59.9,
                    "date": 1636790880
                },
                {
                    "id": "#32234",
                    "item": "دعوت به جلسه",
                    "status": "مشاهده شده",
                    "amount": 59.9,
                    "date": 1634090880
                },
                {
                    "id": "#31354",
                    "item": "ارجاع ارباب رجوع",
                    "status": "مشاهده شده",
                    "amount": 59.9,
                    "date": 1631532800
                }
            ],
            "paymentMethod": [
                {
                    "cardHolderName": "اکبر",
                    "cardType": "VISA",
                    "expMonth": "12",
                    "expYear": "25",
                    "last4Number": "0392",
                    "primary": true
                },
                {
                    "cardHolderName": "اکبر",
                    "cardType": "MASTER",
                    "expMonth": "06",
                    "expYear": "25",
                    "last4Number": "8461",
                    "primary": false
                }
            ],
            "subscription": [
                {
                    "plan": "حرفه ای هیئت مدیره کسب و کار",
                    "status": "فعال",
                    "billing": "ماهانه",
                    "nextPaymentDate": 1639132800,
                    "amount": 59.9
                }
            ]
        }

        res.json(data)

    } catch (error) {
        res.status(500).json({
            error: 'Failed to customer-details'
        })
    }


})


router.delete('/customer/delete', async (req, res) => {
    try {

        const id = req.body.id

         console.log("customer/delete:" , id)

        if (!id) {
            return res.status(400).json({
                error: 'User id is required'
            })
        }

        const deletedUser = await User.findByIdAndDelete(id)

        if (!deletedUser) {
            return res.status(404).json({
                error: 'User not found'
            })
        }

        res.status(200).json({
            message: 'User deleted successfully',
            //data: deletedUser
        })

    } catch (error) {
        res.status(500).json({
            error: 'Failed to delete customer'
        })
    }
})



module.exports = router;
