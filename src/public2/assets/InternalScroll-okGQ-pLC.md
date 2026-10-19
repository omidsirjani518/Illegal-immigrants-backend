```jsx
import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import type { MouseEvent } from 'react'

const InternalScroll = () => {
    const [dialogIsOpen, setIsOpen] = useState(false)

    const openDialog = () => {
        setIsOpen(true)
    }

    const onDialogClose = (e: MouseEvent) => {
        console.log('onDialogClose', e)
        setIsOpen(false)
    }

    const onDialogOk = (e: MouseEvent) => {
        console.log('onDialogOk', e)
        setIsOpen(false)
    }

    return (
        <div>
    <Button variant="solid" onClick={() => openDialog()}>
        باز کردن
    </Button>
    <Dialog
        isOpen={dialogIsOpen}
        onClose={onDialogClose}
        onRequestClose={onDialogClose}
    >
        <div className="flex flex-col h-full justify-between">
            <h5 className="mb-4">عنوان دیالوگ</h5>
            <div className="max-h-96 overflow-y-auto">
                <p>
                    تنها دو نوع زبان برنامه‌نویسی وجود دارد: آنچه مردم همیشه
                    به آن انتقاد دارند و آنچه هیچکس استفاده نمی‌کند. (بیارنه
                    استروستروپ) قدم زدن روی آب و توسعه نرم‌افزار از یک مشخصه
                    آسان هستند، اگر هر دوی آنها یخ بزنند. (ادوارد وی. برارد)
                    هر احمقی می‌تواند از یک رایانه استفاده کند. بسیاری این
                    کار را می‌کنند. (تد نلسون) اگر اشکال‌زدایی فرآیند حذف
                    اشکال است، پس برنامه‌نویسی باید فرآیند قرار دادن اشکال
                    در آن باشد. (ادسگر دیکسترا)
                </p>
                <p>
                    هر احمقی می‌تواند از یک رایانه استفاده کند. بسیاری این
                    کار را می‌کنند. (تد نلسون) اگر خودرو همان دوره توسعه را
                    که رایانه دارد پیش می‌رفت، یک رولز-رویس امروزی 100 دلار
                    هزینه می‌کرد، یک میلیون مایل در گالن سوخت می‌رفت و یک
                    بار در سال منفجر می‌شد و همه در داخل کشته می‌شدند.
                    (رابرت ایکس. کرینجلی) هر سیستم عاملی که وجود دارد حدوداً
                    برابر است... ما همه افتضاح هستیم. (برایان ولنتاین، معاون
                    ارشد مایکروسافت، در مورد وضعیت امنیت سیستم‌عامل، 2003)
                    تقریباً غیرممکن است به دانشجویانی که قبلاً با BASIC
                    آشنا شده‌اند، یاد دادن سبک خوب برنامه‌نویسی باشد. به
                    عنوان برنامه‌نویسان پتانسیلی، آنها فراتر از امکان
                    بازسازی شده‌اند. (ادسگر دیکسترا) گفته شده است که
                    تخصص‌های علمی بزرگ نمونه‌هایی از غول‌هاست که بر
                    گذارده‌اند. همچنین گفته شده است که صنعت نرم‌افزار نمونه‌ای
                    از کوتولگان است که بر پایه‌های کوتولگان دیگر ایستاده‌اند.
                    (آلن کوپر)
                </p>
                <p>
                    همیشه کد زنی کنید و گویی آن کسی که در نهایت کد شما را
                    نگه دارد، یک روانی خشن است که می‌داند کجا زندگی می‌کنید.
                    (مارتین گلدینگ) هیچ زبان برنامه‌نویسی - مهم نیست چقدر
                    ساختار یافته داشته باشد - نمی‌تواند از برنامه‌نویسان جلوی
                    ساخت برنامه‌های بد را بگیرد. (لری فلان) اگر سازندگان
                    ساختمان‌ها همان‌طور که برنامه‌نویسان برنامه می‌نویسند،
                    اولین گنجایشی که وارد می‌شد، مرغابی چوبی را تخریب می‌کرد.
                    (جرالد واینبرگ)
                </p>
            </div>
            <div className="text-right mt-6">
                <Button
                    className="ltr:mr-2 rtl:ml-2"
                    variant="plain"
                    onClick={onDialogClose}
                >
                    انصراف
                </Button>
                <Button variant="solid" onClick={onDialogOk}>
                    تایید
                </Button>
            </div>
        </div>
    </Dialog>
</div>
    )
}

export default InternalScroll
```
