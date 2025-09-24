import { LogOutIcon } from "lucide-react";
import UseSignOut from "../../../context/UserContextLogic/SignOut";

function SignOutComp() {
    const SignOut = UseSignOut();

    function handleLogout() {
        SignOut();
    }

    return (
        <div onClick={handleLogout} className='flex gap-1 my-2 w-fit m-[0px_auto] justify-center items-center text-gray-600 cursor-pointer hover:scale-105 p-2 rounded-2xl transition-all duration-500'>
            <span><LogOutIcon size={15} /></span>
            <span>Sign Out</span>
        </div>
    );
}

export default SignOutComp;