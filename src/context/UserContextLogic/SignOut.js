import toast from "react-hot-toast";
import { supabase } from "../../integrations/supabase/client";
import { useNavigate } from "react-router-dom";

function UseSignOut() {
    const navigate = useNavigate();
    async function SignOut() {
        const { error: signOutError } = await supabase.auth.signOut();

        if (signOutError) {
            toast.error('There was an error signing out, kindly try again');
            return null;
        }

        toast.success('Signed out successfully');
        navigate('/sign-in');
    }

    return SignOut;
}

export default UseSignOut;
