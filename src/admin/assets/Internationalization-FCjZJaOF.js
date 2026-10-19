import{j as e}from"./index-xmcPujHc.js";import{S as n}from"./SyntaxHighlighter-GM-iHFRn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const o=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["الستار از"," ",e.jsx("a",{href:"https://react.i18next.com/",target:"_blank",rel:"noopener noreferrer",children:"react-i18next"})," ","برای بین‌المللی‌سازی استفاده می‌کند. فایل‌های مرتبط می‌توانند در"," ",e.jsx("code",{children:"src/locales/*"})," پیدا شوند."]}),e.jsxs("div",{className:"mt-10",id:"translatingText",children:[e.jsx("h5",{children:"ترجمه متن"}),e.jsxs("p",{className:"mt-1",children:["یکی از ساده‌ترین راه‌ها برای ترجمه متن استفاده از هوک"," ",e.jsx("code",{children:"useTranslate"})," است که توسط react-i18next ارائه شده است."]}),e.jsx(n,{language:"tsx",children:`import { useTranslation } from 'react-i18next'
    
    const Component = () => {
    
        const { t } = useTranslation()
    
        return (
            <div>{t('your.translate.key')}</div>
        )
    }
    
    export default Component`})]}),e.jsxs("div",{className:"mt-10",id:"changingLanguage",children:[e.jsx("h5",{children:"تغییر زبان"}),e.jsxs("p",{className:"mt-1",children:["همچنین می‌توانید از هوک ",e.jsx("code",{children:"useTranslate"})," برای به‌روزرسانی زبان فعلی استفاده کنید."]}),e.jsx(n,{language:"tsx",children:`import { useTranslation } from 'react-i18next'
    
    const Component = () => {
    
        const { i18n } = useTranslation()
    
        return (
            <button onClick={() => i18n.changeLanguage('fr')}>تغییر زبان</button>
        )
    }
    
    export default Component`})]}),e.jsxs("div",{className:"mt-10",id:"addNewLocale",children:[e.jsx("h5",{children:"اضافه کردن زبان جدید"}),e.jsxs("p",{className:"mt-1",children:["تمام داده‌های زبان را زیر ",e.jsx("code",{children:"src/locales/lang/*"})," ذخیره می‌کنیم. برای اضافه کردن یک زبان جدید، یک فایل Json زیر این دایرکتوری ایجاد کنید. به عنوان مثال ",e.jsx("code",{children:"fr.json"})]}),e.jsx(n,{language:"json",children:`{
        "your": {
            "translate": {
                "key": "votre clé de traduction"
            },
        }
    }`}),e.jsxs("p",{children:["حالا می‌توانید این فایل را در"," ",e.jsx("code",{children:"src/locales/index.ts"})," وارد کرده و آنها را به فیلد"," ",e.jsx("code",{children:"resources"})," درج کنید، این فایل ورودی همه زبان‌هاست. همچنین یک شیء ایجاد کنید تا زبان تاریخ را به صورت پویا از"," ",e.jsx("a",{href:"https://github.com/iamkun/dayjs/tree/dev/src/locale",target:"_blank",rel:"noopener noreferrer",children:e.jsx("code",{children:"dayjs"})}),"بارگذاری کنید."]}),e.jsx(n,{language:"ts",children:`import i18n from 'i18next'
    import { initReactI18next } from 'react-i18next'
    import en from './lang/en.json'
    import fr from './lang/fr.json'
    
    const resources = {
        en: {
            translation: en
        },
        fr: { // <--- این مقداری است که شما در متد changeLanguage استفاده می‌کنید
            translation: fr
        },
    }
    
    // همسان‌سازی کلید با منابع برای بارگذاری زبان مرتبط از day.js
    export const dateLocales: {
        [key: string]: () => Promise<ILocale>;
    } = {
        en: () => import('dayjs/locale/en'),
        fr: () => import('dayjs/locale/fr'),
    }
    
    `}),e.jsx("p",{children:"و حالا زبان جدید تنظیم شده است."})]}),e.jsxs("div",{className:"mt-10",id:"settingDefaultLanguage",children:[e.jsx("h5",{children:"حذف بین‌المللی‌سازی"}),e.jsxs("p",{className:"mt-1",children:["برای تنظیم زبان پیش‌فرض، شما باید به"," ",e.jsx("code",{children:"src/configs/app.config.ts"})," بروید و مقدار فیلد"," ",e.jsx("code",{children:"locale"})," را تغییر دهید."]}),e.jsx(n,{language:"ts",children:`export const appConfig = {
    ...
    locale: 'fr'
}`})]})]});export{o as default};
