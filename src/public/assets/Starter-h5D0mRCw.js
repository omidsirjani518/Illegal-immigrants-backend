import{j as o,b9 as e}from"./index-Uer-29bb.js";import{S as t}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>o.jsxs(o.Fragment,{children:[o.jsxs("p",{children:["همانطور که در"," ",o.jsx(e,{to:"/docs/documentation/installation",children:"نصب و راه‌اندازی"})," ","اشاره کردیم، نسخه‌ی شروع‌کننده با حداقل مولفه‌ها و تنظیمات اصلی فراهم شده است و ما به شدت توصیه می‌کنیم تا توسعه‌دهندگان از این نسخه برای ساخت برنامه خود استفاده کنند."]}),o.jsxs("p",{children:["وقتی شما نسخه‌ی شروع‌کننده را در محیط محلی‌تان باز کرده‌اید، به صفحه ورود منتقل می‌شوید که می‌توانید از اعتبارهای"," ",o.jsx("i",{children:"کاربر: admin | رمز عبور: 123Qwe"})," برای ورود استفاده کنید."]}),o.jsxs("i",{children:["توجه: نسخه‌ی شروع‌کننده به طور پیش‌فرض از Mock API فعال شده است و تمام تماس‌های API به سمت سرور Mock ارجاع می‌شود. اگر می‌خواهید از این ویژگی استفاده نکنید یا بیشتر در مورد Mock API بدانید، به مستند"," ",o.jsx(e,{to:"/docs/documentation/mock-api",children:"Mock API"})," ","مراجعه کنید."]}),o.jsxs("div",{className:"mt-10",id:"defaultConfig",children:[o.jsx("h5",{children:"پیکربندی‌های پیش‌فرض"}),o.jsx("p",{children:"در ادامه، تعدادی از پیکربندی‌های پیش‌فرض برای نسخه‌ی شروع‌کننده آورده شده است که شما می‌توانید تنظیمات را به موقعیت خود تغییر دهید."}),o.jsxs("p",{className:"mb-2",children:["AppConfig -"," ",o.jsx(e,{to:"/docs/documentation/app",children:"مستند"})]}),o.jsx(t,{language:"js",children:`const appConfig: AppConfig = {
        apiPrefix: '/api',
        authenticatedEntryPath: '/app/sales/dashboard',
        unAuthenticatedEntryPath: '/sign-in',
        tourPath: '/app/account/kyc-form',
        locale: 'en',
        enableMock: true,
    }
    `}),o.jsxs("p",{className:"mb-2",children:["ThemeConfig -"," ",o.jsx(e,{to:"/docs/documentation/overall-theme-config",children:"مستند"})]}),o.jsx(t,{language:"js",children:`export const themeConfig: ThemeConfig = {
        themeColor: 'indigo',
        direction: THEME_ENUM.DIR_LTR,
        mode: THEME_ENUM.MODE_LIGHT,
        primaryColorLevel: 600,
        cardBordered: true,
        panelExpand: false,
        controlSize: 'md',
        navMode: THEME_ENUM.NAV_MODE_LIGHT,
        layout: {
            type: THEME_ENUM.LAYOUT_TYPE_MODERN,
            sideNavCollapse: false,
        },
    }
    `}),o.jsxs("p",{className:"mb-2",children:["RoutesConfig -"," ",o.jsx(e,{to:"/docs/documentation/routing",children:"مستند"})]}),o.jsx(t,{language:"js",children:`const publicRoutes = [
        {
            key: 'signIn',
            path: '/sign-in',
            component: lazy(() => import('@/views/auth/SignIn')),
            authority: [],
        },
        {
            key: 'signUp',
            path: '/sign-up',
            component: lazy(() => import('@/views/auth/SignUp')),
            authority: [],
        },
        {
            key: 'forgotPassword',
            path: '/forgot-password',
            component: lazy(() => import('@/views/auth/ForgotPassword')),
            authority: [],
        },
        {
            key: 'resetPassword',
            path: '/reset-password',
            component: lazy(() => import('@/views/auth/ResetPassword')),
            authority: [],
        },
    ]
    
    export const protectedRoutes = [
        {
            key: 'home',
            path: '/home',
            component: lazy(() => import('@/views/Home')),
            authority: [],
        },
    ]
    `}),o.jsxs("p",{className:"mb-2",children:["NavConfig -"," ",o.jsx(e,{to:"/docs/documentation/routing",children:"مستند"})]}),o.jsx(t,{language:"js",children:`const navigationConfig = [
        {
            key: 'home',
            path: '/home',
            title: 'خانه',
            translateKey: 'nav.home',
            icon: 'home',
            type: NAV_ITEM_TYPE_ITEM,
            authority: [],
            subMenu: []
        },
    ]
`})]})]});export{r as default};
