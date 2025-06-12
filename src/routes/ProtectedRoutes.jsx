import { Navigate } from "react-router-dom";
import { UseUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function ProtectedRoutes({children}) {

    const {isAuthenticated} = UseUser();
    const [showError, setShowError] = useState();

    useEffect(function () {
        if (!isAuthenticated) {
            setShowError(true);   
        }
    }, [isAuthenticated]);

    useEffect(function () {
        if (showError) {
            toast.error('Login Required');
        }
    }, [showError]);

    if (!isAuthenticated) {
        return <Navigate to='/account-access' replace />
        // return <Navigate to='/sign-in' replace />
    }

    // <Navigate to='/' replace />

    return (
        <>
           {children}
        </>
    );
}

export default ProtectedRoutes;
