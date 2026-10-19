import{j as e}from"./index-Uer-29bb.js";import{S as s}from"./SyntaxHighlighter-Jft-s7Gq.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const a=()=>e.jsxs(e.Fragment,{children:[e.jsx("p",{children:'یک API مجازی یا "mock" یک API است که به داده و پاسخ مانند یک API واقعی پاسخ می‌دهد، اما تنها داده و پاسخ را تقلید می‌کند. این در موارد مختلف بسیار مفید است، مانند زمانی که API اصلی که به آن وابسته‌اید هنوز به طور کامل توسعه یافته نشده است یا برای شبیه‌سازی فراخوانی‌های API در آزمون‌های واحد.'}),e.jsxs("p",{children:["Elstar از"," ",e.jsx("a",{href:"https://miragejs.com/",target:"_blank",rel:"noreferrer",children:"miragejs"})," ","برای تقلید فراخوانی‌های API استفاده می‌کند. تمام تعاملات API در دموی ما تحت miragejs انجام می‌شود."]}),e.jsxs("div",{className:"mt-10",id:"disableMockApi",children:[e.jsx("h5",{children:"غیرفعال کردن mock api"}),e.jsxs("p",{className:"mt-1",children:["ما در ",e.jsx("strong",{children:"starter-kit"})," خود mock API را به صورت پیش‌فرض فعال کرده‌ایم. شما می‌توانید آن را با تنظیم فیلد ",e.jsx("code",{children:"enableMock"})," به مقدار false در ",e.jsx("code",{children:"src/configs/app.config.ts"})," غیرفعال کنید تا mock API را خاموش کنید."]}),e.jsx(s,{language:"ts",children:`const appConfig = {
    ...,
    enableMock: false
}`})]}),e.jsxs("div",{className:"mt-10",id:"usingMockApi",children:[e.jsx("h5",{children:"استفاده از موک API"}),e.jsx("p",{className:"mt-1",children:"اگر قصد استفاده از موک API را دارید، می‌توانید مراحل زیر را دنبال کنید تا داده‌ها و API مجازی ایجاد کنید."}),e.jsxs("ol",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"راه‌اندازی"}),e.jsxs("p",{className:"mt-1",children:["به ",e.jsx("code",{children:"src/mock/index.ts"})," بروید و اینجا پیکربندی کلی میراژ را پیدا خواهید کرد."]}),e.jsx(s,{language:"ts",children:`export default function mockServer({ environment = 'test' }) {
    return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                ...
            })
        },
        routes() {
            ...
        },
    })
}`})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"افزودن داده‌های استاتیک"}),e.jsx("p",{className:"mt-1",children:"حالا می‌توانیم چند داده به پایگاه داده مجازی اضافه کنیم."}),e.jsx(s,{language:"ts",children:`return createServer({
        environment,
        seeds(server) {
            server.db.loadData({
                usersData: [
                    {
                        id: '1',
                        name: 'نادر',
                    },
                    {
                        id: '2',
                        name: 'حسین',
                    },
                    {
                        id: '3',
                        name: 'علی',
                    },
                ]
            })
        },
        ...
    })
}`})]}),e.jsxs("li",{children:[e.jsx("p",{children:"حالا می‌توانید به این API درخواست ارسال کرده و داده‌های استاتیکی که به تازگی به عنوان پاسخ تنظیم شده را دریافت کنید."}),e.jsx(s,{language:"ts",children:`return createServer({
        ...
        routes() {
            this.get('api/getUsers', schema => schema.db.usersData)
        },
})`})]})]})]}),e.jsxs("div",{children:[e.jsx("p",{children:"و حالا می‌توانید درخواستی به این API ارسال کنید و داده‌های استاتیکی که به تازگی تنظیم شده‌اند را به عنوان پاسخ دریافت کنید."}),e.jsx(s,{language:"ts",children:`// service
import ApiService from "./ApiService"

type GetUserResponse = {
    id: string
    name: string
    email: string
}[]

export async function apiGetUsers () {
    return ApiService.fetchData<GetUserResponse>({
        url: '/api/getUsers',
        method: 'get'
    })
}`}),e.jsx(s,{language:"ts",children:`// component
import { useEffect } from 'react'
import { apiGetUsers } from './YourService.ts'

const YourComponent = () => {

    const fetchData = async () => {
        try {
            const resp = await apiGetUsers()
            console.log(resp.data)
        } catch (errors) {
            ...handle errors
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        ...
    )
}`})]})]});export{a as default};
