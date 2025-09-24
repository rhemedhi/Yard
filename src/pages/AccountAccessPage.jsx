import { Link } from "react-router-dom";
import Header from "../components/ui/Header";
import MobileNavigation from "../components/layouts/MobileNavigation";
import Footer from "../components/ui/Footer";
import UseIsMobile from "../hooks/UseIsMobile";

function AccountAccessPage() {
    const isMobile = UseIsMobile();
    
    return (
        <div className='overflow-x-hidden'>
            <Header />
            <div className='setPageResponsive'>
                <div className='text-center my-5 text-xl'>
                    Kindly create an account or log in to experience the best of Yard 
                </div>
                <div className='flex flex-col gap-5 justify-center items-center'>
                    <Link to='/sign-in' className='bg-green-500 p-2 rounded-lg hover:scale-105 transition-all duration-300 w-50 text-center'>Login</Link>
                    <Link to='/sign-up' className='bg-green-500 p-2 rounded-lg hover:scale-105 transition-all duration-300 w-50 text-center'>Create Account</Link>
                </div>
            </div>
            {isMobile ? <MobileNavigation /> : <Footer />}
        </div>
    );
}

export default AccountAccessPage;