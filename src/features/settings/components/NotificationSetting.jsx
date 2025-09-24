import { Bell, Mail } from "lucide-react";
import { EmailNotificationList } from "../../../data/EmailNotificationList";

function NotificationSetting() {
    return (
        <div className='mt-5 p-5 pb-0 rounded-lg border-1 border-gray-200 dark:border-[#212121] w-full md:w-170 lg:w-200 m-[0px_auto]'>
            <div className='flex gap-2 items-center'>
                <span><Bell /></span>
                <span className='text-xl font-semibold'>Notification Settings</span>
            </div>
            <div className='divide-y-1 divide-gray-200 dark:divide-[#212121] my-9 space-y-5'>
                <div>
                    <h2 className='flex gap-2 items-center'>
                        <span><Mail size={15} /></span>
                        <span className='text-md'>Email Notifications</span>
                    </h2>
                    <div className='my-5 space-y-3'>
                        {EmailNotificationList.map(function (emailList) {
                            return (
                                <div key={emailList.name} className='flex justify-between items-center'>
                                    <div>{emailList.name}</div>
                                    <div>
                                        <input type="radio" name="" id="" />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div></div>
                <div></div>
                <div></div>
            </div>   
        </div>
    );
}

export default NotificationSetting;