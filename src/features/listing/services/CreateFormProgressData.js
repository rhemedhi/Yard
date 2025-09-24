import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function CreateFormProgressData(propertyData, currentUser) {

    const { error: createFormProgressError } = await supabase.from('formprogress').insert({ 
        userid: currentUser.id,
        step: 1,
        formdata: JSON.stringify(propertyData),
        createdat: new Date(),
        updatedat: new Date(),
    });

    if (createFormProgressError) {
        toast.error('An error ocurred while saving property details, please try saving again');
        throw new Error(`Failed to save form progress: ${createFormProgressError.message}`);
    }

    return { success: true };

}

export default CreateFormProgressData;
