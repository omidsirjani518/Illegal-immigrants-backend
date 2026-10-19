import{j as e}from"./index-xmcPujHc.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import{D as t}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import sortBy from '@/utils/sortBy'

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
