import{j as e}from"./index-xmcPujHc.js";import{D as o}from"./DemoComponentApi-2i8ZnWT-.js";import{D as t}from"./DemoLayout-iaOulvEa.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const p=()=>e.jsx(r,{language:"js",children:`import deepParseJson from '@/utils/deepParseJson'

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
