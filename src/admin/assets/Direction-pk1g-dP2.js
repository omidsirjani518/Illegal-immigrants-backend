import{j as t}from"./index-xmcPujHc.js";import{S as e}from"./SyntaxHighlighter-GM-iHFRn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const c=()=>t.jsxs(t.Fragment,{children:[t.jsxs("p",{children:["برای شروع حالت تاریک یا روشن به برنامه، به سادگی مقدار ",t.jsx("code",{children:"mode"})," را به",t.jsx("code",{children:"'light'"})," یا ",t.jsx("code",{children:"'dark'"})," در"," ",t.jsx("code",{children:"src/configs/theme.config.ts"})," تنظیم کنید. به عنوان مثال:"]}),t.jsx(e,{language:"ts",children:`export const themeConfig = {
    ...
    mode: 'dark'
}`}),t.jsxs("div",{className:"mt-10",id:"hook",children:[t.jsx("h5",{children:"هوک"}),t.jsx("p",{className:"mt-1",children:"می‌توانید از هوک آماده‌ای که فراهم کرده‌ایم، در یک کامپوننت استفاده کنید تا به حالت دارک یا لایت دسترسی داشته باشید یا آن را به‌روز رسانی کنید."}),t.jsx(e,{language:"tsx",children:`import React from 'react'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import useDirection from '@/utils/hooks/useDirection'
import type { Direction } from '@/@types/theme';

const dirList = [
	{ value: 'ltr', label: 'LTR' },
	{ value: 'rtl', label: 'RTL' }
]

const DirectionSwitcher = () => {

	const [direction, updateDirection] = useDirection()

	const onDirChange = (val: Direction) => {
		updateDirection(val)
	}

	return (
		<InputGroup size="sm">
			{
				dirList.map(dir => (
					<Button 
						key={dir.value}
						active={direction === dir.value}
						onClick={() => onDirChange(dir.value)}
					>
						{dir.label}
					</Button>
				))
			}
		</InputGroup>
	)
}

export default DirectionSwitcher
`})]})]});export{c as default};
