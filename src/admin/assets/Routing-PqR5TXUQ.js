import{j as e}from"./index-xmcPujHc.js";import{S as t}from"./SyntaxHighlighter-GM-iHFRn.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";const p=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["Elstar از"," ",e.jsx("a",{href:"https://reactrouter.com/",target:"_blank",rel:"noopener noreferrer",children:"react-router"})," ","به عنوان سیستم مسیریابی اصلی استفاده می‌کند. در این راهنما، چگونگی ایجاد مسیرهای جدید و نحوه کارکرد مسیرهای موجود را خواهید دید."]}),e.jsxs("div",{className:"mt-6",id:"overview",children:[e.jsx("h5",{children:"بررسی کلی"}),e.jsxs("p",{className:"my-1",children:["تنظیمات مسیردهی قالب را می‌توانید در"," ",e.jsx("code",{children:"src/configs/routes.config/index.ts"})," پیدا کنید، دو نوع گروه مسیر به شرح زیر وجود دارد."]}),e.jsx(t,{language:"js",children:`export const publicRoutes = [
    ...
]

export const protectedRoutes = [
    ...
]`}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"publicRoutes"}),e.jsx("p",{className:"mt-1",children:"این گروه مسیرها شامل تمام مسیرهایی است که برای همه کاربران باز است."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"protectedRoutes"}),e.jsx("p",{className:"mt-1",children:"این گروه مسیرها شامل تمام مسیرهایی است که نیاز به احراز هویت دارند."})]})]})]}),e.jsxs("div",{className:"mt-10",id:"addingNewRoute",children:[e.jsx("h5",{children:"افزودن مسیر جدید"}),e.jsx("p",{className:"mt-1",children:"می‌توانید کد زیر را به هر یک از گروه‌های مسیردهی اضافه کنید، بسته به اختیاری که می‌خواهید."}),e.jsx(t,{language:"js",children:`export const protectedRoutes = [
	{
        key: 'a-unique-id-for-this-view'
        path: 'my-new-view-path',
        component: lazy(() => import('@/views/MyNewComponent')),
        authority: [],
        meta: {
            pageContainerType: 'gutter'
        }
    },			
]`})]}),e.jsxs("div",{className:"mt-10",id:"authority",children:[e.jsx("h5",{children:"اختیارات"}),e.jsxs("p",{className:"mt-1",children:["مسیرهای Elstar با یک کنترل دسترسی ساده مبتنی بر نقش ارائه می‌شوند، شما می‌توانید نقش‌های قابل دسترسی را به عنوان یک آرایه در فیلد"," ",e.jsx("code",{children:"authority"})," تعیین کنید. کد زیر به عنوان مثال نشان می‌دهد که این مسیر فقط برای کاربرانی که نقش‌های"," ",e.jsx("code",{children:"'admin'"})," یا ",e.jsx("code",{children:"'user'"})," را در پروفایل خود دارند، قابل دسترسی است.",e.jsx("br",{}),"اگر ",e.jsx("code",{children:"authority"})," را به عنوان یک آرایه خالی رها کنید، مسیر به همه نقش‌ها باز خواهد بود."]}),e.jsx(t,{language:"js",children:`export const protectedRoutes = [
    {
        ...
        authority: ['admin', 'user'],
    },			
]`}),e.jsxs("p",{children:["در ",e.jsx("code",{children:"AuthorityGuard"})," پیش‌فرض ما، نقش کاربر فعلی از وضعیت redux (",e.jsx("code",{children:"auth.user.authority"}),") بررسی می‌شود. می‌توانید از این مورد به عنوان پایه برای گسترش یا سفارشی کردن کنترل دسترسی خود استفاده کنید."]}),e.jsxs("div",{className:"mt-10",id:"authority",children:[e.jsx("h5",{children:"فراداده (Meta)"}),e.jsxs("p",{className:"mt-1",children:["فیلد ",e.jsx("code",{children:"meta"})," به ما این امکان را می‌دهد که اطلاعات اضافی را به"," ",e.jsx("code",{children:"PageContainer"})," یا مولفه نمایش زیر این مسیر منتقل کنیم."]}),e.jsx(t,{language:"js",children:`export const protectedRoutes = [
    {
        ...
        meta: {
            pageContainerType: 'gutter',
            header: 'Page Title',
            headerContainer: false,
            extraHeader: lazy(() => import('SomeComponent')),
            footer: false,
            layout: 'blank',
        }
    },			
]`}),e.jsxs("p",{children:["مولفه نمایش زیر این مسیر قادر خواهد بود که تمامی اطلاعات ",e.jsx("code",{children:"meta"})," فوق را دریافت کند."]}),e.jsx(o,{hideApiTitle:!0,keyText:"ویژگی‌ها",api:[{api:[{propName:"pageContainerType",type:"<code>'default'</code>  | <code>'gutterless'</code> | <code>'contained'</code>",default:"<code>'default'</code>",desc:"نوع کانتینر نمایش"},{propName:"header",type:"<code>string</code>  | <code>object</code>",default:"-",desc:"عنوان صفحه یا المان سفارشی نمایش صفحه"},{propName:"headerContainer",type:"<code>boolean</code>",default:"-",desc:"فعال یا غیرفعال کردن کانتینر هدر"},{propName:"extraHeader",type:"<code>string</code>  | <code>object</code>",default:"-",desc:"اعمال یک المان سفارشی در مقابل هدر"},{propName:"footer",type:"<code>boolean</code>",default:"<code>true</code>",desc:"نمایش یا عدم نمایش فوتر"},{propName:"layout",type:"<code>'blank'</code>  | <code>'classic'</code> | <code>'modern'</code> | <code>'simple'</code> | <code>'decked'</code> | <code>'stackedSide'</code>",default:"-",desc:"تغییر لایه فعلی برای این صفحه"}]}]})]})]})]});export{p as default};
