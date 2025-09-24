import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function retrieveFormProgressData(userid) {
    const { data: formProgressRetrievedData, error: formProgressRetrievedError } = await supabase.from('formprogress').select('*')
        .eq('userid', userid).order('createdat', { ascending: false }).limit(1).single();

    if (formProgressRetrievedError) {
        toast.error('There was a problem retrieving data from the form');
        throw new Error("There was a problem retrieving data from the form");
    }

    return formProgressRetrievedData;
}

export default retrieveFormProgressData;
