import { supabase } from "../../../integrations/supabase/client";

async function fetchFullPropertyData(userId) {
    try {
        const { data: savedPropsData, error: savedPropsError } = await supabase.from('savedpropertiesinfo')
            .select('*')
            .eq('profileid', userId);
        
        if (savedPropsError) {
            console.error(savedPropsError);
            return [];
        }

        return savedPropsData || [];

    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchFullPropertyData;