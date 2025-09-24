import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";

async function fetchPropertiesPerCategoryName() {
    try {
        const { data: propertyPerCategoryNameData, error: propertyPerCategoryNameError } = await supabase
        .from('propertypercategoryname')
        .select('*');

        if(propertyPerCategoryNameError) {
            toast.error('An error ocurred, kindly refresh page');
            return new Response(JSON.stringify({ error: 'Failed to fetch featured properties', details: propertyPerCategoryNameError }));
        }

        return propertyPerCategoryNameData;
        
    } catch (error) {
        console.error(error);
    }
}

export default fetchPropertiesPerCategoryName;
