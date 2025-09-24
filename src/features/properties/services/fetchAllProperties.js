import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchAllProperties() {
    try {
        const { data: allPropertiesData, error: allPropertiesError } = await supabase
        .from('allpropertiesdata')
        .select('*');

        if(allPropertiesError) {
            toast.error('An error occured, kindly refresh page');
            return new Response(JSON.stringify({ error: 'Failed to fetch all properties', details: allPropertiesError }));
        }

        return allPropertiesData;
        
    } catch (error) {
        console.error(error);
    }
}

export default fetchAllProperties;
