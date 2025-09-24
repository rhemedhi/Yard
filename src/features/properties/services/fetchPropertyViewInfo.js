import { supabase } from "../../../integrations/supabase/client";

async function fetchPropertyViewInfo(userId) {
    try {
        const { data: propertyviewinfo, error: propertyviewinfoerror } = await supabase
        .from('propertyviewinfo')
        .select('*')
        .eq('profileid', userId);

        if(propertyviewinfoerror) {
            return new Response(JSON.stringify({ error: 'Failed to fetch all properties', details: propertyviewinfoerror }));
        }

        return propertyviewinfo || [];
        
    } catch (error) {
        console.error(error);
        return [];
    }
}

export default fetchPropertyViewInfo;