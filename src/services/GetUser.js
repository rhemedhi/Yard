import { supabase } from "../integrations/supabase/client";

async function GetUser(userId) {
  const { data: UserData, error: UserError } = await supabase.from('profiles').select('*').eq('profileid', userId);
  
  if (UserError) {
    console.error(`Error getting user: ${UserError}`);
    return [];
  }

  return UserData;
}

export default GetUser;
