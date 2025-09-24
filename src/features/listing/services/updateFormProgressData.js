import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function updateFormProgressData(fields, formprogressid) {
    const { error: updateFormProgressError } = await supabase.from('formprogress').update(fields).eq('formprogressid', formprogressid);

    if (updateFormProgressError) {
        toast.error('Sorry, an error occured');
        throw new Error("Error updating formprogress");
    }

    return { success: true };
}

export default updateFormProgressData;
