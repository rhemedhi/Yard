import { SearchIcon } from "lucide-react";
import YardInput from "../components/common/YardInput";
import { Link } from "react-router-dom";
import UserAvatar from "../features/messaging/components/UserAvatar";
import MessageLastText from "../features/messaging/components/MessageLastText";
import MessageCount from "../features/messaging/components/MessageCount";
import { UseUser } from "../context/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../lib/queryKeys";
import fetchMessages from "../features/messaging/services/fetchMessages";
import MessagingLoader from "../features/messaging/components/MessagingLoader";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import MoveBack from "../components/ui/MoveBack";

function Messages() {
  const [searchQuery, setSearchQuery] = useState('');
  const [debounceSearchQuery] = useDebounce(searchQuery, 500);
  const { currentUser } = UseUser();
  const queryClient = useQueryClient();
  const { isLoading, isError, data: fetchMessagesData, error } = useQuery({
    queryKey: queryKeys.messages.chats(currentUser.id),
    queryFn: () => fetchMessages(currentUser?.id),
    enabled: !!currentUser?.id,
    refetchInterval: 2000,
    refetchIntervalInBackground: false,
    staleTime: 1000,
  });

  useEffect(function () {
    queryClient.invalidateQueries({
      queryKey: queryKeys.messages.chats(currentUser.id),
    });
  }, [currentUser.id, queryClient]);

  if (isLoading) {
    return (
      <div>
        <MessagingLoader />
      </div>
    )
  }

  if (isError) {
    return (
      <div>An Error Ocurred: {error}</div>
    )
  }

  if (!fetchMessagesData || !Array.isArray(fetchMessagesData)) {
    return (
      <div className="p-4 text-gray-500 dark:text-gray-400">
        No messages available.
      </div>
    );
  }

  const filteredMessages = fetchMessagesData.filter(message => (
    (message.recipientid === currentUser.id ? 
    message.sender_profilename.toLowerCase().includes(debounceSearchQuery.toLowerCase())
    : 
    message.recipient_profilename.toLowerCase().includes(debounceSearchQuery.toLowerCase())) ||
    message.content.toLowerCase().includes(debounceSearchQuery.toLowerCase())
  )).sort((a, b) => new Date(b.createddate) - new Date(a.createddate));

  // console.log(filteredMessages);

  return (
    <div className='bg-gray-50 dark:bg-[#121212] p-2'>
      <MoveBack />
      <div className='chatWrapper'>
        <div className='rounded-xl bg-white dark:bg-[#272727] w-full md:w-150 min-h-[80dvh] m-[0px_auto]'>
          <p className='text-xl w-full md:w-150 m-[0px_auto] p-2'>Messages</p>
          <div className='messagesSearch'>
            <YardInput 
              iconElement={<SearchIcon size={17} />}
              placeholder='Search Messages...'
              className='w-full p-2'
              value={searchQuery}
              onValueChange={setSearchQuery}
              onChange={filteredMessages}
            />
          </div>
          <div className='messagesChatWrapper'>
            <div className='messagesChat flex flex-col'>
              <ul className={`messageChatList ${filteredMessages.length === 0 && 'm-[20px_auto]'}`}>
                {filteredMessages.length === 0 && <div className='m-[20px_auto]'>No messages for you</div>}
                {filteredMessages.map(function (messages, index) {
                  const usernamesplit = messages.recipientid === currentUser.id ? messages.sender_profilename?.split(' ') : messages.recipient_profilename?.split(' ');
                  const userInitials = `${usernamesplit[0]?.substring(0, 1)}${usernamesplit[1]?.substring(0, 1)}`;

                  return (
                    <li key={index} className='hover:bg-gray-200 dark:hover:bg-[#454545] transition-all duration-500'>
                      <Link to={`/messages/${messages.conversationid}`} className='flex items-center gap-4 border-t-1 border-gray-300 dark:border-[#202020] p-2 truncate'>
                        <UserAvatar avatarurl={messages.recipientid === currentUser.id ? messages.sender_avatarurl : messages.recipient_avatarurl} avatarname={messages.recipientid === currentUser.id ? messages.sender_profilename : messages.recipient_profilename} userInitials={userInitials} imageClassName={`object-cover`} />
                        <MessageLastText userId={currentUser.id} recipientId={messages.recipientid} recipientname={messages.recipientid === currentUser.id ? messages.sender_profilename :  messages.recipient_profilename} lastMessageContent={messages.content} lastMessageTime={messages.createddate} isRead={messages.isread} />
                        <MessageCount userId={currentUser.id} recipientId={messages.recipientid} conversationId={messages.conversationid} />
                      </Link> 
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Messages;

