import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import getMessagesCount from "../services/getMessagesCount";

function MessageCount({userId, recipientId, conversationId}) {

    const { isLoading, isError, data: getMessagesCountData, error } = useQuery({
        queryKey: queryKeys.messages.chatcount(userId, conversationId),
        queryFn: () => getMessagesCount(userId, conversationId),
        enabled: !!userId,
        refetchInterval: 2000,
        refetchIntervalInBackground: false,
        staleTime: 1000,
    });

    if (isLoading) {
        return (
            <div>Loading...</div>
        )
    }

    if (isError) {
        return (
            <div>Error: {error}</div>
        )
    }

    if (!getMessagesCountData || !Array.isArray(getMessagesCountData)) {
        // console.log('no');
    }

    return (
        <div className='messageTimeAndNumber'>
            {getMessagesCountData !== 0 && userId === recipientId && 
                <div className='messageNumberUnseen border-1 border-green-600 rounded-full w-5 h-5 flex justify-center items-center text-xs bg-green-600'>
                    {getMessagesCountData}
                </div>
            }
        </div>
    );
}

export default MessageCount;

