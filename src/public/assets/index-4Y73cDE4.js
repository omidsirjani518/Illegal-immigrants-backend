import{j as e}from"./index-Uer-29bb.js";import{D as t}from"./DemoComponentApi-8NssV0R-.js";import{D as o}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(r,{language:"js",children:`import useDirection from '@/utils/hooks/useDirection'

const Component = () => {

	const [direction, updateDirection] = useDirection()

	const handleDirChange = () => {
		updateDirection('rtl')
	}

	return (...)
}
`}),m="UseDirectionDoc/",p={title:"استفاده از useDirection",desc:"این هوک به مدیریت وضعیت جهت اپلیکیشن کمک می‌کند."},n=[{mdName:"Example",mdPath:m,title:"مثال (Example)",desc:"",component:e.jsx(i,{})}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"direction",type:"<code>'ltr'</code> | <code>'rtl'</code>",default:"-",desc:"وضعیت جاری جهت"},{propName:"updateDirection",type:"<code>(direction: 'ltr' | 'rtl') => void</code>",default:"-",desc:"تنظیم‌کننده جهت"}]}]}),H=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:n,mdPrefixPath:"docs/SharedComponentsDoc/components",extra:c,keyText:"پارامتر"});export{H as default};
