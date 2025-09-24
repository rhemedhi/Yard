import { useEffect, useRef } from "react";
import YardLink from "../components/common/YardLink";
import { UseUser } from "../context/UserContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import MoveBack from "../components/ui/MoveBack";

function ListPropertyPage() {

    const { currentUser } = UseUser();
    const userType = currentUser?.user_metadata?.usertype;
    const navigate = useNavigate();
    let toastShown = useRef(false);

    useEffect(function () {
        if(!currentUser.id && !toastShown.current) {
            toast.error('You need to log in to access to page');
            toastShown.current = true;
            navigate('/');
        }

        if (userType !== 'Agent' && !toastShown.current) {
            toast.error('You need to be an agent to access this page');
            toastShown.current = true;
            navigate('/');
        }
    }, [currentUser, userType, navigate]);

    return (
        <>
            <MoveBack />
            <div className='setResponsive flex justify-center items-center min-h-[70dvh]'>
                <div className="max-w-2xl  mx-2 text-center p-10 rounded-2xl shadow-lg bg-white dark:bg-[#212121]">
                    <h1 className="text-xl font-bold mb-5">Hello {currentUser?.user_metadata?.fullname}, ready to share your space?</h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-9">List your property and connect with the right people. It's quick, simple, and you’re in control.</p>
                    <YardLink to='/list/propertydetails' className='border-1 dark:border-white border-gray-600 border-b-0 rounded-lg p-2'>List a Property</YardLink>
                </div>
            </div>
        </>
    );
}

export default ListPropertyPage;


