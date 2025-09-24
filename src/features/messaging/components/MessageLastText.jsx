import { CheckCheckIcon } from "lucide-react";
import GetTimeFromDate from "../../../utils/GetTimeFromDate";

function MessageLastText({userId, recipientId, recipientname, lastMessageContent, lastMessageTime, isRead}) {
    
    return (
        <div className='flex-1 min-w-0'>
            <div className='flex justify-between'>
                <div className='messageUserName font-medium truncate'>{recipientname}</div>
                <div className='messageTime text-sm text-gray-400 '>{GetTimeFromDate(lastMessageTime)}</div>
            </div>
            <div className='text-sm text-gray-400 truncate flex gap-3 w-fit'>
                {userId !== recipientId && <sub className='text-xs whitespace-nowrap'>
                    {userId !== recipientId && <span className='flex justify-end'><CheckCheckIcon size={18} color={isRead ? '#1864ab' : '#adb5bd'} /></span>}
                </sub>}
                <span>{lastMessageContent}</span>
            </div>
        </div>
    );
}

export default MessageLastText;
