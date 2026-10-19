import{j as t}from"./index-GhWJIKHN.js";import{D as o}from"./DemoComponentApi-3Oh6jA0W.js";import{D as e}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>t.jsx(r,{language:"js",children:`import useAuthority from '@/utils/hooks/useAuthority'

const Component = () => {

	const { userAuthority = [], authority = [], children } = props

	const userAuthority = ['USER']

	const authority = ['ADMIN', 'USER']

	const roleMatched = useAuthority(userAuthority, authority)

	return (...)
}
`}),p="UseAuthorityDoc",m={title:"استفاده از useAuthority",desc:"هوک useAuthority به بررسی این کمک می‌کند که آیا کاربر فعلی دسترسی به منابع را دارد یا خیر."},s=[{mdName:"Example",mdPath:p,title:"مثال",desc:"",component:t.jsx(i,{})}],u=[{component:"استفاده از useAuthority",api:[{propName:"userAuthority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌های کاربر"},{propName:"authority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌هایی که دسترسی به آنها مجاز است"}]}],a=t.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"roleMatched",type:"<code>boolean</code>",default:"-",desc:"Result of authority match"}]}]}),C=()=>t.jsx(e,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:m,demos:s,api:u,mdPrefixPath:"utils",extra:a,keyText:"پارامتر"});export{C as default};
