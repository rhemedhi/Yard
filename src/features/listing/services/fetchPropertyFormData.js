import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchPropertyFormData() {
    try {
        const { data: formProgressData, error: formProgressError } = await supabase.from('formprogress').select();
        
        if(formProgressError) {
            toast.error(formProgressError.message);
            return new Response(JSON.stringify({ error: 'Failed to fetch form Progress', details: formProgressError }));
        }
        
        return formProgressData;

    } catch (error) {
        console.error(error);
    }

}

export default fetchPropertyFormData;
