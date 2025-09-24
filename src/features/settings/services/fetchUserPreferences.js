import { supabase } from "../../../integrations/supabase/client";

async function fetchUserPreferences(userId) {
    try {
        const { data: userpreferencesdata, error: userpreferenceserror } = await supabase
            .from('userpreferences')
            .select('*')
            .eq('userid', userId)
            .maybeSingle();
        
        if (userpreferenceserror) {
            console.error(userpreferenceserror);
            return null;
        }

        return userpreferencesdata || {};
        
    } catch (error) {
        console.error(error);
        return null;
    }
}

export default fetchUserPreferences;