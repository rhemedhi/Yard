import { Link } from "react-router-dom";
import Header from "./Header";
import MobileNavigation from "../layouts/MobileNavigation";
import Footer from "./Footer";
import UseIsMobile from "../../hooks/UseIsMobile";

function AccountAccessPage() {
    const isMobile = UseIsMobile();
    
    return (
        <div className='overflow-x-hidden'>
            <Header />
            <div className='setPageResponsive'>
                <Link to='/sign-in'>Login</Link>
                <Link to='/sign-up'>Create Account</Link>
            </div>
            {isMobile ? <MobileNavigation /> : <Footer />}
        </div>
    );
}

export default AccountAccessPage;