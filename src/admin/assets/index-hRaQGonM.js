import{j as e}from"./index-xmcPujHc.js";import{D as t}from"./DemoComponentApi-2i8ZnWT-.js";import{D as o}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDirection from '@/utils/hooks/useDirection'

const Component = () => {

	const [direction, updateDirection] = useDirection()

	const handleDirChange = () => {
		updateDirection('rtl')
	}

	return (...)
}
`}),m="UseDirectionDoc/",p={title:"استفاده از useDirection",desc:"این هوک به مدیریت وضعیت جهت اپلیکیشن کمک می‌کند."},n=[{mdName:"Example",mdPath:m,title:"مثال (Example)",desc:"",component:e.jsx(i,{})}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"direction",type:"<code>'ltr'</code> | <code>'rtl'</code>",default:"-",desc:"وضعیت جاری جهت"},{propName:"updateDirection",type:"<code>(direction: 'ltr' | 'rtl') => void</code>",default:"-",desc:"تنظیم‌کننده جهت"}]}]}),H=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:n,mdPrefixPath:"docs/SharedComponentsDoc/components",extra:c,keyText:"پارامتر"});export{H as default};
