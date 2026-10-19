import{j as e}from"./index-xmcPujHc.js";import{S as r}from"./SyntaxHighlighter-GM-iHFRn.js";import{D as a}from"./DemoComponentApi-2i8ZnWT-.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./index-GRHMimTL.js";import"./index.esm-3DO3Lsm4.js";import"./index-tFtkjalk.js";function n(s,t){return Array.from({length:t-s+1},(o,i)=>s+i)}const f=()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"Elstar یک پیاده‌سازی برای احراز هویت JWT فراهم کرده است که به شما این امکان را می‌دهد که به سریع خدمات backend خود را متصل کنید."}),e.jsxs("p",{children:["ما از ",e.jsx("code",{children:"localStorage"})," و Redux برای ذخیره اطلاعات احراز هویت استفاده می‌کنیم. همانطور که در راهنمای ",e.jsx("strong",{children:"Redux"})," خود اشاره کردیم، از ",e.jsx("a",{href:"https://github.com/rt2zz/redux-persist",target:"_blank",rel:"noreferrer",children:"redux-persist"})," برای هماهنگ‌سازی ",e.jsx("code",{children:"localStorage"})," با برخی از وضعیت‌های Redux خود استفاده می‌کنیم."]}),e.jsxs("div",{className:"mt-10",id:"useAuth",children:[e.jsx("h5",{children:"هوک useAuth"}),e.jsxs("p",{children:["ما یک هوک ایجاد کرده‌ایم که تمام متدهای لازم برای احراز هویت کاربر را مانند ",e.jsx("strong",{children:"signIn"}),"، ",e.jsx("strong",{children:"signOut"}),"، ",e.jsx("strong",{children:"signUp"})," و غیره برمی‌گرداند."]})]}),e.jsx(a,{hideApiTitle:!0,keyText:"properties",api:[{api:[{propName:"authenticated",type:"<code>boolean</code>",default:"-",desc:"یک وضعیت که تعریف می‌کند کاربر آیا احراز هویت شده است؛ وقتی که وضعیت توکن مقدار دارد و وضعیت signedIn در Redux صحیح باشد، این مقدار true خواهد بود."},{propName:"signIn",type:"<code>(values: {username: string, password: string}) => Promise<{status: 'success' | 'failed', message: string}></code>",default:"-",desc:"تابع برای ورود کاربر."},{propName:"signUp",type:"<code>(values: {username: string, email: string, password: string}) => Promise<{status: 'success' | 'failed', message: string}></code>",default:"-",desc:"تابع برای ثبت‌نام کاربر."},{propName:"signOut",type:"<code>() => void</code>",default:"-",desc:"تابع برای خروج کاربر."}]}]}),e.jsx("p",{children:"بیایید به منطق signIn در useAuth نگاهی بیندازیم"}),e.jsx(r,{language:"ts",children:`import { apiSignIn, apiSignOut } from '@/services/AuthService'
...
const signIn = async (values: SignInCredential) => {
    try {
        // fetching the signIn api from AuthService
        const resp = await apiSignIn(values)
        if (resp.data) {
            // Assuming your api response return a token,
            const { token } = resp.data
            
            // Dispatch signInSuccess with token, 
            // it will set to the token state & change signedIn state to true in redux
            dispatch(signInSuccess(token))

            // You can also set the user info to redux here as well, 
            // if it comes along with your sign in api
            if(resp.data.user) {
                dispatch(setUser(resp.data.user || { 
                    avatar: '', 
                    username: 'Anonymous', 
                    authority: ['USER'], 
                    email: ''
                }))
            }

            const redirectUrl = query.get(REDIRECT_URL_KEY)
            navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
            return {
                status: 'success',
                message: ''
            }
        }
    } catch (errors) {
        return {
            status: 'failed',
            message: errors?.response?.data?.message || errors.toString()
        }
    }
}`}),e.jsxs("div",{className:"mt-10",id:"useAuth",children:[e.jsx("h5",{children:"AuthService"}),e.jsxs("p",{children:["همچنین یک سری سرویس‌های پیش‌فرض برای احراز هویت در",e.jsx("code",{children:"src/services/AuthService.ts"}),"ایجاد کرده‌ایم، هر متد سرویس به متدهای متناظر",e.jsx("code",{children:"useAuth"}),"کار می‌کند."]}),e.jsx(r,{language:"ts",children:`import ApiService from './ApiService';
import type {
    SignInCredential,
    SignUpCredential,
    ForgotPassword,
    ResetPassword,
    SignInResponse,
    SignUpResponse,
} from '@/@types/auth';

export async function apiSignIn(data: SignInCredential) {
    return ApiService.fetchData<SignInResponse>({
        url: '/sign-in',
        method: 'post',
        data,
    });
}

export async function apiSignUp(data: SignUpCredential) {
    return ApiService.fetchData<SignUpResponse>({
        url: '/sign-up',
        method: 'post',
        data,
    });
}

export async function apiSignOut() {
    return ApiService.fetchData({
        url: '/sign-out',
        method: 'post',
    });
}

...`})]}),e.jsxs("p",{children:["در ادامه، یک مثال برای پیاده‌سازی ورود با استفاده از هوک",e.jsx("code",{children:"useAuth"}),"آورده شده است:"]}),e.jsx(r,{language:"ts",children:`import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';
import { FormItem, FormContainer } from '@/components/ui/Form';
import Alert from '@/components/ui/Alert';
import PasswordInput from '@/components/shared/PasswordInput';
import ActionLink from '@/components/shared/ActionLink';
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage';
import useAuth from '@/utils/hooks/useAuth';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

type SignInFormSchema = {
    username: string;
    password: string;
};

const SignInForm = () => {

    const [message, setMessage] = useTimeOutMessage()

    const { signIn } = useAuth()

    const onSignIn = async (
        values: SignInFormSchema,
        setSubmitting: (isSubmitting: boolean) => void
    ) => {
        const { username, password } = values;
        setSubmitting(true);

        const result = await signIn({ username, password });

        if (result?.status === 'failed') {
            setMessage(result.message);
        }

        setSubmitting(false);
    };

    return (
        <Formik
            onSubmit={(values, { setSubmitting }) => {
                onSignIn(values, setSubmitting)
            }}
            ...
        >
        ...
    )
`}),e.jsxs("div",{className:"mt-10",id:"overview",children:[e.jsx("h5",{children:"حذف پیاده‌سازی ورود پیش‌فرض"}),e.jsx("p",{children:"اگر احساس می‌کنید که پیاده‌سازی ورود پیش‌فرض با مورد خاص شما سازگار نیست، می‌توانید کد را به شکل زیر حذف کنید:"})]}),e.jsxs("div",{className:"mt-10",id:"overview",children:[e.jsx("span",{children:"useAuth.ts"}),e.jsx(r,{language:"ts",wrapLines:!0,showLineNumbers:!0,lineProps:s=>{const t={display:"block"};return n(21,27).includes(s)?t.backgroundColor="#00ff002e":[...n(28,53),63].includes(s)&&(t.backgroundColor="#ff00001f"),{style:t}},children:`
import { setUser, initialState, signInSuccess, signOutSuccess, useAppSelector, useAppDispatch } from '@/store'
import { apiSignIn, apiSignOut } from '@/services/AuthService'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { useNavigate } from 'react-router-dom'
import useQuery from './useQuery'

function useAuth() {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const query = useQuery()

    const { signedIn } = useAppSelector((state) => state.auth.session)

    const signIn = async (values) => {
        dispatch(signInSuccess('exampleToken'))
        const redirectUrl = query.get(REDIRECT_URL_KEY)
        navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
        return {
            status: 'success',
            message: ''
        }
        try {
            const resp = await apiSignIn(values)
            if (resp.data) {
                const { token } = resp.data
                dispatch(signInSuccess(token))
                if(resp.data.user) {
                    dispatch(setUser(resp.data.user || { 
                        avatar: '', 
                        username: 'Anonymous', 
                        authority: ['USER'], 
                        email: ''
                    }))
                }
                const redirectUrl = query.get(REDIRECT_URL_KEY)
                navigate(redirectUrl ? redirectUrl : appConfig.authenticatedEntryPath)
                return {
                    status: 'success',
                    message: ''
                }
            }
        } catch (errors) {
            return {
                status: 'failed',
                message: errors?.response?.data?.message || errors.toString()
            }
        }
    }

    const handleSignOut = ()  => {
        dispatch(signOutSuccess())
        dispatch(setUser(initialState))
        navigate(appConfig.unAuthenticatedEntryPath)
    }

    const signOut = async () => {
        await apiSignOut()
        handleSignOut()
    }
    
    return {
        authenticated: signedIn,
        signIn,
        signOut
    }
}

export default useAuth`})]})]});export{f as default};
