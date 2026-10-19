import{j as e}from"./index-GhWJIKHN.js";import{S as s}from"./SyntaxHighlighter-vEs4QLZU.js";import{A as t}from"./Alert-0gcIxGo0.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";import"./useTimeout-8b9t5FIC.js";import"./index.esm-SFQu0Skr.js";import"./CloseButton-fO-_aLjh.js";import"./StatusIcon-ICBT6HTK.js";import"./Views-weHQMgYO.js";const h=()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:"برای اجرای ارتباط با API در پشتیبانی از پیوند به API، مراحل زیر را دنبال کنید."}),e.jsxs("ol",{children:[e.jsx("li",{children:e.jsxs("p",{children:["یک فایل سرویس جدید برای ویژگی یا ماژول خود ایجاد کنید. به عنوان مثال، اگر در حال کار روی مدیریت کاربر هستید، یک فایل با نام"," ",e.jsx("code",{children:"UserManagementService.ts"})," در دایرکتوری سرویس‌ها ایجاد کنید."]})}),e.jsxs("li",{children:[e.jsxs("p",{children:["درون فایل سرویس، یک تابع ناهمزمان اعلام کنید که درخواست API را مدیریت خواهد کرد. این تابع باید از متد"," ",e.jsx("code",{children:"ApiService.fetchData"})," استفاده کند و دو نوع جنریک Response و Request به همراه"," ",e.jsx("a",{href:"https://axios-http.com/docs/req_config",target:"_blank",rel:"noreferrer",children:"پیکربندی Axios"})," ","را به عنوان پارامتر بپذیرد. توصیه می‌شود که این انواع را هنگام ایجاد سرویس جدید مشخص کنید. می‌توانید این انواع را به صورت مستقیم به متد"," ",e.jsx("code",{children:"ApiService.fetchData"})," منتقل کنید. در زیر یک مثال آورده شده است:"]}),e.jsx(s,{language:"ts",children:`type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

export async function myApi (data) {
    return ApiService.fetchData<MyApiResponse,MyApiRequest>({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`}),e.jsx("p",{children:"یا از سطح بالاتر از آن‌ها به ارث بری:"}),e.jsx(s,{language:"ts",children:`import ApiService from "./ApiService"

export async function myApi<TResponse, TRequest>(data) {
    return ApiService.fetchData<TResponse, TRequest>({
        url: '/my-api-url',
        method: 'post',
        data
    })
}
...`})]}),e.jsxs("li",{children:[e.jsx("p",{children:"و حالا می‌توانید این API را در کامپوننت خود فراخوانی کنید."}),e.jsx(s,{language:"tsx",children:`
type MyApiResponse = {
    someResponseData: string
    someResponseData2: boolean
}

type MyApiRequest = {
    someRequestData: string
}

import { myApi } from './MyService.ts'

const MyComponent = props => {

    const fetchData = async () => {
        const reqeustParam = { key: 'value'}
        try {
            const resp = await myApi<MyApiResponse, MyApiRequest>(reqeustParam)
            if (resp.data) {
                ...do something
            }
        } catch (errors) {
            ...handle errors
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
    ...
)`})]}),e.jsxs("li",{children:[e.jsxs("p",{children:["شما همچنین می‌توانید از این سرویس با ",e.jsx("code",{children:"createAsyncThunk"})," استفاده کنید."]}),e.jsx(s,{language:"ts",children:`import { createSlice } from '@reduxjs/toolkit'
import { myApi } from './MyService.ts'

type RequestParam = {
    someRequestData: string
}

export const getApiData = createAsyncThunk('sliceName/getApiData',async (data: RequestParam) => {
    const response = await myApi(data)
    return response.data
})

const mySlice = createSlice({
    ...
    extraReducers: (builder) => {
        builder
            .addCase(getApiData.fulfilled, (state, action) => {
                ...
            })
    },
})

export const { someActionFromYourSlice } = yourSlice.actions

export default yourSlice.reducer`})]})]}),e.jsxs(t,{showIcon:!0,type:"info",title:"توجه:",children:["اگر می‌خواهید به سرور توسعه خود وصل شوید، لطفاً ",e.jsx("code",{children:"enableMock"})," را در ",e.jsx("code",{children:"src/configs/app.config.ts"})," به ",e.jsx("code",{children:"false"})," تغییر دهید."]}),e.jsxs("div",{className:"mt-10",id:"proxying",children:[e.jsx("h5",{children:"پروکسی‌گذاری (Proxying)"}),e.jsx("p",{className:"mt-1",children:"توسعه‌دهندگان اغلب API را از سرورهای مختلفی نسبت به برنامه frontend مصرف می‌کنند و با ارسال درخواست‌ها در دو سمت به مشکلاتی مواجه می‌شوند، در اینجا چگونگی تنظیم یک سرور پروکسی آمده است."}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"افزودن proxy به فایل package.json"}),e.jsx("p",{className:"mt-1",children:"یک راه‌حل ساده و سریع برای پروکسی کردن یک سرور"}),e.jsx(s,{language:"ts",children:'"proxy": "http:yourDevDomain.com"'})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"راه‌اندازی دستی"}),e.jsxs("p",{className:"mt-1",children:["می‌توانید برای پیکربندی انعطاف‌پذیرتر با ",e.jsx("code",{children:"vite.config.ts"})," اقدام کنید."]}),e.jsx(s,{language:"ts",children:`export default defineConfig({
    plugins: ...,
    server: {
        proxy: {
            '/api': {
                // config the target url based on your backend server
                target: 'http:yourDevDomain.com',
                changeOrigin: true,
                secure: false,
            }
        }
    }
})`})]})]})]})]});export{h as default};
