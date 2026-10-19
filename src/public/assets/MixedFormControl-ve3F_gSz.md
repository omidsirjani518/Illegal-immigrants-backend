```jsx
import { FormItem, FormContainer } from '@/components/ui/Form'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import DatePicker from '@/components/ui/DatePicker'
import TimeInput from '@/components/ui/TimeInput'
import Checkbox from '@/components/ui/Checkbox'
import Radio from '@/components/ui/Radio'
import Switcher from '@/components/ui/Switcher'
import Segment from '@/components/ui/Segment'
import Upload from '@/components/ui/Upload'
import SegmentItemOption from '@/components/shared/SegmentItemOption'
import { HiCheckCircle } from 'react-icons/hi'
import { Field, Form, Formik } from 'formik'
import CreatableSelect from 'react-select/creatable'
import * as Yup from 'yup'
import type { FieldProps } from 'formik'

type Option = {
    value: string
    label: string
}

type FormModel = {
    input: string
    select: string
    multipleSelect: string[]
    date: Date | null
    time: Date | null
    singleCheckbox: boolean
    multipleCheckbox: Array<string | number>
    radio: string
    switcher: boolean
    segment: string[]
    upload: File[]
}

const options: Option[] = [
    { value: 'foo', label: 'فو' },
    { value: 'bar', label: 'بار' },
]

const segmentSelections = [
    { value: 'Personal', desc: 'برنامه‌ی شخصی.' },
    { value: 'Team', desc: 'برنامه‌ی تیم' },
    { value: 'Business', desc: 'برای طرح کسب و کار با ما تماس بگیرید.' },
]

const MIN_UPLOAD = 1
const MAX_UPLOAD = 2

const validationSchema = Yup.object().shape({
    input: Yup.string()
        .min(3, 'کوتاه است!')
        .max(20, 'طولانی است!')
        .required('لطفاً نام کاربری را وارد کنید!'),
    select: Yup.string().required('لطفاً یکی را انتخاب کنید!'),
    multipleSelect: Yup.array().min(1, 'حداقل یک مورد انتخاب شده است!'),
    date: Yup.date().required('تاریخ الزامی است!').nullable(),
    time: Yup.date().required('زمان الزامی است!').nullable(),
    singleCheckbox: Yup.boolean().oneOf([true], 'شما باید این را تیک بزنید!'),
    multipleCheckbox: Yup.array().min(1, 'حداقل یک گزینه را انتخاب کنید!'),
    radio: Yup.string().required('لطفاً یکی را انتخاب کنید!'),
    switcher: Yup.boolean().oneOf([true], 'شما باید این را روشن کنید!'),
    upload: Yup.array().min(MIN_UPLOAD, 'حداقل یک فایل آپلود شده است!'),
    segment: Yup.array().min(1, 'حداقل یک گزینه را انتخاب کنید!'),
})

const MixedFormControl = () => {
    const beforeUpload = (file: FileList | null, fileList: File[]) => {
        let valid: string | boolean = true

        const allowedFileType = ['image/jpeg', 'image/png']
        const MAX_FILE_SIZE = 500000

        if (fileList.length >= MAX_UPLOAD) {
            return `تنها می‌توانید ${MAX_UPLOAD} فایل آپلود کنید`
        }

        if (file) {
            for (const f of file) {
                if (!allowedFileType.includes(f.type)) {
                    valid = 'لطفاً یک فایل .jpeg یا .png آپلود کنید!'
                }

                if (f.size >= MAX_FILE_SIZE) {
                    valid = 'اندازه تصویر نمی‌تواند بیشتر از 500 کیلوبایت باشد!'
                }
            }
        }

        return valid
    }

    return (
        <div>
            <Formik
                enableReinitialize
                initialValues={{
                    input: '',
                    select: '',
                    multipleSelect: [],
                    date: null,
                    time: null,
                    singleCheckbox: false,
                    multipleCheckbox: [],
                    radio: '',
                    switcher: false,
                    segment: [],
                    upload: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2))
                        setSubmitting(false)
                    }, 400)
                }}
            >
                {({ values, touched, errors, resetForm }) => (
                    <Form>
                        <FormContainer>
                            <FormItem
                                asterisk
                                label="ورودی"
                                invalid={errors.input && touched.input}
                                errorMessage={errors.input}
                            >
                                <Field
                                    type="text"
                                    name="input"
                                    placeholder="ورودی"
                                    component={Input}
                                />
                            </FormItem>
                            <FormItem
                                asterisk
                                label="انتخاب"
                                invalid={errors.select && touched.select}
                                errorMessage={errors.select}
                            >
                                <Field name="select">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select
                                            placeholder='انتخاب کنید'
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={options.filter(
                                                (option) =>
                                                    option.value === values.select
                                            )}
                                            onChange={(option) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    option?.value
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="انتخاب چندتایی"
                                invalid={Boolean(
                                    errors.multipleSelect &&
                                    touched.multipleSelect
                                )}
                                errorMessage={errors.multipleSelect as string}
                            >
                                <Field name="multipleSelect">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Select<Option, true>
                                            placeholder='انتخاب کنید'
                                            isMulti
                                            componentAs={CreatableSelect}
                                            field={field}
                                            form={form}
                                            options={options}
                                            value={values.multipleSelect}
                                            onChange={(option) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    option
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="تاریخ"
                                invalid={errors.date && touched.date}
                                errorMessage={errors.date}
                            >
                                <Field name="date" placeholder="تاریخ">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <DatePicker
                                            field={field}
                                            form={form}
                                            value={values.date}
                                            onChange={(date) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    date
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="زمان"
                                invalid={errors.time && touched.time}
                                errorMessage={errors.time}
                            >
                                <Field name="time" placeholder="تاریخ">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <TimeInput
                                            field={field}
                                            form={form}
                                            value={values.time}
                                            onChange={(time) => {
                                                form.setFieldValue(
                                                    field.name,
                                                    time
                                                )
                                            }}
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="آپلود"
                                invalid={Boolean(
                                    errors.upload && touched.upload
                                )}
                                errorMessage={errors.upload as string}
                            >
                                <Field name="upload">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Upload
                                            beforeUpload={beforeUpload}
                                            fileList={values.upload}
                                            onChange={(files) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    files
                                                )
                                            }
                                            onFileRemove={(files) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    files
                                                )
                                            }
                                        />
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="چند گزینه‌ای چک‌باکس"
                                invalid={Boolean(
                                    errors.multipleCheckbox &&
                                    touched.multipleCheckbox
                                )}
                                errorMessage={errors.multipleCheckbox as string}
                            >
                                <Field name="multipleCheckbox">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <>
                                            <Checkbox.Group
                                                value={values.multipleCheckbox}
                                                onChange={(options) =>
                                                    form.setFieldValue(
                                                        field.name,
                                                        options
                                                    )
                                                }
                                            >
                                                <Checkbox
                                                    name={field.name}
                                                    value="Apple"
                                                >
                                                    سیب{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    name={field.name}
                                                    value="Banana"
                                                >
                                                    موز{' '}
                                                </Checkbox>
                                                <Checkbox
                                                    name={field.name}
                                                    value="Lemon"
                                                >
                                                    لیمو{' '}
                                                </Checkbox>
                                            </Checkbox.Group>
                                        </>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="رادیو"
                                invalid={errors.radio && touched.radio}
                                errorMessage={errors.radio}
                            >
                                <Field name="radio">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Radio.Group
                                            value={values.radio}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <Radio value={1}>پیپال</Radio>
                                            <Radio value={2}>استرایپ</Radio>
                                        </Radio.Group>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="چک‌باکس تکی"
                                invalid={
                                    errors.singleCheckbox &&
                                    touched.singleCheckbox
                                }
                                errorMessage={errors.singleCheckbox}
                            >
                                <Field
                                    name="singleCheckbox"
                                    component={Checkbox}
                                >
                                    من با شرایط و مقررات موافقم
                                </Field>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="سوئیچ"
                                invalid={errors.switcher && touched.switcher}
                                errorMessage={errors.switcher}
                            >
                                <div>
                                    <Field
                                        name="switcher"
                                        component={Switcher}
                                    />
                                </div>
                            </FormItem>
                            <FormItem
                                asterisk
                                label="گزینه‌ی چندگانه"
                                invalid={Boolean(
                                    errors.segment && touched.segment
                                )}
                                errorMessage={errors.segment as string}
                            >
                                <Field name="segment">
                                    {({
                                        field,
                                        form,
                                    }: FieldProps<FormModel>) => (
                                        <Segment
                                            className="w-full"
                                            selectionType="multiple"
                                            value={values.segment}
                                            onChange={(val) =>
                                                form.setFieldValue(
                                                    field.name,
                                                    val
                                                )
                                            }
                                        >
                                            <div className="grid grid-cols-3 gap-4 w-full">
                                                {segmentSelections.map(
                                                    (segment) => (
                                                        <Segment.Item
                                                            key={segment.value}
                                                            value={
                                                                segment.value
                                                            }
                                                        >
                                                            {({
                                                                active,
                                                                onSegmentItemClick,
                                                                disabled,
                                                            }) => {
                                                                return (
                                                                    <div className="text-center">
                                                                        <SegmentItemOption
                                                                            hoverable
                                                                            active={
                                                                                active
                                                                            }
                                                                            disabled={
                                                                                disabled
                                                                            }
                                                                            defaultGutter={
                                                                                false
                                                                            }
                                                                            className="relative min-h-[80px] w-full"
                                                                            customCheck={
                                                                                <HiCheckCircle className="text-indigo-600 absolute top-2 right-2 text-lg" />
                                                                            }
                                                                            onSegmentItemClick={
                                                                                onSegmentItemClick
                                                                            }
                                                                        >
                                                                            <div className="flex flex-col items-start mx-4">
                                                                                <h6>
                                                                                    {
                                                                                        segment.value
                                                                                    }
                                                                                </h6>
                                                                                <p>
                                                                                    {
                                                                                        segment.desc
                                                                                    }
                                                                                </p>
                                                                            </div>
                                                                        </SegmentItemOption>
                                                                    </div>
                                                                )
                                                            }}
                                                        </Segment.Item>
                                                    )
                                                )}
                                            </div>
                                        </Segment>
                                    )}
                                </Field>
                            </FormItem>
                            <FormItem>
                                <Button
                                    type="reset"
                                    className="ltr:mr-2 rtl:ml-2"
                                    onClick={() => resetForm()}
                                >
                                    بازنشانی
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

export default MixedFormControl
```
