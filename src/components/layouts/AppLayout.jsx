import { Outlet } from 'react-router-dom';
import Header from '../ui/Header';
import Footer from '../ui/Footer';
import UseIsMobile from "../../hooks/UseIsMobile.js";
import MobileNavigation from './MobileNavigation';

function AppLayout() {
    const isMobile = UseIsMobile();

    return (
        <>
            <div className='overflow-x-hidden'>
                <Header />
                <main className='setPageResponsive'>
                    <Outlet />        
                </main>
                {isMobile ? <MobileNavigation /> : <Footer />}
            </div>
        </>
    );
}

export default AppLayout;