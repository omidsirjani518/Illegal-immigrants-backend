import{j as e}from"./index-Uer-29bb.js";import{D as o}from"./DemoComponentApi-8NssV0R-.js";import{D as t}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import sortBy from '@/utils/sortBy'

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

const data = arr.sort(sortBy('name', false , (a) =>  a.toUpperCase()))

// output: [
// 	{
// 		name: 'نادر',
// 		email: 'eileen_h@hotmail.com',
// 	},
// 	{
// 		name: 'سعید',
// 		email: 'cookie_lukie@hotmail.com',
// 	},
// 	{
// 		name: 'علی',
// 		email: 'ronnie_vergas@infotech.io',
// 	},
//  {
// 		name: 'حسین',
// 		email: 'terrance_moreno@infotech.io',
// 	},
// ]
`}),i="SortByDoc/",a={title:"sortBy",desc:"تابع sortBy قادر به مرتب‌سازی آرایه‌ای از شیء با استفاده از تابع مقایسه <code>array.sort</code> بر اساس یک کلید مشخص است."},p=[{mdName:"Example",mdPath:i,title:"مثال (Example)",desc:"",component:e.jsx(m,{})}],n=[{component:"sortBy",api:[{propName:"field",type:"<code>string</code>",default:"-",desc:"کلید شیء که هدف مرتب‌سازی است"},{propName:"reverse",type:"<code>boolean</code>",default:"-",desc:"ترتیب نتیجه، <code>true</code> برای نزولی، <code>false</code> برای صعودی"},{propName:"primer",type:"<code>(key: string) => (key) => void</code>",default:"-",desc:"بسته نماینده تابع برای کلید"}]}],s=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"result",type:"<code>(a, b) => boolean</code>",default:"-",desc:"تابع بازخورد نتیجه مرتب‌سازی"}]}]}),C=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:a,demos:p,api:n,mdPrefixPath:"docs/SharedComponentsDoc/components",extra:s,keyText:"پارامتر"});export{C as default};
