import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import UseIsMobile from '../hooks/UseIsMobile.js';
import MobileNavigation from '../components/layouts/MobileNavigation';
import Hero from '../components/layouts/Hero.jsx';
import CategoryRoute from '../components/layouts/CategoryRoute.jsx';
import FeaturedProperties from '../features/properties/components/FeaturedProperties.jsx';
import NewListedProperties from '../features/properties/components/NewListedProperties.jsx';

function Homepage() {
  const isMobile = UseIsMobile();

  return (
    <div className='overflow-x-hidden'>
      <Header />
      <div className='setPageResponsive'>
        <Hero />
        <CategoryRoute />
        <FeaturedProperties />
        <NewListedProperties />
      </div>
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

export default Homepage;
