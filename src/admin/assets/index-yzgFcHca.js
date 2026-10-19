import{j as e}from"./index-xmcPujHc.js";import{D as t}from"./DemoComponentApi-2i8ZnWT-.js";import{D as i}from"./DemoLayout-iaOulvEa.js";import{S as o}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const a=()=>e.jsx(o,{language:"js",children:`import { useState } from 'react'       
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
