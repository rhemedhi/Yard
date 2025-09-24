import { BellAlertIcon, ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { LogOutIcon } from 'lucide-react';

export const ProfileAlertList = [
    {
        "name": "Notifications",
        "icon": <BellAlertIcon className='size-4' />,
        "link": '/notifications'
    },
    {
        "name": "Messages",
        "icon": <ChatBubbleLeftIcon className='size-4' />,
        "link": '/messages'
    },
    {
        "name": "Profile",
        "icon": <UserCircleIcon className='size-4' />,
        "link": '/profile'
    },
    // {
    //     "name": "Sign Out",
    //     "icon": <LogOutIcon className='size-4' />,
    //     "link": '/sign-out'
    // }
]

