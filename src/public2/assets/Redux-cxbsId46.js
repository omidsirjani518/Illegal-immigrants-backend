import{j as e}from"./index-GhWJIKHN.js";import{S as t}from"./SyntaxHighlighter-vEs4QLZU.js";import"./toConsumableArray-YYxflNc8.js";import"./objectWithoutPropertiesLoose-pdUxmcoj.js";const c=()=>e.jsxs(e.Fragment,{children:[e.jsxs("p",{children:[e.jsx("a",{href:"https://redux.js.org/",target:"_blank",rel:"noreferrer",children:"Redux"})," ","یک راه حل محبوب برای مدیریت وضعیت برنامه است که می‌تواند با فریمورک‌های جلویی مانند React یکپارچه شود؛ این به شما امکان می‌دهد که برنامه‌های مقیاس‌پذیر با کد پایه قابل نگهداری بنویسید. با این حال، استفاده از Redux نیازمند بسیاری از کدهای بویلرپلیت است. برای کاهش کدهای بویلرپلیت و فراهم کردن امکانات آسان‌تر،"," ",e.jsx("a",{href:"https://redux-toolkit.js.org/",target:"_blank",rel:"noreferrer",children:"Redux Toolkit (RTK)"})," ","یک گزینه بهتر است. این ابزار با Middleware داخلی Redux Thunk که برای انجام عملیات ناهمگام استفاده می‌شود و روش استانداردی برای نوشتن منطق Redux همراه است."]}),e.jsxs("p",{children:["شما می‌توانید پیکربندی‌های Redux store را در زیر"," ",e.jsx("code",{children:"src/store/"})," پیدا کنید و همچنین چندین slice به صورت جهانی مورد استفاده را ادامه می‌دهید:"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"theme"}),e.jsx("p",{className:"m-0",children:"این وضعیت تمام داده‌های مرتبط با تم را کنترل می‌کند."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"auth"}),e.jsx("p",{className:"m-0",children:"این وضعیت اطلاعات احراز هویت برنامه را کنترل می‌کند."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"locale"}),e.jsx("p",{className:"m-0",children:"این وضعیت لوکیشن برنامه را کنترل می‌کند."})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"base"}),e.jsx("p",{className:"m-0",children:"این وضعیت یک وضعیت کلی برنامه است؛ شما می‌توانید هر داده معمولاً استفاده شده را در اینجا قرار دهید."})]})]}),e.jsxs("p",{children:["همچنین ما از"," ",e.jsx("a",{href:"https://github.com/rt2zz/redux-persist",target:"_blank",rel:"noreferrer",children:"redux-persist"})," ","برای حفظ وضعیت‌های ",e.jsx("code",{children:"auth"}),"، ",e.jsx("code",{children:"theme"})," و"," ",e.jsx("code",{children:"locale"})," در localStorage استفاده می‌کنیم."]}),e.jsxs("div",{className:"mt-10",id:"codeSplitting",children:[e.jsx("h5",{children:"تقسیم کد"}),e.jsx("p",{className:"mt-1",children:"ما رویکرد حاصل از تزریق ردیوسرها را در کدمان برای استراتژی تقسیم کد پیاده‌سازی کرده‌ایم؛ این می‌تواند هنگام نیاز به‌طور دینامیک ردیوسرها را به فروشگاه اضافه کند. در زیر چند کد نمونه برای ثبت‌ردیوسرها آمده است:"}),e.jsx(t,{language:"ts",children:`// store/index.ts 
import { combineReducers } from '@reduxjs/toolkit'
import yourFirstSliceReducers, { YOUR_FIRST_SLICE_NAME } from './yourFirstSlice'
import yourSecondSliceReducers, { YOUR_SECOND_SLICE_NAME } from './yourSecondSlice'
import { useSelector } from 'react-redux'

import type { YourFirstSliceState } from './yourFirstSlice'
import type { YourSecondSliceState } from './yourSecondSlice'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState } from '@/store'

const reducer = combineReducers({
    yourFirstStateKeyName: yourFirstSliceReducers,
    yourSecondStateKeyName: yourSecondSliceReducers
})

// create useAppSelector hook combining RootState & your new added state
export const useAppSelector: TypedUseSelectorHook<
    RootState & {
        [YOUR_FIRST_SLICE_NAME]: {
            yourFirstStateKeyName: YourFirstSliceState
        },
        [YOUR_SECOND_SLICE_NAME]: {
            yourSecondStateKeyName: YourSecondSliceState
        }
    }
> = useSelector

export * from './yourFirstSlice'
export * from './yourSecondSlice'
export { useAppDispatch } from '@/store'

export default reducer
`})]}),e.jsx("p",{children:"و سپس می‌توانید آنها را به مولفه‌های خود اعلام کنید (ما ورود مولفه نما را ترجیح می‌دهیم)"}),e.jsx(t,{language:"tsx",children:`import reducer, {
    someActionFromYourSlice,
    useAppDispatch,
    useAppSelector,
} from './store'
import { injectReducer } from '@/store'

injectReducer('yourReducerName', reducer)

const YourComponent = () => {

	const dispatch = useAppDispatch()

	// Use the useAppSelector hook to access the store state.
	const someStateFromYourSlice = useAppSelector((state) => state.yourReducerName.yourFirstStateKeyName.someState)

	useEffect(() => {
		// Use useAppDispatch hook to dispatch an action.
		dispatch(someActionFromYourSlice())
	}, [])

	return (
		<>{someStateFromYourSlice}</>
	)
}`}),e.jsxs("div",{className:"mt-10",id:"creatingNewSlice",children:[e.jsx("h5",{children:"ایجاد Slice جدید"}),e.jsx("p",{className:"mt-1",children:"Slice مجموعه‌ای از منطق ردیوسر و اقدامات برای یک ویژگی است، بنابراین ما پیشنهاد می‌دهیم که فایل slice را زیر پوشه ماژول ویژگی‌های شما قرار دهید تا قابلیت اسکوپینگ منطق بهتری داشته باشد. در زیر یک مثال ابتدایی از یک slice آمده است."}),e.jsx(t,{language:"ts",children:`import { createSlice } from '@reduxjs/toolkit'

export type SliceState = {
    someState: string
}

const initialState: SliceState = {
    someState: ''
}

export const SLICE_NAME = 'yourSliceName';

const yourSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {}
})

export default yourSlice.reducer`})]}),e.jsxs("div",{className:"mt-10",id:"creatingReduces",children:[e.jsx("h5",{children:"ایجاد یک Reducer"}),e.jsx("p",{className:"mt-1",children:"می‌توانید reducer خود را در slice تعریف کنید، همانطور که در کد زیر نشان داده شده است:"}),e.jsx(t,{language:"ts",children:`import { createSlice } from '@reduxjs/toolkit'

export type SliceState = {
    someState: string
}

const initialState: SliceState = {
    someState: ''
}

export const SLICE_NAME = 'yourSliceName';

const yourSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        someActionFromYourSlice: (state, action) => {
            state.someState = action.payload
        },
    }
})

export default yourSlice.reducer`})]}),e.jsxs("div",{className:"mt-10",id:"asyncRequestsWithCreateAsyncThunk",children:[e.jsx("h5",{children:"درخواست‌های ناهمزمان با استفاده از createAsyncThunk"}),e.jsxs("p",{className:"mt-1",children:["همچنین می‌توانید درخواست API را با استفاده از ",e.jsx("code",{children:"createAsyncThunk"})," از طریق extraReducers انجام دهید."]}),e.jsx(t,{language:"ts",children:`import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { someService } from '@/services/SomeService'

export type SliceState = {
    someState: string
    loading: boolean
}

type ApiResponse = {
    ...
}

type ApiRequest = {
    ...
}

export const SLICE_NAME = 'yourSliceName';

export const getApiData = createAsyncThunk(SLICE_NAME + '/getApiData',async (data: ApiRequest) => {
    // assume someService required reesponse & require type as generic
    const response = await someService<ApiResponse, ApiRequest>(data)
    return response.data
})

const initialState: SliceState = {
    someState: ''
    loading: false
}

const yourSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        someActionFromYourSlice: (state, action) => {
            state.someState = action.payload
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getApiData.fulfilled, (state, action) => {
            state.someState = action.payload.someString
            state.loading = false
        })
        .addCase(getApiData.pending, (state) => {
            state.loading = true
        })
        .addCase(getApiData.rejected, (state) => {
            state.loading = false
        })
    },
})

export const { someActionFromYourSlice } = yourSlice.actions

export default yourSlice.reducer`})]}),e.jsxs("p",{children:["شما همچنین می‌توانید مستندات"," ",e.jsx("a",{href:"https://redux-toolkit.js.org/",target:"_blank",rel:"noreferrer",children:"redux-toolkit"})," ","را مطالعه کنید تا بهتر درک کنید که اگر با redux-toolkit آشنا نیستید."]}),e.jsxs("div",{className:"mt-10",id:"rtkQuery",children:[e.jsx("h5",{children:"RTK Query"}),e.jsxs("p",{className:"mt-1",children:["RTK Query یک ابزار قوی برای دریافت و ذخیره‌سازی داده به همراه Redux toolkit است. در Elstar، ما قابلیت‌های آن را با استفاده از یک تنظیمات پیش‌فرض RTK Query درون",e.jsx("code",{children:"src/service/RtkQueryService.ts"}),"دستکاری و بهبود داده‌ایم. اگر ترجیح می‌دهید از هوک useEffect برای دریافت داده استفاده نکنید، می‌توانید از RtkQueryService استفاده کرده و یک نمونه API را درون slice خود ایجاد کنید."]}),e.jsx("p",{children:"در زیر یک مثال ساده برای نحوه پیاده‌سازی آن آورده شده است:"})]}),e.jsx(t,{language:"ts",children:`// yourSlice.ts
import { createSlice } from '@reduxjs/toolkit'
import RtkQueryService from '@/services/RtkQueryService';

export type SliceState = {
    someState: string
}

type GetUserApiResponse = {
    ...
}

const initialState: SliceState = {
    someState: ''
}

export const SLICE_NAME = 'yourSliceName';

const getUserApi = RtkQueryService.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<GetUserApiResponse, void>({
            query: () => (
                { 
                    // Specify the URL for the endpoint
                    url: '/crm/calendar', 
                    // Specify the method for the endpoint (GET, POST, PUT, etc.)
                    method: 'GET'
                }
            ),
        }),
    }),
}) 

const yourSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {}
})

export const { useGetUserQuery } = getUserApi

export default yourSlice.reducer`}),e.jsx(t,{language:"ts",children:`// YourComponent.tsx
import reducer, {
    useGetUserQuery 
} from './store'
import { injectReducer } from '@/store'

injectReducer('yourReducerName', reducer)

const YourComponent = () => {

	const { data, error, isLoading } = useGetUserQuery();

	return (
		<>
			{
				error && 'there was an error'
			}
			{
				isLoading && 'loading...'
			}
			{
				(data && !error && !isLoading) && <h1>data</h1>
			}
		</>
	)
}`}),e.jsxs("p",{children:["برای اطلاعات بیشتر و مثال‌های اضافی، توصیه می‌شود به سایت رسمی مستندات RTK Query در"," ",e.jsx("a",{href:"https://redux-toolkit.js.org/rtk-query/overview",target:"_blank",rel:"noreferrer",children:"https://redux-toolkit.js.org/rtk-query/overview"}),"مراجعه کنید."]})]});export{c as default};
