import { supabase } from "../../../integrations/supabase/client";

async function getMessagesCount(userId, conversationId) {

    const { count: messagesCount, error: messagesError } = await supabase
        .from('platformmessages')
        .select('*', { count: 'exact', head: true })
        .eq('conversationid', conversationId)
        .eq('isread', false)
        .or(`senderid.eq.${userId},recipientid.eq.${userId}`);

    if (messagesError) {
        return messagesError;
    }

    return messagesCount;
}

export default getMessagesCount;