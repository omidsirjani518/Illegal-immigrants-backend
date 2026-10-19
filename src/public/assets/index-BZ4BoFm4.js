import{j as e}from"./index-Uer-29bb.js";import{D as t}from"./DemoComponentApi-8NssV0R-.js";import{D as o}from"./DemoLayout-86diP7Me.js";import{S as i}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>e.jsx(i,{language:"js",children:`import useMenuActive from '@/utils/hooks/useMenuActive'
import navigationConfig from '@/configs/navigation.config'
import { useSelector } from 'react-redux'

const Component = () => {

    const currentRouteKey = useSelector(state => state.base.common.currentRouteKey)

	const { activedRoute, includedRouteTree } = useMenuActive(navigationConfig, routeKey)

	return (...)
}
`}),n="UseMenuActiveDoc",a={title:"استفاده از useMenuActive",desc:"استفاده از useMenuActive به دریافت متاهای مرتبط با مسیر فعلی کمک می‌کند."},m=[{mdName:"Example",mdPath:n,title:"مثال (Example)",desc:"",component:e.jsx(r,{})}],p=[{component:"useMenuActive",api:[{propName:"navTree",type:"<code>NavConfigMeta[]</code>",default:"-",desc:"درخت پیکربندی ناوبری"},{propName:"key",type:"<code>string</code>",default:"-",desc:"کلید مسیر فعلی"}]}],c=e.jsx(t,{hideApiTitle:!0,keyText:"برگشت",api:[{api:[{propName:"activedRoute",type:"<code>NavConfigMeta</code>",default:"-",desc:"NavConfigMeta that paired with current route key"},{propName:"includedRouteTree",type:"<code>NavConfigMeta</code>",default:"-",desc:"Root NavConfigMeta tree that included current route key"}]}]}),K=()=>e.jsx(o,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:a,demos:m,api:p,mdPrefixPath:"utils",extra:c,keyText:"پارامتر"});export{K as default};
