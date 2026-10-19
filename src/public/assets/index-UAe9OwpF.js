import{j as e}from"./index-Uer-29bb.js";import{D as t}from"./DemoComponentApi-8NssV0R-.js";import{D as i}from"./DemoLayout-86diP7Me.js";import{S as o}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const a=()=>e.jsx(o,{language:"js",children:`import { useState } from 'react'       
import requiredFieldValidation from '@/utils/requiredFieldValidation'

const Component = () => {

    const [ inputValue, setInputValue ] = useState('')
    const [ displayMessage, setDisplayMessage ] = useState(false)

    return (
        <>
            <input value={inputValue} onChange={e => {
                setInputValue(e.target.value)
                setDisplayMessage(true)
            }} />
            {displayMessage && requiredFieldValidation(inputValue, 'Required field!')}
        </>
    )
}
`}),r="RequiredFieldValidationDoc/",p={title:"requiredFieldValidation",desc:"این تابع برای نمایش پیامی استفاده می‌شود اگر مقدار ورودی اشتباه باشد (falsy)."},s=[{mdName:"Example",mdPath:r,title:"مثال (Example)",desc:"",component:e.jsx(a,{})}],d=[{component:"requiredFieldValidation",api:[{propName:"value",type:"<code>string</code>",default:"-",desc:"مقدار فیلد"},{propName:"message",type:"<code>string</code>",default:"-",desc:"پیام بازخورد"}]}],m=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"validationMessage",type:"<code>string</code>",default:"<code>'الزامی است'</code>",desc:"پیام بازخورد"}]}]}),R=()=>e.jsx(i,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:p,demos:s,api:d,mdPrefixPath:"docs/SharedComponentsDoc/components",extra:m,keyText:"پارامتر"});export{R as default};
