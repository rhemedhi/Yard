import { supabase } from "../../../integrations/supabase/client";

async function saveSearchPreferences(userId, preferenceDataToUpdate, preferenceDataToInsert) {
    try {
        const { data: preferenceExist, error: preferenceExistError } = await supabase
            .from('userpreferences')
            .select('*')
            .eq('userid', userId);
        
        if (preferenceExistError) {
            console.error(preferenceExistError);
            return { success: false, action: null, error: preferenceExistError };
        }
        
        if (!preferenceExist || preferenceExist.length === 0) {
            // insert preference
            const { error: insertError } = await supabase.from('userpreferences').insert(preferenceDataToInsert);
    
            if (insertError) {
                console.error(`Error inserting: ${insertError}`);
                return { success: false, action: 'insert', error: insertError };
            }
    
            return { success: true, action: 'insert' };
        }
        
        // update preference
        const { error: updateError } = await supabase.from('userpreferences').update(preferenceDataToUpdate).eq('userid', userId);
        if (updateError) {
            console.error(`Error Updating: ${updateError}`);
            return { success: false, action: 'update', error: updateError };
        }
    
        return { success: true, action: 'update' };
        
    } catch (error) {
        console.error(error);
        return { success: false, action: null, error };
    }
}

export default saveSearchPreferences;