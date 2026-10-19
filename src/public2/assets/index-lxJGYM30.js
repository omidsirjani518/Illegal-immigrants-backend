import{j as e}from"./index-GhWJIKHN.js";import{D as o}from"./DemoComponentApi-3Oh6jA0W.js";import{D as t}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import sortBy from '@/utils/sortBy'

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
