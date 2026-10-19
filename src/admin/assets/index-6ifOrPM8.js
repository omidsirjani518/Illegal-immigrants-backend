import{j as e}from"./index-xmcPujHc.js";import{D as t}from"./DemoComponentApi-2i8ZnWT-.js";import{D as r}from"./DemoLayout-iaOulvEa.js";import{S as o}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>e.jsx(o,{language:"js",children:`import wildCardSearch from '@/utils/wildCardSearch'

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
