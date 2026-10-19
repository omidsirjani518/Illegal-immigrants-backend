import{j as e}from"./index-GhWJIKHN.js";import{D as t}from"./DemoComponentApi-3Oh6jA0W.js";import{D as o}from"./DemoLayout-NwMAG6Lk.js";import{S as i}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>e.jsx(i,{language:"js",children:`import useMenuActive from '@/utils/hooks/useMenuActive'
import navigationConfig from '@/configs/navigation.config'
import { useSelector } from 'react-redux'

const Component = () => {

    const currentRouteKey = useSelector(state => state.base.common.currentRouteKey)

	const { activedRoute, includedRouteTree } = useMenuActive(navigationConfig, routeKey)

	return (...)
}
`}),n="UseMenuActiveDoc",a={title:"استفاده از useMenuActive",desc:"استفاده از useMenuActive به دریافت متاهای مرتبط با مسیر فعلی کمک می‌کند."},m=[{mdName:"Example",mdPath:n,title:"مثال (Example)",desc:"",component:e.jsx(r,{})}],p=[{component:"useMenuActive",api:[{propName:"navTree",type:"<code>NavConfigMeta[]</code>",default:"-",desc:"درخت پیکربندی ناوبری"},{propName:"key",type:"<code>string</code>",default:"-",desc:"کلید مسیر فعلی"}]}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"activedRoute",type:"<code>NavConfigMeta</code>",default:"-",desc:"NavConfigMeta that paired with current route key"},{propName:"includedRouteTree",type:"<code>NavConfigMeta</code>",default:"-",desc:"Root NavConfigMeta tree that included current route key"}]}]}),K=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:a,demos:m,api:p,mdPrefixPath:"utils",extra:c,keyText:"پارامتر"});export{K as default};
