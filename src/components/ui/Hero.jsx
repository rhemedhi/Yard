import HomePagePropertFilter from "./HomePagePropertFilter";

function Hero() {
    return (
        <div className='debugResponsive text-center'>
            <div className='max-w-2xl mx-auto'>
                <h1 className='text-xl lg:text-3xl font-bold shadow-2xl rounded-2xl p-5 my-5 animate-fade-in'>Discover Your Perfect Space in the world</h1>
                <p className='text-lg my-5 text-gray-600'>Find apartments, houses, businesses, and more - all in one platform</p>
                <HomePagePropertFilter />
                <div></div>
            </div>
        </div>
    );
}

export default Hero;