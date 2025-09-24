import { UseListing } from "../features/listing/context/PropertyListContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function AuthorizeListingForm() {
    const {formStep} = UseListing();
    const {pathname} = useLocation();
    const navigate = useNavigate();

    useEffect(function () {
        if (pathname === '/list/propertylocation' && formStep < 1) {
            navigate('/list/propertydetails');
        } else if(pathname === '/list/propertyamenities' && formStep < 2) {
            navigate('/list/propertylocation');
        } else if(pathname === '/list/propertyimages' && formStep < 3) {
            navigate('/list/propertyamenities');
        } 

    }, [formStep, navigate, pathname]);
    
    return null;
}

export default AuthorizeListingForm;
