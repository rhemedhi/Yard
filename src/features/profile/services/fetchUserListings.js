import { supabase } from "../../../integrations/supabase/client";

async function fetchUserListings(ownerId) {
    try {
        const { data: userListingsData, error: userListingsError } = await supabase
            .from('allpropertiesdata')
            .select('*')
            .eq('ownerid', ownerId);

        if (userListingsError) {
            console.error(userListingsError);
            return [];
        }

        return userListingsData || [];
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchUserListings;