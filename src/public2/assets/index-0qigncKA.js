import{j as e}from"./index-GhWJIKHN.js";import{D as o}from"./DemoComponentApi-3Oh6jA0W.js";import{D as t}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDarkMode from '@/utils/hooks/useDarkMode'

const Component = () => {

	const [isDark, setIsDark] = useDarkMode()

	const handleSetDarkMode = (bool) => {
		setIsDark(bool ? 'dark' : 'light')
	}
	return (...)
}
`}),m="UseDarkModeDoc",s={title:"استفاده از useDarkMode",desc:"این هوک به مدیریت حالت تاریک یا روشن برنامه کمک می‌کند."},a=[{mdName:"Example",mdPath:m,title:"مثال",desc:"",component:e.jsx(i,{})}],p=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"isDark",type:"<code>boolean</code>",default:"-",desc:"آیا حالت فعلی تاریک است یا خیر"},{propName:"setIsDark",type:"<code>(mode: 'dark' | 'light') => void</code>",default:"-",desc:"تنظیم‌کننده حالت"}]}]}),S=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:s,demos:a,mdPrefixPath:"utils",extra:p,keyText:"پارامتر"});export{S as default};
