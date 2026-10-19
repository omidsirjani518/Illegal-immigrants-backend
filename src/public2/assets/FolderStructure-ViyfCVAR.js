import{j as t}from"./index-GhWJIKHN.js";import{S as s}from"./SyntaxHighlighter-vEs4QLZU.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const o=()=>t.jsxs(t.Fragment,{children:[t.jsx("p",{children:"در این بخش، ساختار پوشه‌های اصلی و همه چیزی که برای اجرای قالب نیاز دارید را پیدا خواهید کرد. هر دو نسخه نمایشی و شروع‌کننده از ساختار یکسانی برخوردار هستند، به جز این که نسخه شروع‌کننده تعداد کمتری پرونده و پوشه دارد نسبت به نسخه نمایشی زیرا در شروع‌کننده لازم نیستند."}),t.jsx("p",{children:"در زیر نمودار توپولوژی ساختار دایرکتوری آورده شده است:"}),t.jsx(s,{children:`
├── public                        # منابع استاتیک
|   ├── img                       # تصاویر
|   ├── data                      # داده‌های استاتیک
|   └── ...                       # سایر فایل‌های استاتیک
├── src
│   ├── @types                    # فایل‌های نوعی که در سراسر قالب به اشتراک می‌روند
│   │   ├── ...                   
│   ├── assets                    # منابع استاتیک برنامه
│   │   ├── maps                  # اطلاعات متا نقشه 
│   │   ├── markdown              # فایل‌های Markdown
│   │   ├── styles                # فایل‌های CSS جهانی
│   │   └── svg	                  # فایل‌های SVG
│   ├── components                # کامپوننت‌های عمومی
│   │   ├── docs                  # کامپوننت‌های مربوط به مستندات
│   │   ├── layout                # کامپوننت‌های طراحی
│   │   ├── route                 # کامپوننت‌های مربوط به مسیر
│   │   ├── shared                # کامپوننت‌های سطح بالا بر پایه کامپوننت‌های واسط کاربر
│   │   ├── template              # کامپوننت‌های قالب، مانند هدر، فوتر، نویگیشن و غیره...
│   │   └── ui                    # کامپوننت‌های سطح پایین، مانند دکمه، دراپ‌داون و غیره...
│   ├── configs                   # پرونده‌های پیکربندی        
│   │   └── ...          
│   ├── constants                 # پرونده‌های ثابت
│   │   └── ...      
│   ├── locales                   # تنظیمات لوکالیزیشن
│   │   ├── lang
│   │   |   └── ...               # فایل‌های JSON زبان
│   │   └── index.ts              # پرونده ورودی لوکالیزیشن
│   ├── mock                      # داده‌های جعلی برای فراخوانی‌های API جعلی
│   │   ├── data                  # داده‌های جعلی
│   │   |   └── ...               # پرونده‌های TS داده‌های جعلی
│   │   ├── fakeApi               # تنظیمات API جعلی
│   │   |   └── ...               # پرونده‌های TS API جعلی
│   │   └── index.ts              # پرونده ورودی جعلی
│   ├── services                  # پرونده‌های سرویس برای مدیریت ادغام‌های API
│   │   ├── ApiService.ts         # درخواست و پاسخ API
│   │   ├── BaseService.ts        # پیکربندی و اینترسپتورهای Axios
│   │   └── ...                   # سایر پرونده‌های سرویس
│   ├── store                     # فروشگاه اصلی Redux
│   │   ├── slices                # اسلایس‌های عمومی 
│   │   |   └── ...           
│   │   ├── hook.ts               # پرونده‌ی هوک فروشگاه    
│   │   ├── index.ts              # پرونده ورودی فروشگاه
│   │   └── rootReducer.ts        # روت ریدیوس
│   │   └── storeSetup.ts         # پیکربندی کلی فروشگاه
│   ├── utils                     # همه توابع و هوک‌های قابل استفاده مجدد
│   │   ├── hooks                 # هوک‌ها
│   │   |   └── ...      					
│   │   └── ...                   # توابع قابل استفاده مجدد 
│   ├── views                     # فایل‌های نمایشی که همه صفحات را رندر می‌کنند
│   |   ├── ...                   # تمام فایل‌های نمایشی
│   |   └── index.ts              # نقطه ورود نمایش
│   |   App.tsx                   # راه‌اندازی برنامه
│   |   index.css                 # پرونده ورودی CSS
│   |   main.tsx                  # نقطه ورود React
│   |   mdDynamicImporter.tsx     # رسیدگی به واردات پرونده md پویا
│   └── vite-env.d.ts             # اعلان محیط Vite
├── .twSafelistGenerator          # Middleware Tailwind برای لیست ایمن
├── .eslintignore                 # پرونده چشم‌پوشی برای eslint  
├── .eslintrc.cjs                 # پیکربندی eslint
├── .gitignore                    # پرونده چشم‌پوشی برای git
├── .prettierignore               # پرونده چشم‌پوشی برای prettier
├── .prettierrc                   # پیکربندی Prettier 
├── index.html                    # پرونده ورودی برای وب
├── package.json                  
├── package.lock.json            
├── postcss.config.cjs            # پرونده پیکربندی PostCss
├── README.md  
├── safelist.txt                  # یک فهرست سفید ایجاد شده برای کلاس‌های Tailwind CSS 
├── tailwind.config.cjs           # پرونده پیکربندی TailwindCSS
├── tsconfig.eslint.json          # پیکربندی Typescript برای eslint
├── tsconfig.json                 # پرونده پیکربندی اصلی Typescript
├── tsconfig.eslint.json          # پیکربندی Typescript برای node
└── vite.config.ts                # پرونده پیکربندی Vite
`})]});export{o as default};
