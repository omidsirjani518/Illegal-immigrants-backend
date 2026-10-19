import{j as t}from"./index-xmcPujHc.js";import{D as e}from"./DemoComponentApi-2i8ZnWT-.js";import{D as s}from"./DemoLayout-iaOulvEa.js";import{S as o}from"./SyntaxHighlighter-GM-iHFRn.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";import"./AdaptableCard-_Y4_f6Db.js";import"./Card-bEucX4SI.js";import"./Views-3m40n2lX.js";import"./Affix-bcizdY80.js";import"./Button-gredw9Z7.js";import"./context-d3ybrv1J.js";import"./Tooltip-wBK3NCW3.js";import"./index.esm-X5aLxq3t.js";import"./floating-ui.react-IpsuGh29.js";import"./index-at3eBfrq.js";import"./index.esm-0mA7_RD2.js";import"./index-ZPSiyMe1.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>t.jsx(o,{language:"js",children:`import useAuth from '@/utils/hooks/useAuth'

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
