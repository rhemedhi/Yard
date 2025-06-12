import toast from "react-hot-toast";
import axios from 'axios';

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
    
    toast.success('Logged In Successfully'); 
    return response?.data;
  } catch (error) {
    console.error(error);
    toast.error(`${error?.message}`); 
  }
}

export default SignIn;
