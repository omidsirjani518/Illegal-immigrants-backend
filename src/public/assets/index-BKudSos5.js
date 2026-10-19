import{j as t}from"./index-Uer-29bb.js";import{D as e}from"./DemoComponentApi-8NssV0R-.js";import{D as s}from"./DemoLayout-86diP7Me.js";import{S as o}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./index-dZ1KmUaM.js";import"./index.esm-LXWA-BBL.js";import"./index-lo4msI53.js";import"./AdaptableCard-4T2j_QU6.js";import"./Card-ebeNq5I1.js";import"./Views-HtHHvTLB.js";import"./Affix-JyMmltdc.js";import"./Button-K_gAmuva.js";import"./context-P0j6XaZQ.js";import"./Tooltip-JTZLLM5w.js";import"./index.esm-eBmQQY4j.js";import"./floating-ui.react-KcNqS1V0.js";import"./index-1ofq2oZn.js";import"./index.esm-yKS4K75H.js";import"./index-A7LIOYtp.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>t.jsx(o,{language:"js",children:`import useAuth from '@/utils/hooks/useAuth'

const Component = () => {

	const { authenticated, signIn, signOut } = useAuth()

	const handleSignIn = async ({ username, password }) => {
	
		const result = await signIn({ username, password })

		if (result.status === 'failed') {
			setMessage(result.message)
		}
	}

	const handleSignout = () => {
		signOut()
	}

	return (...)
}
`}),i="UseAuthDoc/",a={title:"استفاده از useAuth",desc:"یک هوک که به هر کامپوننت اجازه می‌دهد وضعیت فعلی احراز هویت را دریافت کند."},m=[{mdName:"Example",mdPath:i,title:"مثال (Example)",desc:"",component:t.jsx(r,{})}],n=t.jsx(e,{hideApiTitle:!0,keyText:"بازگشت",api:[{api:[{propName:"authenticated",type:"<code>boolean</code>",default:"-",desc:"وضعیت فعلی احراز هویت"},{propName:"signIn",type:"<code>({username: string, password: string}) => ({status: 'success' | 'failed', message: string})</code>",default:"-",desc:"دستگیره ورود، وضعیت و پیام را به عنوان نتیجه باز می‌گرداند"},{propName:"signOut",type:"<code>() => void</code>",default:"-",desc:"دستگیره خروج"}]}]}),P=()=>t.jsx(s,{hideApiTitle:!0,hideFooter:!0,innerFrame:!1,header:a,demos:m,mdPrefixPath:"utils",extra:n,keyText:"پارامتر"});export{P as default};
