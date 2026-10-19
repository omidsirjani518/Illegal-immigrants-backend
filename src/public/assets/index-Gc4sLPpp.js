import{j as t}from"./index-Uer-29bb.js";import{D as o}from"./DemoComponentApi-8NssV0R-.js";import{D as e}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const i=()=>t.jsx(r,{language:"js",children:`import useAuthority from '@/utils/hooks/useAuthority'

const Component = () => {

	const { userAuthority = [], authority = [], children } = props

	const userAuthority = ['USER']

	const authority = ['ADMIN', 'USER']

	const roleMatched = useAuthority(userAuthority, authority)

	return (...)
}
`}),p="UseAuthorityDoc",m={title:"استفاده از useAuthority",desc:"هوک useAuthority به بررسی این کمک می‌کند که آیا کاربر فعلی دسترسی به منابع را دارد یا خیر."},s=[{mdName:"Example",mdPath:p,title:"مثال",desc:"",component:t.jsx(i,{})}],u=[{component:"استفاده از useAuthority",api:[{propName:"userAuthority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌های کاربر"},{propName:"authority",type:"<code>Array</code>",default:"<code>[]</code>",desc:"لیست نقش‌هایی که دسترسی به آنها مجاز است"}]}],a=t.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"roleMatched",type:"<code>boolean</code>",default:"-",desc:"Result of authority match"}]}]}),C=()=>t.jsx(e,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:m,demos:s,api:u,mdPrefixPath:"utils",extra:a,keyText:"پارامتر"});export{C as default};
