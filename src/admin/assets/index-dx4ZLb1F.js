import{j as e}from"./index-xmcPujHc.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import{D as t}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import useTwColorByName from '@/utils/hooks/useTwColorByName'

const Component = () => {

    const generateTwColor = useTwColorByName('bg')

	return (
        <div className={generateTwColor('John')}>...
    )
}
`}),i="UseTwColorByNameDoc",p={title:"استفاده از useTwColorByName",desc:"هوک useTwColorByName یک تولید کننده کلاس رنگ های تیلویند تصادفی بر اساس رشته ورودی فراهم می کند."},a=[{mdName:"Example",mdPath:i,title:"مثال (Example)",desc:"",component:e.jsx(m,{})}],s=[{component:"استفاده از useTwColorByName",api:[{propName:"prefix",type:"<code>string</code>",default:"<code>'bg'</code>",desc:"پیشوند برای کلاس‌های رنگ تیلویند"}]}],n=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"generateTwColor",type:"<code>(name: string) => string</code>",default:"-",desc:"تولید یک کلاس رنگ تیلویند بر اساس پارامتر ورودی در hook و generateTwColor"}]}]}),F=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:a,api:s,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{F as default};
