import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import UseIsMobile from "../hooks/UseIsMobile.js";
import MobileNavigation from '../components/layouts/MobileNavigation';
import Hero from '../components/ui/Hero.jsx';

function Homepage() {
  const isMobile = UseIsMobile();

  return (
    <div className='overflow-x-hidden'>
      <Header />
        <div className='setPageResponsive'>
          <Hero />
          hey there
        </div>
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

export default Homepage;