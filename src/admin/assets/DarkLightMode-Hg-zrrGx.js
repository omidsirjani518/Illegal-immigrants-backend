import{j as e}from"./index-xmcPujHc.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const s=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:["برای مقداردهی اولیه جهت برنامه، به سادگی فیلد ",e.jsx("code",{children:"direction"})," را به ",e.jsx("code",{children:"'ltr'"})," یا ",e.jsx("code",{children:"'rtl'"})," در"," ",e.jsx("code",{children:"src/configs/theme.config.ts"})," تنظیم کنید. به عنوان مثال:"]}),e.jsx(r,{language:"ts",children:`export const themeConfig = {
	...
	direction: 'rtl'
}`}),e.jsxs("div",{className:"mt-10",id:"hook",children:[e.jsx("h5",{children:"هوک"}),e.jsx("p",{className:"mt-1",children:"شما می‌توانید به سادگی از هوک آماده‌ای که ما فراهم کرده‌ایم، جهت را در یک کامپوننت به دست آورید یا به‌روز رسانی کنید."}),e.jsx(r,{language:"tsx",children:`import React from 'react'
import Switcher from '@/components/ui/Switcher'
import useDarkMode from '@/utils/hooks/useDarkMode'

const ModeSwitcher = () => {

    const [isDark, setIsDark] = useDarkMode()

    const onSwitchChange = (checked: boolean) => {
        setIsDark(checked ? 'dark' : 'light')
    }

    return (
        <div>
            <Switcher 
                value={isDark}
                onChange={checked => onSwitchChange(checked)}
            />
        </div>
    )
}

export default ModeSwitcher`})]})]});export{s as default};
