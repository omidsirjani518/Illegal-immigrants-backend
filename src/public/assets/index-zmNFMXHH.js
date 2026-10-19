import{j as e}from"./index-Uer-29bb.js";import{D as o}from"./DemoComponentApi-8NssV0R-.js";import{D as t}from"./DemoLayout-86diP7Me.js";import{S as r}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const p=()=>e.jsx(r,{language:"js",children:`import deepParseJson from '@/utils/deepParseJson'

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
