import { supabase } from "../../../integrations/supabase/client";

async function fetchSavedPropertyByUser(userId) {
    try {
        if (!userId) {
            return []; 
        }
        
        const { data: savedPropertyData, error: savedPropertyError } = await supabase
            .from('savedproperty')
            .select('*')
            .eq('userid', userId);
        
        if (savedPropertyError) {
            console.error(savedPropertyError);
            return [];
        }

        return savedPropertyData;
        
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchSavedPropertyByUser;