import{j as e}from"./index-GhWJIKHN.js";import{D as o}from"./DemoComponentApi-3Oh6jA0W.js";import{D as t}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const m=()=>e.jsx(r,{language:"js",children:`import useTwColorByName from '@/utils/hooks/useTwColorByName'

const Component = () => {

    const generateTwColor = useTwColorByName('bg')

	return (
        <div className={generateTwColor('John')}>...
    )
}
`}),i="UseTwColorByNameDoc",p={title:"استفاده از useTwColorByName",desc:"هوک useTwColorByName یک تولید کننده کلاس رنگ های تیلویند تصادفی بر اساس رشته ورودی فراهم می کند."},a=[{mdName:"Example",mdPath:i,title:"مثال (Example)",desc:"",component:e.jsx(m,{})}],s=[{component:"استفاده از useTwColorByName",api:[{propName:"prefix",type:"<code>string</code>",default:"<code>'bg'</code>",desc:"پیشوند برای کلاس‌های رنگ تیلویند"}]}],n=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"generateTwColor",type:"<code>(name: string) => string</code>",default:"-",desc:"تولید یک کلاس رنگ تیلویند بر اساس پارامتر ورودی در hook و generateTwColor"}]}]}),F=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:a,api:s,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{F as default};
