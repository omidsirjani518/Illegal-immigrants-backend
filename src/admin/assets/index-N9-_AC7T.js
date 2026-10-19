import{j as t}from"./index-xmcPujHc.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import{D as e}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>t.jsx(r,{language:"js",children:`import useAuthority from '@/utils/hooks/useAuthority'

const Component = () => {

	const { userAuthority = [], authority = [], children } = props

	const userAuthority = ['USER']

	const authority = ['ADMIN', 'USER']

	const roleMatched = useAuthority(userAuthority, authority)

	return (...)
}
`}),p="UseAuthorityDoc",m={title:"استفاده از useAuthority",desc:"هوک useAuthority به بررسی این کمک می‌کند که آیا کاربر فعلی دسترسی به منابع را دارد یا خیر."},s=[{mdName:"Example",mdPath:p,title:"مثال",desc:"",component:t.jsx(i,{})}],u=[{component:"استفاده از useAuthority",api:[{propName:"userAuthority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌های کاربر"},{propName:"authority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌هایی که دسترسی به آنها مجاز است"}]}],a=t.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"roleMatched",type:"<code>boolean</code>",default:"-",desc:"Result of authority match"}]}]}),C=()=>t.jsx(e,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:m,demos:s,api:u,mdPrefixPath:"utils",extra:a,keyText:"پارامتر"});export{C as default};
