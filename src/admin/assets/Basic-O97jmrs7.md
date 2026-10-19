```jsx
import { useState } from 'react'
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import { Field, Form, Formik } from 'formik'
import { HiOutlineEyeOff, HiOutlineEye } from 'react-icons/hi'
import * as Yup from 'yup'
import type { MouseEvent } from 'react'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('ایمیل نامعتبر است').required('وارد کردن ایمیل الزامی است'),
    username: Yup.string()
        .min(3, 'خیلی کوتاه!')
        .max(12, 'خیلی طولانی!')
        .required('وارد کردن نام کاربری الزامی است'),
    password: Yup.string()
        .required('وارد کردن رمز عبور الزامی است')
        .min(8, 'خیلی کوتاه!')
        .matches(/^[A-Za-z0-9_-]*$/, 'تنها حروف و اعداد مجاز هستند'),
    rememberMe: Yup.bool(),
});

const Basic = () => {
    const [pwInputType, setPwInputType] = useState('password')

    const onPasswordVisibleClick = (e: MouseEvent) => {
        e.preventDefault()
        setPwInputType(pwInputType === 'password' ? 'text' : 'password')
    }

    const passwordVisible = (
        <span
            className="cursor-pointer"
            onClick={(e) => onPasswordVisibleClick(e)}
        >
            {pwInputType === 'password' ? (
                <HiOutlineEyeOff />
            ) : (
                <HiOutlineEye />
            )}
        </span>
    )

    return (
        <div>
            <Formik
                initialValues={{
                    email: '',
                    username: '',
                    password: '',
                    rememberMe: false,
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { resetForm, setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                        resetForm()
                    }, 400)
                }}
            >
                {({ touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                label="پست الکترونیک"
                                invalid={errors.email && touched.email}
                                errorMessage={errors.email}
                            >
                                <Field
                                    type="email"
                                    autoComplete="off"
                                    name="email"
                                    placeholder="پست الکترونیک"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="نام کاربری"
                                invalid={errors.username && touched.username}
                                errorMessage={errors.username}
                            >
                                <Field
                                    type="text"
                                    autoComplete="off"
                                    name="username"
                                    placeholder="نام کاربری"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                label="کلمه عبور"
                                invalid={errors.password && touched.password}
                                errorMessage={errors.password}
                            >
                                <Field
                                    type={pwInputType}
                                    suffix={passwordVisible}
                                    autoComplete="off"
                                    name="password"
                                    placeholder="کلمه عبور"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem>
                                <Field name="rememberMe" component={Checkbox}>
                                    مرا به خاطر بسپار
                                </Field>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => resetForm()}
                                >
                                    بازنشانی کنید
                                </Button>
                                <Button variant="solid" type="submit">
                                    ارسال
                                </Button>
                            </FormItem>
                        </FormContainer>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Basic
```
