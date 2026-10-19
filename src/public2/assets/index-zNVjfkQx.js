import{j as e}from"./index-GhWJIKHN.js";import{D as t}from"./DemoComponentApi-3Oh6jA0W.js";import{D as o}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDirection from '@/utils/hooks/useDirection'

const Component = () => {

	const [direction, updateDirection] = useDirection()

	const handleDirChange = () => {
		updateDirection('rtl')
	}

	return (...)
}
`}),m="UseDirectionDoc/",p={title:"استفاده از useDirection",desc:"این هوک به مدیریت وضعیت جهت اپلیکیشن کمک می‌کند."},n=[{mdName:"Example",mdPath:m,title:"مثال (Example)",desc:"",component:e.jsx(i,{})}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"direction",type:"<code>'ltr'</code> | <code>'rtl'</code>",default:"-",desc:"وضعیت جاری جهت"},{propName:"updateDirection",type:"<code>(direction: 'ltr' | 'rtl') => void</code>",default:"-",desc:"تنظیم‌کننده جهت"}]}]}),H=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:n,mdPrefixPath:"docs/SharedComponentsDoc/components",extra:c,keyText:"پارامتر"});export{H as default};
