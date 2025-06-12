import Header from './Header';
import Footer from './Footer';
import UseIsMobile from "../../hooks/UseIsMobile.js";
import MobileNavigation from '../layouts/MobileNavigation';

function SearchProperty() {
  const isMobile = UseIsMobile();

  return (
    <div className='overflow-x-hidden'>
      <Header />
        <div className='setPageResponsive'>
          Seach Properties
        </div>
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

export default SearchProperty;