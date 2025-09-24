import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import UseIsMobile from "../../../hooks/UseIsMobile";
import MoveBack from "../../../components/ui/MoveBack";
import UserAvatar from "./UserAvatar";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchInboxConversations from "../services/fetchInboxConversations";
import { UseUser } from "../../../context/UserContext";
import YardInput from "../../../components/common/YardInput";
import YardButton from "../../../components/common/YardButton";
import { useForm } from "react-hook-form";
import { ChatBubbleOvalLeftEllipsisIcon, PaperAirplaneIcon, PlusIcon } from "@heroicons/react/24/outline";
import { supabase } from "../../../integrations/supabase/client";
import toast from "react-hot-toast";
import SmallLoader from "../../../components/common/SmallLoader";
import { useEffect, useRef } from "react";
import GetTimeFromDate from "../../../utils/GetTimeFromDate";
import { CheckCheckIcon } from "lucide-react";

function MessagesInbox() {
    const isMobile = UseIsMobile();
    const navigate = useNavigate();
    const params = useParams();
    const [urlParams] = useSearchParams();
    const toNewUserId = urlParams.get('to');
    const conversationId = params.conversationId;
    const { currentUser } = UseUser();
    const userId = currentUser.id;
    const queryClient = useQueryClient();
    const showMessagesRef = useRef();

    const { register, handleSubmit, reset, formState: { errors, isSubmitting }} = useForm();

    useEffect(function () {
        queryClient.invalidateQueries({
            queryKey: queryKeys.messages.chatInbox(userId, conversationId)
        });
    }, [queryClient, userId, conversationId, toNewUserId]);

    const { isLoading, isError, data: fetchedInboxConvoData, error } = useQuery({
        queryKey: queryKeys.messages.chatInbox(userId, conversationId),
        queryFn: () => fetchInboxConversations(conversationId),
        enabled: !!userId && !!conversationId,
        refetchInterval: 2000,
        refetchIntervalInBackground: false,
        staleTime: 1000,
    });

    useEffect(() => {
        if (showMessagesRef.current) {
            // showMessagesRef.current.scrollTop = showMessagesRef.current.scrollHeight;
            showMessagesRef.current.scrollTo({
                left: 0,
                top: showMessagesRef.current.scrollHeight,
                // behavior: 'smooth',
            });
        }
        
        if (fetchedInboxConvoData && Array.isArray(fetchedInboxConvoData) && fetchedInboxConvoData.length > 0) {
            fetchedInboxConvoData.forEach(function(convoData) {
                if (userId !== convoData?.senderid) {
                    updateMessagesSeen(convoData?.messageid);
                }
            });
        }
    }, [fetchedInboxConvoData, userId]);

    if (isLoading) {
        return (
            <div>Loading Messages....</div>
        )
    }

    if (isError) {
        return (
            <div>An error ocurred: {error}</div>
        )
    }

    if (!fetchedInboxConvoData || !Array.isArray(fetchedInboxConvoData)) {
        return (
            <div>No messages yet</div>
        )
    }

    function getConversationPartner() {
        const firstConversation = fetchedInboxConvoData[0];
        const IamSender = userId === firstConversation?.senderid;
        const partnerId = IamSender ? toNewUserId ? toNewUserId : firstConversation?.recipientid : firstConversation?.senderid;
        const partnerAvatarUrl = IamSender ? firstConversation?.recipient?.avatarurl : firstConversation?.sender?.avatarurl;
        const partnerAvatarName = IamSender ? firstConversation?.recipient?.profilename : firstConversation?.sender?.profilename;
        const partnerInitials = IamSender ? 
            `${firstConversation?.recipient?.profilename.split(' ')[0].substring(0, 1)}${firstConversation?.recipient?.profilename.split(' ')[1].substring(0, 1)}`
            : 
            `${firstConversation?.sender?.profilename.split(' ')[0].substring(0, 1)}${firstConversation?.sender?.profilename.split(' ')[1].substring(0, 1)}`;

        return {partnerAvatarUrl, partnerAvatarName, partnerInitials, partnerId}
    }

    async function onMessageSend(data) {
        try {
            const messageInsertData = {
                senderid: userId,
                recipientid: toNewUserId ? toNewUserId : getConversationPartner().partnerId,
                content: data.messageInputHolder,
                isread: false,
                initiator: userId,
                conversationid: conversationId
            }
            const { error: messageInsertError } = await supabase.from('platformmessages').insert(messageInsertData);
            if (messageInsertError) {
                toast.error('An error ocurred while sending message');
                return {error: messageInsertError};
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.messages.chatInbox(userId, conversationId)
            });

            reset('');
        } catch (error) {
            toast.error('An error occured while sending message');
            throw error(error);
        }
    }

    async function updateMessagesSeen(messageid) {
        const { error: updateError } = await supabase.from('platformmessages').update({ isread: true }).eq('messageid', messageid);
        if (updateError) {
            console.error(updateError);
            return null;
        }
    }

    return (
        <div className='bg-gray-50 dark:bg-[#121212] p-2 h-[86dvh] flex flex-col'>
            <div className='chatWrapper flex flex-col'>
                <div className='rounded-xl bg-white dark:bg-[#272727] w-full md:w-150 m-[0px_auto] flex flex-col'>
                    <div className='p-2 flex flex-col'>
                        <div className='inboxHeader flex gap-5 items-center border-b-1 border-b-gray-200 py-3'>
                            {!isMobile && <div onClick={() => navigate('/messages')} className='cursor-pointer p-1 w-fit hover:bg-green-600 hover:rounded-lg '>&larr;</div>}
                            <MoveBack />
                            <UserAvatar avatarurl={getConversationPartner().partnerAvatarUrl} avatarname={getConversationPartner().partnerAvatarName} userInitials={getConversationPartner().partnerInitials} imageClassName={`object-cover`} />
                            <div>{getConversationPartner().partnerAvatarName}</div>
                        </div>

                        <div ref={showMessagesRef} className='showConversations flex flex-col gap-2 py-3 overflow-y-auto h-[65dvh]'>
                            {fetchedInboxConvoData.map(function (convo) {
                                const isSender = convo.senderid === userId;
                                return (
                                    <div key={convo.messageid} 
                                        className={`chatMessage py-3 px-2 w-fit rounded-lg ${isSender ? 'ml-auto bg-[#087f5b] text-white' : 'mr-auto bg-gray-100 dark:bg-[#202020] text-black dark:text-white'}`}
                                        role="listitem"
                                        aria-label={isSender ? "Message sent by you" : "Message received"}
                                    >
                                        <span>{convo.content}</span>
                                        <sub className='text-xs whitespace-nowrap'>
                                            <span className='whitespace-nowrap'>&nbsp;&nbsp;   {GetTimeFromDate(convo.createddate)}</span>
                                            {isSender && <span className='flex justify-end'>&nbsp;&nbsp;<CheckCheckIcon size={18} color={convo.isread ? '#1864ab' : '#adb5bd'} /> </span>}
                                        </sub>
                                    </div>
                                )
                            })}
                        </div>

                        <div className='inboxFooter flex gap-5 items-center border-t-1 border-t-gray-200 py-3 sticky bottom-0'>
                            <form className='flex gap-2 items-center w-full' onSubmit={handleSubmit(onMessageSend)}>
                                <div className='cursor-pointer border-2 text-[#ced4da] border-[#ced4da] rounded-lg h-[35px] flex items-center hover:border-green-600 hover:text-green-600 transition-all duration-500'>
                                    <PlusIcon className='w-5 h-5' />
                                </div>
                                <div className='flex-grow'>
                                    <YardInput
                                        iconElement={<ChatBubbleOvalLeftEllipsisIcon className='w-6 h-6 hover:text-green-600 transition-all duration-500' />}
                                        placeholder='Type a message...'
                                        id='messageInputHolder'
                                        name='messageInputHolder'
                                        className='w-full'
                                        inputClassName='chatBubbleCls'
                                        disabled={isSubmitting}
                                        register={register}
                                        validation={{
                                            required: 'Type in a message to send',
                                        }}
                                        error={errors?.messageInputHolder}
                                    />
                                </div>
                                <div className='cursor-pointer flex items-center'>
                                    {isSubmitting ? <SmallLoader /> : <YardButton type='submit' className='border-none hover:text-green-600 transition-all duration-500'>
                                        <PaperAirplaneIcon className='w-6 h-6'/>
                                    </YardButton>}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MessagesInbox;