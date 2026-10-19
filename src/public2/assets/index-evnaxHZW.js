import{j as t}from"./index-GhWJIKHN.js";import{D as e}from"./DemoComponentApi-3Oh6jA0W.js";import{D as s}from"./DemoLayout-NwMAG6Lk.js";import{S as o}from"./SyntaxHighlighter-vEs4QLZU.js";import"./index-CafsBiJy.js";import"./index.esm-LgaHOLu1.js";import"./index-LFSVRvyg.js";import"./AdaptableCard-0C_TNtBi.js";import"./Card-rvqadGee.js";import"./Views-weHQMgYO.js";import"./Affix-GzX8PPvS.js";import"./Button-MEjetmLX.js";import"./context-B-0mhtqE.js";import"./Tooltip-DCC1txXC.js";import"./index.esm-WVGoY09j.js";import"./floating-ui.react-FGem6XuV.js";import"./index-DqeyXXJF.js";import"./index.esm-SFQu0Skr.js";import"./index-bhOxjOrn.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const r=()=>t.jsx(o,{language:"js",children:`import useAuth from '@/utils/hooks/useAuth'

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
