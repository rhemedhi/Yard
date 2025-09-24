import toast from "react-hot-toast";
import axios from 'axios';
import { supabase } from "../../integrations/supabase/client";

async function SignIn(parsedData) {
  try {
    const response = await axios.post('https://ostjnxcfscqbkjzrofhr.supabase.co/functions/v1/userLogIn', 
      parsedData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`
        }
      }
    )

    const { session, user } = response.data;

    if (session) {
      await supabase.auth.setSession({
        access_token: session.access_token,
        refresh_token: session.refresh_token,
      });
    }
    
    toast.success('Logged In Successfully'); 
    return { session, user };
  } catch (error) {
    console.error(error);
    toast.error(`Log in failed, kindly check email or password carefully to proceed`); 
    // toast.error(`${error?.message}`); 
  }
}

export default SignIn;
