import toast from "react-hot-toast";
import axios from 'axios';

async function SignUp(parsedData) {
    try {
      const response = await axios.post('https://ostjnxcfscqbkjzrofhr.supabase.co/functions/v1/createNewUser', 
        parsedData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_SERVICE_ROLE_KEY}`
          }
        }
      )

      toast.success('User created successfully, verify your email address and login'); 
      return response?.data;
    } catch (error) {
      console.error(error);
      toast.error(`${error?.message}`); 
    }
}

export default SignUp;

