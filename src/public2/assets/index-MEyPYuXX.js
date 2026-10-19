import{j as e}from"./index-GhWJIKHN.js";import{D as t}from"./DemoComponentApi-3Oh6jA0W.js";import{D as r}from"./DemoLayout-NwMAG6Lk.js";import{S as o}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(o,{language:"js",children:`import wildCardSearch from '@/utils/wildCardSearch'

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
