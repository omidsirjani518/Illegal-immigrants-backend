import{j as e}from"./index-GhWJIKHN.js";import{S as d}from"./SyntaxHighlighter-vEs4QLZU.js";import{H as o}from"./index-LFSVRvyg.js";import{T as n}from"./index-CafsBiJy.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./index.esm-LgaHOLu1.js";const{Tr:r,Th:t,Td:c,THead:s,TBody:i}=n,p={api:[{propName:"apiPrefix",type:"<code>string</code>",defaultDemo:"<code>'/api'</code>",defaultStarter:"<code>'/api'</code>",desc:"مسیر پیشوند برای URL API"},{propName:"authenticatedEntryPath",type:"<code>string</code>",defaultDemo:"<code>'/app/sales/dashboard'</code>",defaultStarter:"<code>'/home'</code>",desc:"آدرس URL که پس از احراز هویت هدایت می‌شود"},{propName:"unAuthenticatedEntryPath",type:"<code>string</code>",defaultDemo:"<code>'/sign-in'</code>",defaultStarter:"<code>'/sign-in'</code>",desc:"آدرس URL که در صورت عدم اعتبار احراز هویت هدایت می‌شود"},{propName:"tourPath",type:"<code>string</code>",defaultDemo:"<code>'/app/account/kyc-form'</code>",defaultStarter:"<code>'/'</code>",desc:"آدرس URL که پس از ثبت‌نام هدایت می‌شود"},{propName:"locale",type:"<code>string</code>",defaultDemo:"<code>'en'</code>",defaultStarter:"<code>'en'</code>",desc:"مقدار زبان برنامه"},{propName:"enableMock",type:"<code>boolean</code>",defaultDemo:"<code>true</code>",defaultStarter:"<code>true</code>",desc:"آیا اتصال API به سرور mock فعال شود یا خیر"}]},g=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["می‌توانید برخی از مقادیر استاتیک مربوط به برنامه را در"," ",e.jsx("code",{children:"src/configs/app.config.ts"})," پیکربندی کنید. در ادامه تنظیمات پیش‌فرض آورده شده‌اند."]}),e.jsx("span",{children:e.jsx("i",{children:"دمو"})}),e.jsx(d,{language:"ts",children:`const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/app/sales/dashboard',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/app/account/kyc-form',
    locale: 'en',
    enableMock: true
}`}),e.jsx("span",{children:e.jsx("i",{children:"شروع‌کننده"})}),e.jsx(d,{language:"ts",children:`const appConfig: AppConfig = {
    apiPrefix: '/api',
    authenticatedEntryPath: '/home',
    unAuthenticatedEntryPath: '/sign-in',
    tourPath: '/',
    locale: 'en',
    enableMock: true
}`}),e.jsx("h5",{className:"-mb-2 mt-6",children:"فهرست اطلاعات"}),e.jsxs(n,{className:"demo-api-table",children:[e.jsx(s,{children:e.jsxs(r,{children:[e.jsx(t,{children:"خصوصیات"}),e.jsx(t,{children:"توضیحات"}),e.jsx(t,{children:"نوع"}),e.jsx(t,{children:"پیش‌فرض (دمو)"}),e.jsx(t,{children:"پیش‌فرض (شروع‌کننده)"})]})}),e.jsx(i,{children:p.api.map(a=>e.jsxs(r,{children:[e.jsx(c,{className:"font-semibold",children:a.propName}),e.jsx(c,{className:"flex",style:{width:"200px"},children:o(a.desc||"")}),e.jsx(c,{children:o(a.type||"")}),e.jsx(c,{children:o(a.defaultDemo||"")}),e.jsx(c,{children:o(a.defaultStarter||"")})]},`row-${a.propName}`))})]})]});export{g as default};
