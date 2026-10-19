import{j as e}from"./index-xmcPujHc.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import{D as t}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDarkMode from '@/utils/hooks/useDarkMode'

const Component = () => {

	const [isDark, setIsDark] = useDarkMode()

	const handleSetDarkMode = (bool) => {
		setIsDark(bool ? 'dark' : 'light')
	}
	return (...)
}
`}),m="UseDarkModeDoc",s={title:"استفاده از useDarkMode",desc:"این هوک به مدیریت حالت تاریک یا روشن برنامه کمک می‌کند."},a=[{mdName:"Example",mdPath:m,title:"مثال",desc:"",component:e.jsx(i,{})}],p=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"isDark",type:"<code>boolean</code>",default:"-",desc:"آیا حالت فعلی تاریک است یا خیر"},{propName:"setIsDark",type:"<code>(mode: 'dark' | 'light') => void</code>",default:"-",desc:"تنظیم‌کننده حالت"}]}]}),S=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:s,demos:a,mdPrefixPath:"utils",extra:p,keyText:"پارامتر"});export{S as default};
