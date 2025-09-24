function HeroStatistics() {
    return (
        <div className='yardStats flex justify-around px-5 py-10 md:py-15'>
            <div className='text-center'>
                <h2 className='font-bold text-lg md:text-3xl'>2500+</h2>
                <p className='text-sm text-gray-500'>Properties</p>
            </div>
            <div>
                <h2 className='font-bold text-lg md:text-3xl'>15+</h2>
                <p className='text-sm text-gray-500'>Cities</p>
            </div>
            <div>
                <h2 className='font-bold text-lg md:text-3xl'>10k+</h2>
                <p className='text-sm text-gray-500'>Happy Users</p>
            </div>
        </div>
    );
}

export default HeroStatistics;
