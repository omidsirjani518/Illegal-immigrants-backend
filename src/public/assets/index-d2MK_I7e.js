import{j as e}from"./index-Uer-29bb.js";import{D as o}from"./DemoComponentApi-8NssV0R-.js";import{D as t}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import useTwColorByName from '@/utils/hooks/useTwColorByName'

const Component = () => {

    const generateTwColor = useTwColorByName('bg')

	return (
        <div className={generateTwColor('John')}>...
    )
}
`}),i="UseTwColorByNameDoc",p={title:"استفاده از useTwColorByName",desc:"هوک useTwColorByName یک تولید کننده کلاس رنگ های تیلویند تصادفی بر اساس رشته ورودی فراهم می کند."},a=[{mdName:"Example",mdPath:i,title:"مثال (Example)",desc:"",component:e.jsx(m,{})}],s=[{component:"استفاده از useTwColorByName",api:[{propName:"prefix",type:"<code>string</code>",default:"<code>'bg'</code>",desc:"پیشوند برای کلاس‌های رنگ تیلویند"}]}],n=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"generateTwColor",type:"<code>(name: string) => string</code>",default:"-",desc:"تولید یک کلاس رنگ تیلویند بر اساس پارامتر ورودی در hook و generateTwColor"}]}]}),F=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:a,api:s,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{F as default};
