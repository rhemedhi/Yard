import HeroStatistics from '../ui/HeroStatistics';
import HomePagePropertFilter from '../ui/HomePagePropertFilter';

function Hero() {
  return (
    <div className='text-center pb-5'>
      <div className='max-w-2xl mx-auto'>
        <h1 className='text-xl lg:text-3xl font-bold shadow-2xl rounded-2xl p-5 mb-5 md:my-5 md:mt-15 animate-fade-in'>
          {/* Discover Your Perfect Space in the world */}
          Explore and Embrace your perfect place in the world
        </h1>
        <p className='text-lg my-5 text-gray-600'>Find apartments, houses, businesses, and more - all in one platform</p>
        <HomePagePropertFilter />
        <HeroStatistics />
      </div>
    </div>
  );
}

export default Hero;
