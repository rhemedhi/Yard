import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchNewListedProperties() {
    try {
        const { data: newListedProperties, error: newListedPropertiesError } = await supabase
        .from('newlistedproperties')
        .select('*')
        .order('createddate', { ascending: false })
        .limit(14);

        if(newListedPropertiesError) {
            toast.error('An error ocurred, kindly refresh page');
            return new Response(JSON.stringify({ error: 'Failed to fetch featured properties', details: newListedPropertiesError }));
        }

        return newListedProperties;
        
    } catch (error) {
        console.error(error);
    }
}

export default fetchNewListedProperties;

