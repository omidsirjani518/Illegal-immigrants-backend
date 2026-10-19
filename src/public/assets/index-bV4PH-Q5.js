import{j as e}from"./index-Uer-29bb.js";import{D as t}from"./DemoComponentApi-8NssV0R-.js";import{D as r}from"./DemoLayout-86diP7Me.js";import{S as o}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(o,{language:"js",children:`import wildCardSearch from '@/utils/wildCardSearch'

const arr = [
	{
		name: 'نادر',
		email: 'eileen_h@hotmail.com',
	},
	{
		name: 'حسین',
		email: 'terrance_moreno@infotech.io',
	},
	{
		name: 'علی',
		email: 'ronnie_vergas@infotech.io',
	},
	{
		name: 'سعید',
		email: 'cookie_lukie@hotmail.com',
	},
]

const data = wildCardSearch(arr, 'Terran')

// output: [
//  {
// 		name: 'حسین',
// 		email: 'terrance_moreno@infotech.io',
// 	},
// ]
`}),a="WildCardSearchDoc",m={title:"wildCardSearch",desc:"جستجوی وایلدکارد برای آرایه از اشیاء."},p=[{mdName:"Example",mdPath:a,title:"مثال (Example)",desc:"",component:e.jsx(i,{})}],d=[{component:"wildCardSearch",api:[{propName:"list",type:"<code>Array&lt;T&gt;</code>",default:"-",desc:"آرایه از اشیاء"},{propName:"input",type:"<code>string</code>",default:"-",desc:"کلمه کلیدی"}]}],n=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"result",type:"<code>Array&lt;T&gt;</code>",default:"-",desc:"آرایه نتیجه"}]}]}),F=()=>e.jsx(r,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:m,demos:p,api:d,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{F as default};
