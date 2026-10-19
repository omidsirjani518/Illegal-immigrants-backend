// src/utils/seedParametersJobsPeriods.js
require('dotenv').config();
const mongoose = require('mongoose');

const ParameterCategory = require('../models/ParameterCategory'); 
const ParameterItem = require('../models/ParameterItem');

const JobCategory = require('../models/JobCategory');
const Job = require('../models/Job');


const DistrictProvince = require('../models/DistrictProvince');
const District = require('../models/District');

const Period = require('../models/Period');

const MONGO_URI = process.env.MONGO_URI;

// -----------------------------
// داده‌های خام (Raw Data) - مستقیماً از JSON کدگذاری شده
// -----------------------------
// ✅ این آرایه همان خروجی JSON نهایی کدگذاری شده است.
const PARAMS = [
    {
      "label": "nationality",
      "name": "تابعیت",
      "code": "1000",
      "items": [
        { "value": "افغانستان", "code": "10001" },
        { "value": "عراق", "code": "10002" },
        { "value": "پاکستان", "code": "10003" },
        { "value": "ترکیه", "code": "10004" },
        { "value": "سوریه", "code": "10005" },
        { "value": "تاجیکستان", "code": "10006" },
        { "value": "ترکمنستان", "code": "10007" },
        { "value": "آذربایجان", "code": "10008" },
        { "value": "ارمنستان", "code": "10009" },
        { "value": "کویت", "code": "100010" },
        { "value": "عربستان", "code": "100011" },
        { "value": "عمان", "code": "100012" },
        { "value": "بحرین", "code": "100013" },
        { "value": "امارات", "code": "100014" },
        { "value": "قطر", "code": "100015" }
      ]
    },
    {
      "label": "gender",
      "name": "جنسیت",
      "code": "2000",
      "items": [
        { "value": "مرد", "code": "20001" },
        { "value": "زن", "code": "20002" }
      ]
    },
    {
      "label": "maritalStatus",
      "name": "وضعیت تأهل",
      "code": "3000",
      "items": [
        { "value": "مجرد", "code": "30001" },
        { "value": "متأهل", "code": "30002" },
        { "value": "طلاق‌گرفته", "code": "30003" },
        { "value": "بیوه", "code": "30004" }
      ]
    },
    {
      "label": "religion",
      "name": "دین",
      "code": "4000",
      "items": [
        { "value": "اسلام-شیعه", "code": "40001" },
        { "value": "اسلام-سنی", "code": "40002" },
        { "value": "مسیحیت", "code": "40003" },
        { "value": "یهودیت", "code": "40004" },
        { "value": "زرتشت", "code": "40005" },
        { "value": "سایر", "code": "40006" }
      ]
    },
    {
      "label": "roleInFamily",
      "name": "نقش در خانواده",
      "code": "5000",
      "items": [
        { "value": "سرپرست", "code": "50001" },
        { "value": "همسر", "code": "50002" },
        { "value": "فرزند", "code": "50003" },
        { "value": "پدر", "code": "50004" },
        { "value": "مادر", "code": "50005" },
        { "value": "برادر", "code": "50006" },
        { "value": "خواهر", "code": "50007" },
        { "value": "پدر بزرگ", "code": "50008" },
        { "value": "مادر بزرگ", "code": "50009" },
        { "value": "نوه", "code": "500010" },
        { "value": "عروس", "code": "500011" },
        { "value": "داماد", "code": "500012" },
        { "value": "سایر", "code": "500013" }
      ]
    },
    {
      "label": "ethnicity",
      "name": "قومیت",
      "code": "6000",
      "items": [
        { "value": "پشتون", "code": "60001" },
        { "value": "تاجیک", "code": "60002" },
        { "value": "هزاره", "code": "60003" },
        { "value": "ازبک", "code": "60004" },
        { "value": "ایماق", "code": "60005" },
        { "value": "ترکمن", "code": "60006" },
        { "value": "قزاق", "code": "60007" },
        { "value": "قرقیز", "code": "60008" },
        { "value": "قزل باش", "code": "60009" },
        { "value": "مغول‌ها", "code": "600010" },
        { "value": "بلوچ‌", "code": "600011" },
        { "value": "براهویی‌", "code": "600012" },
        { "value": "نورستانی‌", "code": "600013" },
        { "value": "پشه‌ای‌", "code": "600014" },
        { "value": "گوجار", "code": "600015" },
        { "value": "عرب‌", "code": "600016" },
        { "value": "واخی‌", "code": "600017" },
        { "value": "دهگان", "code": "600018" }
      ]
    },
    {
      "label": "education",
      "name": "تحصیلات",
      "code": "7000",
      "items": [
        { "value": "ابتدایی/دبستان", "code": "70001" },
        { "value": "متوسطه اول (راهنمایی سابق)", "code": "70002" },
        { "value": "متوسطه دوم (دبیرستان)", "code": "70003" },
        { "value": "کاردانی", "code": "70004" },
        { "value": "کارشناسی", "code": "70005" },
        { "value": "کارشناسی ارشد", "code": "70006" },
        { "value": "دکتری", "code": "70007" },
        { "value": "بی‌سواد", "code": "70008" },
        { "value": "سوادآموزی", "code": "70009" },
        { "value": "تحصیلات حوزوی/سنتی", "code": "700010" },
        { "value": "مدارک حرفه‌ای/فنی", "code": "700011" }
      ]
    },
    {
        "label": "residence",
        "name": "مدرک اقامتی",
        "code": "8000",
        "items": [
            { "value": "کارت آمایش", "code": "80001" },
            { "value": "گذرنامه خانوار", "code": "80002" },
            { "value": "گذرنامه اقامتی", "code": "80003" },
            { "value": "روادید", "code": "80004" },
            { "value": "سرشماری", "code": "80005" },
            { "value": "کارت موقت", "code": "80006" }
        ]
    },
    {
        "label": "expertise",
        "name": "تخصص/مهارت",
        "code": "9000",
        "items": [
            { "value": "مبتدی", "code": "90001" },
            { "value": "متوسط", "code": "90002" },
            { "value": "پیشرفته", "code": "90003" },
            { "value": "متخصص", "code": "90004" }
        ]
    }
];


const JOBS = [
    {
        name: 'کشاورزی',
        label: 'Agriculture',
        jobs: [
            { code: '100001', title: 'کشاورز' },
            { code: '100002', title: 'دامدار' }
        ]
    },
    {
        name: 'خدمات',
        label: 'Services',
        jobs: [
            { code: '200001', title: 'راننده' },
            { code: '200002', title: 'فروشنده' }
        ]
    },
    {
        name: 'ساختمان',
        label: 'Construction',
        jobs: [
            { code: '300001', title: 'کارگر ساده' },
            { code: '300002', title: 'بنا' }
        ]
    }
];

// متغیر CODED_PARAMS حذف شده و مستقیماً از PARAMS استفاده می‌کنیم.
const CODED_PARAMS = PARAMS;


const AFGHANISTAN_districts = [
  {
    "code": "100",
    "name": "ارزگان",
    "label": "Uruzgan",
    "districts": [
      { "code": "100001", "title": "ترین کوت" },
      { "code": "100002", "title": "چوره" },
      { "code": "100003", "title": "خاص ارزگان" },
      { "code": "100004", "title": "دهراوود" },
      { "code": "100005", "title": "شهید حساس" }
    ]
  },
  {
    "code": "101",
    "name": "بادغیس",
    "label": "Badghis",
    "districts": [
      { "code": "101001", "title": "آب کمری" },
      { "code": "101002", "title": "جوند" },
      { "code": "101003", "title": "غورماچ" },
      { "code": "101004", "title": "قادس" },
      { "code": "101005", "title": "قلعه نو" },
      { "code": "101006", "title": "بالا مرغاب" },
      { "code": "101007", "title": "مقر" }
    ]
  },
  {
    "code": "102",
    "name": "بامیان",
    "label": "Bamyan",
    "districts": [
      { "code": "102001", "title": "بامیان" },
      { "code": "102002", "title": "کهمرد" },
      { "code": "102003", "title": "پنجاب" },
      { "code": "102004", "title": "سیغان" },
      { "code": "102005", "title": "شیبر" },
      { "code": "102006", "title": "ورس" },
      { "code": "102007", "title": "یکاولنگ" }
    ]
  },
  {
    "code": "103",
    "name": "بدخشان",
    "label": "Badakhshan",
    "districts": [
      { "code": "103001", "title": "ارغنج خواه" },
      { "code": "103002", "title": "ارگو" },
      { "code": "103003", "title": "اشکاشم" },
      { "code": "103004", "title": "بهارک" },
      { "code": "103005", "title": "تگاب (کشم بالا)" },
      { "code": "103006", "title": "تیشکان" },
      { "code": "103007", "title": "جرم" },
      { "code": "103008", "title": "خاش" },
      { "code": "103009", "title": "خواهان" },
      { "code": "103010", "title": "درایم" },
      { "code": "103011", "title": "درواز پایین (نسی)" },
      { "code": "103012", "title": "درواز بالا (مایمی)" },
      { "code": "103013", "title": "راغستان" },
      { "code": "103014", "title": "زیباک" },
      { "code": "103015", "title": "شغنان" },
      { "code": "103016", "title": "شکی" },
      { "code": "103017", "title": "شهدا" },
      { "code": "103018", "title": "شهر بزرگ" },
      { "code": "103019", "title": "شهرفیض اباد" },
      { "code": "103020", "title": "کران و منجان" },
      { "code": "103021", "title": "کشم" },
      { "code": "103022", "title": "کوف آب" },
      { "code": "103023", "title": "کوهستان" },
      { "code": "103024", "title": "واخان" },
      { "code": "103025", "title": "وردوج" },
      { "code": "103026", "title": "یاوان" },
      { "code": "103027", "title": "یفتل پایین" },
      { "code": "103028", "title": "یمگان (گیروان)" }
    ]
  },
  {
    "code": "104",
    "name": "بغلان",
    "label": "Baghlan",
    "districts": [
      { "code": "104001", "title": "نهرین" },
      { "code": "104002", "title": "اندراب" },
      { "code": "104003", "title": "بغلان جدید" },
      { "code": "104004", "title": "پل حصار" },
      { "code": "104005", "title": "پل خمری" },
      { "code": "104006", "title": "تاله و برفک" },
      { "code": "104007", "title": "جلگه" },
      { "code": "104008", "title": "خنجان" },
      { "code": "104009", "title": "خوست و فرنگ" },
      { "code": "104010", "title": "دوشی" },
      { "code": "104011", "title": "دهانه غوری" },
      { "code": "104012", "title": "ده صلاح" },
      { "code": "104013", "title": "فرنگ و غارو" },
      { "code": "104014", "title": "گذرگاه نور" },
      { "code": "104015", "title": "برکه" }
    ]
  },
  {
    "code": "105",
    "name": "بلخ",
    "label": "Balkh",
    "districts": [
      { "code": "105001", "title": "بلخ" },
      { "code": "105002", "title": "چارپولک" },
      { "code": "105003", "title": "چارکنت" },
      { "code": "105004", "title": "چمتال" },
      { "code": "105005", "title": "خلم" },
      { "code": "105006", "title": "دولت آباد" },
      { "code": "105007", "title": "دهدادی" },
      { "code": "105008", "title": "زاری" },
      { "code": "105009", "title": "شورتپه" },
      { "code": "105010", "title": "شولگره" },
      { "code": "105011", "title": "کشنده" },
      { "code": "105012", "title": "کلدار" },
      { "code": "105013", "title": "مارمل" },
      { "code": "105014", "title": "مزار شریف" },
      { "code": "105015", "title": "نهر شاهی" }
    ]
  },
  {
    "code": "106",
    "name": "پروان",
    "label": "Parwan",
    "districts": [
      { "code": "106001", "title": "بگرام" },
      { "code": "106002", "title": "جبل سراج" },
      { "code": "106003", "title": "چاریکار" },
      { "code": "106004", "title": "سالنگ" },
      { "code": "106005", "title": "سرخ پارسا" },
      { "code": "106006", "title": "سید خیل" },
      { "code": "106007", "title": "شیخ علی" },
      { "code": "106008", "title": "شینواری" },
      { "code": "106009", "title": "غوربند" },
      { "code": "106010", "title": "کوه صافی" }
    ]
  },
  {
    "code": "107",
    "name": "پکتیا",
    "label": "Paktia",
    "districts": [
      { "code": "107001", "title": "احمدآباد" },
      { "code": "107002", "title": "جاجی" },
      { "code": "107003", "title": "جانی خیل" },
      { "code": "107004", "title": "چاوک" },
      { "code": "107005", "title": "چمکنی" },
      { "code": "107006", "title": "دند پتان" },
      { "code": "107007", "title": "زدران" },
      { "code": "107008", "title": "زرمت" },
      { "code": "107009", "title": "سید کرم" },
      { "code": "107010", "title": "شواک" },
      { "code": "107011", "title": "علی خیل" },
      { "code": "107012", "title": "گرده ثیری" },
      { "code": "107013", "title": "گردیز" },
      { "code": "107014", "title": "لجه احمد خیل" },
      { "code": "107015", "title": "لجه منگل" },
      { "code": "107016", "title": "میرزکه" }
    ]
  },
  {
    "code": "108",
    "name": "پکتیکا",
    "label": "Paktika",
    "districts": [
      { "code": "108001", "title": "ارگون" },
      { "code": "108002", "title": "اومنه" },
      { "code": "108003", "title": "برمل" },
      { "code": "108004", "title": "تروو" },
      { "code": "108005", "title": "جانی خیل" },
      { "code": "108006", "title": "دیله و خوشآمند" },
      { "code": "108007", "title": "زرغون شهر" },
      { "code": "108008", "title": "زیروک" },
      { "code": "108009", "title": "سرروضه" },
      { "code": "108010", "title": "سروبی" },
      { "code": "108011", "title": "شرنه" },
      { "code": "108012", "title": "گومل" },
      { "code": "108013", "title": "گیان" },
      { "code": "108014", "title": "متاخان" },
      { "code": "108015", "title": "نکه" },
      { "code": "108016", "title": "وازه دخواه" },
      { "code": "108017", "title": "ورممی" },
      { "code": "108018", "title": "یحیی خیل" },
      { "code": "108019", "title": "یوسف خیل" }
    ]
  },
  {
    "code": "109",
    "name": "پنجشیر",
    "label": "Panjshir",
    "districts": [
      { "code": "109001", "title": "انابه" },
      { "code": "109002", "title": "بازارک" },
      { "code": "109003", "title": "پریان" },
      { "code": "109004", "title": "خنج" },
      { "code": "109005", "title": "دره" },
      { "code": "109006", "title": "روخه" },
      { "code": "109007", "title": "شتل" }
    ]
  },
  {
    "code": "110",
    "name": "تخار",
    "label": "Takhar",
    "districts": [
      { "code": "110001", "title": "اشکمش" },
      { "code": "110002", "title": "بنگی" },
      { "code": "110003", "title": "بهارک" },
      { "code": "110004", "title": "تالقان" },
      { "code": "110005", "title": "چال" },
      { "code": "110006", "title": "چاه آب" },
      { "code": "110007", "title": "خواجه بهاءالدین" },
      { "code": "110008", "title": "خواجه غار" },
      { "code": "110009", "title": "درقد" },
      { "code": "110010", "title": "دشت قلعه" },
      { "code": "110011", "title": "روستاق" },
      { "code": "110012", "title": "فرخار" },
      { "code": "110013", "title": "کلفگان" },
      { "code": "110014", "title": "نمک آب" },
      { "code": "110015", "title": "ورسج" },
      { "code": "110016", "title": "هزارسموچ" },
      { "code": "110017", "title": "ینگی قلعه" }
    ]
  },
  {
    "code": "111",
    "name": "جوزجان",
    "label": "Jowzjan",
    "districts": [
      { "code": "111001", "title": "آقچه" },
      { "code": "111002", "title": "خانقاه" },
      { "code": "111003", "title": "خم آب" },
      { "code": "111004", "title": "خواجه دوکوه" },
      { "code": "111005", "title": "درزاب" },
      { "code": "111006", "title": "شبرغان" },
      { "code": "111007", "title": "فیض آباد" },
      { "code": "111008", "title": "قرقین" },
      { "code": "111009", "title": "قوش تپه" },
      { "code": "111010", "title": "مردیان" },
      { "code": "111011", "title": "منگجک" }
    ]
  },
  {
    "code": "112",
    "name": "خوست",
    "label": "Khost",
    "districts": [
      { "code": "112001", "title": "باک" },
      { "code": "112002", "title": "تنی" },
      { "code": "112003", "title": "تیریزایی" },
      { "code": "112004", "title": "جاجی میدان" },
      { "code": "112005", "title": "خوست متون" },
      { "code": "112006", "title": "سپیره" },
      { "code": "112007", "title": "شمل" },
      { "code": "112008", "title": "صبری (یعقوبی)" },
      { "code": "112009", "title": "قلندر" },
      { "code": "112010", "title": "گربز" },
      { "code": "112011", "title": "مندوزی" },
      { "code": "112012", "title": "موسی خیل" },
      { "code": "112013", "title": "نادرشاه کوت" }
    ]
  },
  {
    "code": "113",
    "name": "دایکندی",
    "label": "Daykundi",
    "districts": [
      { "code": "113001", "title": "اشترلی" },
      { "code": "113002", "title": "پاتو" },
      { "code": "113003", "title": "خدیر" },
      { "code": "113004", "title": "سنگ تخت" },
      { "code": "113005", "title": "شهرستان" },
      { "code": "113006", "title": "کجران" },
      { "code": "113007", "title": "کیتی" },
      { "code": "113008", "title": "میرآمور" },
      { "code": "113009", "title": "نیلی" },
      { "code": "113010", "title": "گیزآب" }
    ]
  },
  {
    "code": "114",
    "name": "زابل",
    "label": "Zabul",
    "districts": [
      { "code": "114001", "title": "اتغر" },
      { "code": "114002", "title": "ارغنداب" },
      { "code": "114003", "title": "ترنگ و جلدک" },
      { "code": "114004", "title": "دای چوپان" },
      { "code": "114005", "title": "شاه جوی" },
      { "code": "114006", "title": "شملزایی" },
      { "code": "114007", "title": "شینکی" },
      { "code": "114008", "title": "قلات" },
      { "code": "114009", "title": "کاکر" },
      { "code": "114010", "title": "میزان" },
      { "code": "114011", "title": "نوبهار" }
    ]
  },
  {
    "code": "115",
    "name": "سرپل",
    "label": "Sar-e Pol",
    "districts": [
      { "code": "115001", "title": "بلخاب" },
      { "code": "115002", "title": "سرپل" },
      { "code": "115003", "title": "سانچارک" },
      { "code": "115004", "title": "سوزمه قلعه" },
      { "code": "115005", "title": "صیاد" },
      { "code": "115006", "title": "کوهستانات" },
      { "code": "115007", "title": "گوسفندی" }
    ]
  },
  {
    "code": "116",
    "name": "سمنگان",
    "label": "Samangan",
    "districts": [
      { "code": "116001", "title": "آیبک" },
      { "code": "116002", "title": "حضرت سلطان" },
      { "code": "116003", "title": "خرم و سارباغ" },
      { "code": "116004", "title": "دره صوف بالا" },
      { "code": "116005", "title": "دره صوف پایین" },
      { "code": "116006", "title": "روی دوآب" },
      { "code": "116007", "title": "فیروزنخچیر" }
    ]
  },
  {
    "code": "117",
    "name": "غزنی",
    "label": "Ghazni",
    "districts": [
      { "code": "117001", "title": "آب بند" },
      { "code": "117002", "title": "آجرستان" },
      { "code": "117003", "title": "اندر" },
      { "code": "117004", "title": "جاغوری" },
      { "code": "117005", "title": "خواجه عمری" },
      { "code": "117006", "title": "ده یک" },
      { "code": "117007", "title": "رشیدان" },
      { "code": "117008", "title": "زنه خان" },
      { "code": "117009", "title": "غزنی" },
      { "code": "117010", "title": "جغتو" },
      { "code": "117011", "title": "قره باغ" },
      { "code": "117012", "title": "گیرو" },
      { "code": "117013", "title": "گیلان" },
      { "code": "117014", "title": "مالستان" },
      { "code": "117015", "title": "مقر" },
      { "code": "117016", "title": "ناور" },
      { "code": "117017", "title": "ناوه" },
      { "code": "117018", "title": "واغز" },
      { "code": "117019", "title": "خوگیانی" }
    ]
  },
  {
    "code": "118",
    "name": "غور",
    "label": "Ghor",
    "districts": [
      { "code": "118001", "title": "پسآبند" },
      { "code": "118002", "title": "مرغاب" },
      { "code": "118003", "title": "تولک" },
      { "code": "118004", "title": "تیوره" },
      { "code": "118005", "title": "دولت یار" },
      { "code": "118006", "title": "دولینه" },
      { "code": "118007", "title": "چارسده" },
      { "code": "118008", "title": "چغچران" },
      { "code": "118009", "title": "ساغر" },
      { "code": "118010", "title": "شهرک" },
      { "code": "118011", "title": "لعل سرجنگل" }
    ]
  },
  {
    "code": "119",
    "name": "فاریاب",
    "label": "Faryab",
    "districts": [
      { "code": "119001", "title": "آلمار" },
      { "code": "119002", "title": "اندخوی" },
      { "code": "119003", "title": "بلچراغ" },
      { "code": "119004", "title": "پشتون کوت" },
      { "code": "119005", "title": "خان چارباغ" },
      { "code": "119006", "title": "دولت آباد" },
      { "code": "119007", "title": "خواجه سبزپوش ولی" },
      { "code": "119008", "title": "شیرین تگاب" },
      { "code": "119009", "title": "قرغان" },
      { "code": "119010", "title": "قرم قل" },
      { "code": "119011", "title": "قیصار" },
      { "code": "119012", "title": "کوهستان" },
      { "code": "119013", "title": "گرزیوان" },
      { "code": "119014", "title": "میمنه" }
    ]
  },
  {
    "code": "120",
    "name": "فراه",
    "label": "Farah",
    "districts": [
      { "code": "120001", "title": "انار دره" },
      { "code": "120002", "title": "بالا بلوک" },
      { "code": "120003", "title": "بکواه" },
      { "code": "120004", "title": "پرچمن" },
      { "code": "120005", "title": "پشت رود" },
      { "code": "120006", "title": "خاک سفید" },
      { "code": "120007", "title": "شیب کوه" },
      { "code": "120008", "title": "فراه" },
      { "code": "120009", "title": "قلعه کاه" },
      { "code": "120010", "title": "گلستان" },
      { "code": "120011", "title": "لاش و جوین" }
    ]
  },
  {
    "code": "121",
    "name": "قندوز",
    "label": "Kunduz",
    "districts": [
      { "code": "121001", "title": "امام صاحب" },
      { "code": "121002", "title": "چهاردره" },
      { "code": "121003", "title": "خان آباد" },
      { "code": "121004", "title": "دشت آرچی" },
      { "code": "121005", "title": "علی آباد" },
      { "code": "121006", "title": "قلعه ذال" },
      { "code": "121007", "title": "آقتاش" },
      { "code": "121008", "title": "قندوز" }
    ]
  },
  {
    "code": "122",
    "name": "قندهار",
    "label": "Kandahar",
    "districts": [
      { "code": "122001", "title": "ارغستان" },
      { "code": "122002", "title": "ارغندآب" },
      { "code": "122003", "title": "پنجوایی" },
      { "code": "122004", "title": "خاکریز" },
      { "code": "122005", "title": "دامان" },
      { "code": "122006", "title": "ریگستان" },
      { "code": "122007", "title": "ژری" },
      { "code": "122008", "title": "سپین بولدک" },
      { "code": "122009", "title": "شاه ولی کوت" },
      { "code": "122010", "title": "شورآبک" },
      { "code": "122011", "title": "غورک" },
      { "code": "122012", "title": "قندهار" },
      { "code": "122013", "title": "معروف" },
      { "code": "122014", "title": "میانشین" },
      { "code": "122015", "title": "میوند" },
      { "code": "122016", "title": "نیش" }
    ]
  },
  {
    "code": "123",
    "name": "کابل",
    "label": "Kabul",
    "districts": [
      { "code": "123001", "title": "استالف" },
      { "code": "123002", "title": "بگرامی" },
      { "code": "123003", "title": "پغمان" },
      { "code": "123004", "title": "چهارآسیاب" },
      { "code": "123005", "title": "خاک جبار" },
      { "code": "123006", "title": "ده سبز" },
      { "code": "123007", "title": "سروبی" },
      { "code": "123008", "title": "شکردره" },
      { "code": "123009", "title": "فرزه" },
      { "code": "123010", "title": "قره باغ" },
      { "code": "123011", "title": "کابل" },
      { "code": "123012", "title": "کلکان" },
      { "code": "123013", "title": "گلدره" },
      { "code": "123014", "title": "موسهی" },
      { "code": "123015", "title": "میربچه کوت" }
    ]
  },
  {
    "code": "124",
    "name": "کاپیسا",
    "label": "Kapisa",
    "districts": [
      { "code": "124001", "title": "آله سایی" },
      { "code": "124002", "title": "تگاب" },
      { "code": "124003", "title": "حصه اول کوهستان" },
      { "code": "124004", "title": "حصه دوم کوهستان" },
      { "code": "124005", "title": "کوه بند" },
      { "code": "124006", "title": "محمود راقی" },
      { "code": "124007", "title": "نجرآب" }
    ]
  },
  {
    "code": "125",
    "name": "کنر",
    "label": "Kunar",
    "districts": [
      { "code": "125001", "title": "اسدآباد" },
      { "code": "125002", "title": "برکنر" },
      { "code": "125003", "title": "خاص کنر" },
      { "code": "125004", "title": "دانگام" },
      { "code": "125005", "title": "دره پیچ" },
      { "code": "125006", "title": "چپه دره" },
      { "code": "125007", "title": "چوکی" },
      { "code": "125008", "title": "سرکانی" },
      { "code": "125009", "title": "شیگل و شلتن" },
      { "code": "125010", "title": "غازی آباد" },
      { "code": "125011", "title": "مروه" },
      { "code": "125012", "title": "ناری" },
      { "code": "125013", "title": "نرنگ" },
      { "code": "125014", "title": "نورگل" },
      { "code": "125015", "title": "وته پور" }
    ]
  },
  {
    "code": "126",
    "name": "لغمان",
    "label": "Laghman",
    "districts": [
      { "code": "126001", "title": "دولت شاه" },
      { "code": "126002", "title": "قرغه ای" },
      { "code": "126003", "title": "علیشنگ" },
      { "code": "126004", "title": "علینیار" },
      { "code": "126005", "title": "مهترلام" },
      { "code": "126006", "title": "بادپش" }
    ]
  },
  {
    "code": "127",
    "name": "لوگر",
    "label": "Logar",
    "districts": [
      { "code": "127001", "title": "ازره" },
      { "code": "127002", "title": "برکی برک" },
      { "code": "127003", "title": "پل علم" },
      { "code": "127004", "title": "چرخ" },
      { "code": "127005", "title": "خروار" },
      { "code": "127006", "title": "خوشی" },
      { "code": "127007", "title": "محمد آغه" }
    ]
  },
  {
    "code": "128",
    "name": "میدان وردک",
    "label": "Maidan Wardak",
    "districts": [
      { "code": "128001", "title": "جلریز" },
      { "code": "128002", "title": "جغتو" },
      { "code": "128003", "title": "چک وردک" },
      { "code": "128004", "title": "حصه اول بهسود" },
      { "code": "128005", "title": "دایمیرداد" },
      { "code": "128006", "title": "سیدآباد" },
      { "code": "128007", "title": "مرکز بهسود" },
      { "code": "128008", "title": "نرخ" }
    ]
  },
  {
    "code": "129",
    "name": "ننگرهار",
    "label": "Nangarhar",
    "districts": [
      { "code": "129001", "title": "آچین" },
      { "code": "129002", "title": "بتی کوت" },
      { "code": "129003", "title": "بهسود" },
      { "code": "129004", "title": "پچیرآگام" },
      { "code": "129005", "title": "جلال آباد" },
      { "code": "129006", "title": "حصارک" },
      { "code": "129007", "title": "چپرهار" },
      { "code": "129008", "title": "خوگیانی" },
      { "code": "129009", "title": "در بابا" },
      { "code": "129010", "title": "دره نور" },
      { "code": "129011", "title": "ده بالا" },
      { "code": "129012", "title": "رودات" },
      { "code": "129013", "title": "سرخ رود" },
      { "code": "129014", "title": "شیرزاد" },
      { "code": "129015", "title": "شینوار" },
      { "code": "129016", "title": "کامه" },
      { "code": "129017", "title": "کوت" },
      { "code": "129018", "title": "کوزکنر" },
      { "code": "129019", "title": "گوشته" },
      { "code": "129020", "title": "لعل پور" },
      { "code": "129021", "title": "مهمنددره" },
      { "code": "129022", "title": "نازیان" }
    ]
  },
  {
    "code": "130",
    "name": "نورستان",
    "label": "Nuristan",
    "districts": [
      { "code": "130001", "title": "برگ متال" },
      { "code": "130002", "title": "پارون" },
      { "code": "130003", "title": "دو آب" },
      { "code": "130004", "title": "کامدیش" },
      { "code": "130005", "title": "مندول" },
      { "code": "130006", "title": "نورگرام" },
      { "code": "130007", "title": "واما" },
      { "code": "130008", "title": "وایگل" }
    ]
  },
  {
    "code": "131",
    "name": "نیمروز",
    "label": "Nimruz",
    "districts": [
      { "code": "131001", "title": "چخان سور" },
      { "code": "131002", "title": "چهاربرجک" },
      { "code": "131003", "title": "خاش رود" },
      { "code": "131004", "title": "زرنج" },
      { "code": "131005", "title": "کنگ" }
    ]
  },
  {
    "code": "132",
    "name": "هرات",
    "label": "Herat",
    "districts": [
      { "code": "132001", "title": "آدرسکن" },
      { "code": "132002", "title": "انجیل" },
      { "code": "132003", "title": "آوبه" },
      { "code": "132004", "title": "چشت شریف" },
      { "code": "132005", "title": "زنده جان" },
      { "code": "132006", "title": "شیندند (سبزوار)" },
      { "code": "132007", "title": "زیر کوه" },
      { "code": "132008", "title": "پشت کوه" },
      { "code": "132009", "title": "کوه زور" },
      { "code": "132010", "title": "زاول" },
      { "code": "132011", "title": "پشتون زرغون" },
      { "code": "132012", "title": "غوریان" },
      { "code": "132013", "title": "فارسی" },
      { "code": "132014", "title": "کرخ" },
      { "code": "132015", "title": "کشک" },
      { "code": "132016", "title": "کشک کهنه" },
      { "code": "132017", "title": "کهسان" },
      { "code": "132018", "title": "گذره" },
      { "code": "132019", "title": "گلران" }
    ]
  },
  {
    "code": "133",
    "name": "هلمند",
    "label": "Helmand",
    "districts": [
      { "code": "133001", "title": "بقران" },
      { "code": "133002", "title": "دیشو" },
      { "code": "133003", "title": "ریگ خان نشین" },
      { "code": "133004", "title": "سنگین" },
      { "code": "133005", "title": "کجکی" },
      { "code": "133006", "title": "گرمسیر" },
      { "code": "133007", "title": "لشکرگاه" },
      { "code": "133008", "title": "موسی قلعه" },
      { "code": "133009", "title": "نادعلی" },
      { "code": "133010", "title": "ناوه بارکزایی" },
      { "code": "133011", "title": "نوزاد" },
      { "code": "133012", "title": "نهر سراج" },
      { "code": "133013", "title": "واشیر" }
    ]
  }
]

async function seedParametersJobsPeriods() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("✅ MongoDB Connected");

        // پاک‌سازی
        await ParameterCategory.deleteMany({});
        await ParameterItem.deleteMany({});
        await JobCategory.deleteMany({});
        await Job.deleteMany({});
        await Period.deleteMany({});
        await DistrictProvince.deleteMany({});
        await District.deleteMany({});
        await Period.deleteMany({});

        console.log("♻️ Old data cleared");

        // -----------------------------
        // ایجاد پارامترها (استفاده مستقیم از داده‌های کدگذاری شده در آرایه PARAMS)
        // -----------------------------
        for (const param of CODED_PARAMS) {
            const category = new ParameterCategory({
                // فیلدها مستقیماً از ساختار JSON (param.label, param.name, param.code) گرفته می‌شوند.
                label: param.label, 
                name: param.name,
                code: param.code 
            });
            await category.save();

            const itemsToInsert = param.items.map(item => ({
                value: item.value,
                code: item.code, // ذخیره کد آیتم
                categoryId: category._id
            }));
            
            await ParameterItem.insertMany(itemsToInsert);
        }

        console.log("✅ Parameters created with codes");

        // -----------------------------
        // ایجاد مشاغل و گروه‌های شغلی
        // -----------------------------
        for (const group of JOBS) {
            const jobCat = new JobCategory({
                name: group.name,
                label: group.label,
                isActive: true
            });
            await jobCat.save();

            const jobsToInsert = group.jobs.map(j => ({
                code: j.code,
                title: j.title,
                categoryId: jobCat._id,
                isActive: true
            }));

            await Job.insertMany(jobsToInsert);
        }

        console.log("✅ Job categories & Jobs created");

        // -----------------------------
        // ایجاد ولایت و ولسوالی ها
        // -----------------------------
        for (const group of AFGHANISTAN_districts) {
          const DistrictProv = new DistrictProvince({
              code: group.code,
              name: group.name,
              label: group.label,
          });
          await DistrictProv.save();

          const districtToInsert = group.districts.map(j => ({
              code: j.code,
              title: j.title,
              districtityProvinceId: DistrictProv._id,
          }));

          await District.insertMany(districtToInsert);
      }

      console.log("✅ Job categories & Jobs created");

        // -----------------------------
        // ایجاد دوره نمونه
        // -----------------------------
        await Period.create({
            code: 1,
            cityCode: '511',
            title: 'دوره نمونه 1404',
            startDate: new Date('2025-01-01'),
            endDate: new Date('2025-12-31'),
            description: 'دوره نمونه',
            isActive: true
        });

        console.log("✅ Sample Period created");

        console.log("🎉 SEED OPERATION COMPLETED");
        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

seedParametersJobsPeriods();