import{j as e}from"./index-xmcPujHc.js";import{D as t}from"./DemoComponentApi-2i8ZnWT-.js";import{D as o}from"./DemoLayout-iaOulvEa.js";import{S as i}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>e.jsx(i,{language:"js",children:`import useMenuActive from '@/utils/hooks/useMenuActive'
import navigationConfig from '@/configs/navigation.config'
import { useSelector } from 'react-redux'

const Component = () => {

    const currentRouteKey = useSelector(state => state.base.common.currentRouteKey)

	const { activedRoute, includedRouteTree } = useMenuActive(navigationConfig, routeKey)

	return (...)
}
`}),n="UseMenuActiveDoc",a={title:"استفاده از useMenuActive",desc:"استفاده از useMenuActive به دریافت متاهای مرتبط با مسیر فعلی کمک می‌کند."},m=[{mdName:"Example",mdPath:n,title:"مثال (Example)",desc:"",component:e.jsx(r,{})}],p=[{component:"useMenuActive",api:[{propName:"navTree",type:"<code>NavConfigMeta[]</code>",default:"-",desc:"درخت پیکربندی ناوبری"},{propName:"key",type:"<code>string</code>",default:"-",desc:"کلید مسیر فعلی"}]}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"activedRoute",type:"<code>NavConfigMeta</code>",default:"-",desc:"NavConfigMeta that paired with current route key"},{propName:"includedRouteTree",type:"<code>NavConfigMeta</code>",default:"-",desc:"Root NavConfigMeta tree that included current route key"}]}]}),K=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:a,demos:m,api:p,mdPrefixPath:"utils",extra:c,keyText:"پارامتر"});export{K as default};
