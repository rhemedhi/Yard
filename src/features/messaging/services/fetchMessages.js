import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchMessages(userId) {
    try {
        if (!userId) {
            throw new Error("User ID is required");
        }
        
        const { data: MessagesData, error: MessagesError } = await supabase.rpc('get_latest_messages_by_conversation', { user_id: userId });
    
        if (MessagesError) {
            toast.error(MessagesError.message);
            return new Response(JSON.stringify({ error: 'Failed to fetch form Progress', details: MessagesError }));
        }

        return MessagesData || [];
    } catch (error) {
        console.error(error);
    }
}

export default fetchMessages;