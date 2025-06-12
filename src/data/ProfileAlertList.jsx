import { BellAlertIcon, ChatBubbleLeftIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export const ProfileAlertList = [
    {
        "name": "Notifications",
        "icon": <BellAlertIcon className='size-5' />,
        "link": '/notifications'
    },
    {
        "name": "Messages",
        "icon": <ChatBubbleLeftIcon className='size-5' />,
        "link": '/messages'
    },
    {
        "name": "Profile",
        "icon": <UserCircleIcon className='size-5' />,
        "link": '/profile'
    }
]

