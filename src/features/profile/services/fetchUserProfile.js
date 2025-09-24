import { supabase } from "../../../integrations/supabase/client";

async function fetchUserProfile(userId) {
    try {
        const { data: fetcdUserProfile, error: fetcdUserProfileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('profileid', userId)
        .single();

        if (fetcdUserProfileError) {
            console.error(fetcdUserProfileError);
            return [];
        }

        return fetcdUserProfile || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchUserProfile;