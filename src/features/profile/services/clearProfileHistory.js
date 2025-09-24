import { supabase } from "../../../integrations/supabase/client";

async function clearProfileHistory(userId) {
    try {
        const { error: clearProfileHistoryError } = await supabase
            .from('propertyviews')
            .delete()
            .eq('userid', userId);

        if (clearProfileHistoryError) {
            throw new Error(clearProfileHistoryError.message);
        }

        return { success: true };
    } catch (error) {
        console.error(error);
        return { success: false, error: error.message };
    }
}

export default clearProfileHistory;