import{j as e}from"./index-xmcPujHc.js";import{S as t}from"./SyntaxHighlighter-GM-iHFRn.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";const l=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["ساختار ناوبری را به عنوان آرایه‌ای از اشیاء تشکیل می‌دهیم و آن را در نهایت در رابط کاربری رندر می‌کنیم. می‌توانید ناوبری برنامه را به سادگی تغییر یا سفارشی کنید با دسترسی به"," ",e.jsx("code",{children:"src/configs/navigation.config/index.ts"})]}),e.jsx("p",{children:"اینجا نوع یک مورد منو را مشاهده می‌کنید"}),e.jsx(t,{language:"ts",children:`interface NavigationTree {
    key: string;
    path: string;
    isExternalLink?: boolean;
    title: string;
    translateKey: string;
    icon: string;
    type: 'title' | 'collapse' | 'item';
    authority: string[];
    subMenu: NavigationTree[];
}`}),e.jsx("br",{}),e.jsx(o,{hideApiTitle:!0,keyText:"properties",api:[{api:[{propName:"key",type:"<code>string</code>",default:"-",desc:"یک کلید یکتا که باید با مسیری که این منو به آن می‌رود هماهنگ باشد"},{propName:"path",type:"<code>string</code>",default:"-",desc:"آدرس URL که به آن مورد منو لینک می‌شود"},{propName:"isExternalLink",type:"<code>boolean</code>",default:"-",desc:"آیا لینک باید با کلیک در تب جدید باز شود"},{propName:"title",type:"<code>string</code>",default:"-",desc:"متن نمایش داده شده این مورد منو"},{propName:"translateKey",type:"<code>string</code>",default:"-",desc:"کلید ترجمه برای ترجمه متن نمایش داده شده در مورد منو، در صورت خالی یا نامعتبر بودن، به (title) برمی‌گردد"},{propName:"icon",type:"<code>string</code>",default:"-",desc:"نمایش آیکون در مورد منو، مقدار رشته باید با کلید شیء در (navigation-icon.config.tsx) مطابقت داشته باشد"},{propName:"type",type:"<code>'title'</code>  | <code>'collapse'</code> | <code>'item'</code>",default:"-",desc:"تعیین نوع مورد فعلی منو"},{propName:"authority",type:"<code>string[]</code>",default:"-",desc:"نمایش موارد منو به کاربرانی که نقش‌های داده شده را دارند، اگر این فیلد تعیین نشده یا آرایه خالی باشد، مسدودیت دسترسی نخواهد بود"},{propName:"authority",type:"<code>navigationConfig[]</code>",default:"-",desc:"آیا در این مورد منو فرزند داریم؟ این یک گروه منو زیر این مورد منو را رندر می‌کند، اگر (type) (title) یا (collapse) باشد، این فیلد ویژگی‌های داخل این جدول را می‌پذیرد"}]}]}),e.jsx("p",{children:"یک نمونه از تنظیمات ساختاری ناوبری"}),e.jsx(t,{language:"ts",children:`const navigationConfig = [
    {
        key: 'uiComponent',
        path: '',
        title: 'Ui Component',
        translateKey: 'nav.uiComponents',
        icon: 'uiComponents',
        type: 'title',
        authority: ['admin', 'user'],
        subMenu: [
            {
                key: 'uiComponent.common',
                path: '',
                title: 'Common',
                translateKey: 'nav.uiComponentsCommon.common',
                icon: 'common',
                type: 'collapse',
                authority: ['admin', 'user'],
                subMenu: [
                    {
                        key: 'uiComponent.common.button',
                        path: '/button',
                        title: 'Button',
                        translateKey: 'nav.uiComponentsCommon.button',
                        icon: '',
                        type: 'item',
                        authority: ['admin', 'user'],
                        subMenu: []
                    },
                    {
                        key: 'uiComponent.common.typography',
                        path: '/typography',
                        title: 'Typography',
                        translateKey: 'nav.uiComponentsCommon.typography',
                        icon: '',
                        type: 'item',
                        authority: ['admin', 'user'],
                        subMenu: []
                    }
                ]
            }
        ]
    }
]`}),e.jsxs("div",{className:"mt-10",id:"configuringNavigationIcon",children:[e.jsx("h5",{children:"پیکربندی آیکون ناوبری"}),e.jsxs("p",{className:"mt-1",children:["پیکربندی آیکون ناوبری در یک فایل جداگانه در"," ",e.jsx("code",{children:"src/configs/navigation-icon.config.tsx"})," قرار دارد."]}),e.jsxs("p",{children:["در مثال بالا، ما از مقدار رشته‌ای ",e.jsx("code",{children:"uiComponents"})," در فیلد"," ",e.jsx("code",{children:"icon"})," استفاده کردیم. بنابراین، باید این مقدار را در"," ",e.jsx("code",{children:"navigation-icon.config.ts"})," استفاده کنیم تا آیکون برای callout تعریف شود."]}),e.jsxs("p",{children:["ابتدا، آیکون مورد نظر را از"," ",e.jsx("a",{href:"https://react-icons.github.io/react-icons/",target:"_blank",rel:"noreferrer",children:"react-icons"})," ","وارد کنید"]}),e.jsx(t,{language:"ts",children:`import { FaBeer } from 'react-icons/fa'

const navigationIcon = {}
`}),e.jsxs("p",{children:["مقدار استفاده شده در فیلد ",e.jsx("code",{children:"icon"})," را به عنوان مؤلفه آیکون وارد کنید"]}),e.jsx(t,{language:"tsx",children:`import { FaBeer } from 'react-icons/fa'

const navigationIcon = {
    uiComponents: <FaBeer />
}
`}),e.jsx("p",{children:"حالا مورد مناسب درخت منو به عنوان آیکون منو راه اندازی می‌کند."})]})]});export{l as default};
