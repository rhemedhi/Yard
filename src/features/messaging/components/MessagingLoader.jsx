import { SearchIcon } from "lucide-react";
import YardInput from "../../../components/common/YardInput";

function MessagingLoader() {
    return (
        <div className='messagingLoaderWrapper rounded-xl bg-white dark:bg-[#272727] w-full md:w-150 min-h-[80dvh] m-[0px_auto]'>
            <div className='rounded-xl bg-white dark:bg-[#272727] w-full md:w-150 min-h-[80dvh] m-[0px_auto]'>
              <p className='text-xl w-full md:w-150 m-[0px_auto] p-2'>messages</p>
              <div className='messageLoaderSearch'>
                <YardInput 
                  iconElement={<SearchIcon size={17} />}
                  placeholder='Search messages...'
                  className='w-full p-2'
                  disabled={true}
                />
              </div>
              <div className='messageLoaderChatWrapper'>
                <div className='messageLoaderChat flex flex-col'>
                  <div className='messageLoaderAnimate'></div>
                </div>
              </div>
            </div>
        </div>
    )
}

export default MessagingLoader;