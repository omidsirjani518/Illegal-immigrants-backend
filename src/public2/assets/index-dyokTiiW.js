import{j as e}from"./index-GhWJIKHN.js";import{D as o}from"./DemoComponentApi-3Oh6jA0W.js";import{D as t}from"./DemoLayout-NwMAG6Lk.js";import{S as r}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const p=()=>e.jsx(r,{language:"js",children:`import deepParseJson from '@/utils/deepParseJson'

const parsed = deepParseJson('{"a":"{b:b, c:c},"d":"{e:{f:f}",'
)

// output: {
    a: {
        b: 'b',
        c: 'c'
    },
    d: {
        e: {
            f: 'f'
        }
    }
}
`}),s="DeepParseJsonDoc/",i={title:"deepParseJson",desc:"قابلیت deepParseJson برای تجزیه رشته JSON به شیء جاوااسکریپت، حتی در صورت تودرتو یا حاوی کاراکترهای اسکیپ شده."},m=[{mdName:"Example",mdPath:s,title:"مثال (Example)",desc:"",component:e.jsx(p,{})}],a=[{component:"deepParseJson",api:[{propName:"jsonString",type:"<code>string</code>",default:"-",desc:"رشته JSON"}]}],n=e.jsx(o,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"parsedJsonString",type:"<code>object</code>",default:"-",desc:"رشته JSON تجزیه شده"}]}]}),F=()=>e.jsx(t,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:i,demos:m,api:a,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{F as default};
