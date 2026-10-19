import{j as e}from"./index-Uer-29bb.js";import{D as o}from"./DemoComponentApi-8NssV0R-.js";import{D as t}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDarkMode from '@/utils/hooks/useDarkMode'

const Component = () => {

	const [isDark, setIsDark] = useDarkMode()

	const handleSetDarkMode = (bool) => {
		setIsDark(bool ? 'dark' : 'light')
	}
	return (...)
}
`}),m="UseDarkModeDoc",s={title:"استفاده از useDarkMode",desc:"این هوک به مدیریت حالت تاریک یا روشن برنامه کمک می‌کند."},a=[{mdName:"Example",mdPath:m,title:"مثال",desc:"",component:e.jsx(i,{})}],p=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"isDark",type:"<code>boolean</code>",default:"-",desc:"آیا حالت فعلی تاریک است یا خیر"},{propName:"setIsDark",type:"<code>(mode: 'dark' | 'light') => void</code>",default:"-",desc:"تنظیم‌کننده حالت"}]}]}),S=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:s,demos:a,mdPrefixPath:"utils",extra:p,keyText:"پارامتر"});export{S as default};
