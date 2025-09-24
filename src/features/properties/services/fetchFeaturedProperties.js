import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchFeaturedProperties() {
    try {
        const { data: featuredProperties, error: featuredPropertiesError } = await supabase
        .from('featuredproperties')
        .select('*')
        .order('createddate', { ascending: false })
        .limit(14);

        if(featuredPropertiesError) {
            toast.error('An error occured, kindly refresh page');
            return new Response(JSON.stringify({ error: 'Failed to fetch featured properties', details: featuredPropertiesError }));
        }

        return featuredProperties;
        
    } catch (error) {
        console.error(error);
    }
}

export default fetchFeaturedProperties;
