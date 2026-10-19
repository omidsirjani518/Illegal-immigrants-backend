```jsx
import Timeline from '@/components/ui/Timeline'
import Avatar from '@/components/ui/Avatar'
import Badge from '@/components/ui/Badge'
import Card from '@/components/ui/Card'
import Tag from '@/components/ui/Tag'
import { HiTag } from 'react-icons/hi'
import type { AvatarProps } from '@/components/ui/Avatar'

type TimelineAvatarProps = AvatarProps

const TimelineAvatar = ({ children, ...rest }: TimelineAvatarProps) => {
    return (
        <Avatar {...rest} size={25} shape="circle">
            {children}
        </Avatar>
    )
}

const Advance = () => {
    return (
     <div className="max-w-[700px]">
             <Timeline>
                 <Timeline.Item
                     media={
                         <TimelineAvatar className="bg-amber-500">
                             سی
                         </TimelineAvatar>
                     }
                 >
                     <p className="my-1 flex items-center">
                         <span className="font-semibold text-gray-900 dark:text-gray-100">
                             نادر{' '}
                         </span>
                         <span className="mx-2">وضعیت را به </span> تغییر داده است
                         <Badge className="bg-emerald-500" />
                         <span className="ml-1 rtl:mr-1 font-semibold text-gray-900 dark:text-gray-100">
                             تکمیل شد
                         </span>
                         <span className="ml-3 rtl:mr-3">6 ساعت قبل</span>
                     </p>
                 </Timeline.Item>
                 <Timeline.Item
                     media={
                         <TimelineAvatar
                             src="/img/avatars/thumb-3.jpg"
                             className="bg-amber-500"
                         />
                     }
                 >
                     <p className="my-1 flex items-center">
                         <span className="font-semibold text-gray-900 dark:text-gray-100">
                             علی
                         </span>
                         <span className="mx-2">درباره </span> خود نظر دهید
                         <span className="font-semibold text-gray-900 dark:text-gray-100">
                             پست
                         </span>
                         <span className="ml-3 rtl:mr-3">2 روز قبل</span>
                     </p>
                     <Card className="mt-4">
                         <p>
                             خوب، جاوا ممکن است یک مثال خوب از آنچه a
                             زبان برنامه نویسی باید شبیه باشد. اما جاوا
                             برنامه ها نمونه های خوبی از چه برنامه هایی هستند
                             نباید شبیه باشد.
                         </p>
                     </Card>
                 </Timeline.Item>
                 <Timeline.Item
                     media={
                         <TimelineAvatar className="text-gray-700 bg-gray-200 dark:text-gray-100">
                             <HiTag />
                         </TimelineAvatar>
                     }
                 >
                     <p className="flex items-center">
                         <span className="font-semibold text-gray-900 dark:text-gray-100">
                             ابولفضل{' '}
                         </span>
                         <span className="mx-2">برچسب‌ها را اضافه کرد </span>
                         <برچسب
                             پیشوند
                             className="mr-2 rtl:ml-2 cursor-pointer"
                             prefixClass="bg-rose-500"
                         >
                             موضوع زنده
                         </Tag>
                         <برچسب
                             پیشوند
                             className="mr-2 rtl:ml-2 cursor-pointer"
                             prefixClass="bg-blue-600"
                         >
                             کد پشتی
                         </Tag>
                         <span className="ml-3 rtl:mr-3">2 روز قبل</span>
                     </p>
                 </Timeline.Item>
             </Timeline>
         </div>
    )
}

export default Advance
```
