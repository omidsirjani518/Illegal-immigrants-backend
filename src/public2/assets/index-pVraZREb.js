import{j as e}from"./index-GhWJIKHN.js";import{D as t}from"./DemoComponentApi-3Oh6jA0W.js";import{D as i}from"./DemoLayout-NwMAG6Lk.js";import{S as o}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const a=()=>e.jsx(o,{language:"js",children:`import { useState } from 'react'       
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
