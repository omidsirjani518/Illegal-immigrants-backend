import{j as e}from"./index-Uer-29bb.js";import{S as o}from"./SyntaxHighlighter-Jft-s7Gq.js";import{D as d}from"./DemoComponentApi-8NssV0R-.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";const p=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["تمام تنظیمات قالب در ",e.jsx("code",{children:"src/configs/theme.config.ts"})," با مقادیر پیش‌فرض معتبر در تمام فیلدها فهرست شده‌اند. می‌توانید تنظیمات را بر اساس نیازهای خود تغییر دهید. اینجا پیکربندی پیش‌فرض است:"]}),e.jsx(o,{language:"ts",children:`import { THEME_ENUM } from '@/constants/theme.constant';
import { Direction, Mode, ColorLevel, NavMode, ControlSize, LayoutType } from '@/@types/theme';

export type ThemeConfig = {
    themeColor: string;
    direction: Direction;
    mode: Mode;
    primaryColorLevel: ColorLevel;
    panelExpand: boolean;
    navMode: NavMode;
    controlSize: ControlSize;
    cardBordered: boolean;
    layout: {
        type: LayoutType;
        sideNavCollapse: boolean;
    };
};

export const themeConfig: ThemeConfig = {
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
};
`}),e.jsxs("div",{className:"mt-10",id:"properties",children:[e.jsx("h5",{children:"ویژگی‌ها"}),e.jsx(d,{hideApiTitle:!0,api:[{api:[{propName:"themeColor",type:'<code>string</code> | <a href="https://tailwindcss.com/docs/customizing-colors" rel="noreferrer" target="_blank">پالت رنگی پیش‌فرض tailwind</a>',default:"<code>'indigo'</code>",desc:"رنگ قالب"},{propName:"direction",type:"<code>'ltr'</code> | <code>'rtl'</code>",default:"<code>'ltr'</code>",desc:"جهت قالب"},{propName:"mode",type:"<code>'light'</code> | <code>'dark'</code>",default:"<code>'ltr'</code>",desc:"تنظیم حالت روشن یا تاریک برای قالب"},{propName:"primaryColorLevel",type:'<code>number</code> | <a href="https://tailwindcss.com/docs/customizing-colors" rel="noreferrer" target="_blank">پالت رنگی پیش‌فرض tailwind</a>',default:"<code>600</code>",desc:"سطح رنگ <code>themeColor</code>"},{propName:"cardBordered",type:"<code>boolean</code>",default:"<code>true</code>",desc:"آیا تمام کارت‌ها به صورت پیش‌فرض حاوی حاشیه باشند یا خیر"},{propName:"panelExpand",type:"<code>boolean</code>",default:"<code>false</code>",desc:"آیا پنل کناری به صورت پیش‌فرض گسترش یابد یا خیر"},{propName:"controlSize",type:"<code>'xs'</code> | <code>'sm'</code> | <code>'md'</code> | <code>'lg'</code>",default:"<code>'md'</code>",desc:"تعیین اندازه پیش‌فرض تمام کنترل‌ها"},{propName:"navMode",type:"<code>'transparent'</code> | <code>'light'</code> | <code>'dark'</code> | <code>'themed'</code>",default:"<code>'transparent'</code>",desc:"رنگ ناوبری"},{propName:"layout.type",type:"<code>'blank'</code>  | <code>'classic'</code> | <code>'modern'</code> | <code>'simple'</code> | <code>'decked'</code> | <code>'stackedSide'</code>",default:"<code>'modern'</code>",desc:"نوع چیدمان برنامه"},{propName:"layout.sideNavCollapse",type:"<code>boolean</code>",default:"<code>false</code>",desc:"آیا ناوبری کناری به صورت پیش‌فرض جمع شود یا خیر (فقط زمانی که (type) (classic) یا (modern) باشد"}]}]})]}),e.jsxs("div",{className:"mt-10",id:"properties",children:[e.jsx("h5",{children:"ثبت دائمی"}),e.jsxs("p",{children:["برخی از فیلدهای ",e.jsx("code",{children:"themeConfig"})," در ریداکس ما ثبت شده‌اند، می‌توانید به ",e.jsx("code",{children:"src/store/slices/theme/themeSlice.ts"})," مراجعه کنید و فیلدی که نمی‌خواهید ثبت شود را از ",e.jsx("code",{children:"initialState"})," حذف کنید."]}),e.jsx(o,{language:"ts",children:`const initialState: ThemeState = {
    themeColor: themeConfig.themeColor,
    direction: themeConfig.direction,
    mode: themeConfig.mode,
    primaryColorLevel: themeConfig.primaryColorLevel,
    panelExpand: themeConfig.panelExpand,
    cardBordered: themeConfig.cardBordered,
    navMode: initialNavMode(),
    layout: themeConfig.layout,
}`})]})]});export{p as default};
