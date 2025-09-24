import { supabase } from "../../../integrations/supabase/client";

async function fetchInboxConversations(conversationId) {
    try {
        if (!conversationId) {
            throw new Error("Conversation ID is required");
        }

        const { data: inboxConvoData, error: inboxConvoError } = await supabase
            .from("platformmessages")
            .select(`
              *,
              sender:profiles!senderid (avatarurl, profilename),
              recipient:profiles!recipientid (avatarurl, profilename)
            `)
            .eq("conversationid", conversationId)
            .order("createddate", { ascending: true });
    
        if (inboxConvoError) {
            console.error(inboxConvoError);
        }
        
        return inboxConvoData || [];
    } catch (error) {
        console.error(error);
    }
}

export default fetchInboxConversations;
