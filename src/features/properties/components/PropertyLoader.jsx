function PropertyLoader({number = 1}) {
    const count = Math.max(1, Math.floor(Number(number)));

    return (
        <div className='grid grid-cols-2 md:grid-cols-7 gap-3 py-2'>
            {Array.from({ length: count }).map(function (_, i) {
                return (
                    <div key={i} className='propertycardloader rounded-lg shadow-sm bg-gray-100 dark:bg-[#292929] dark:shadow-gray-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-700 w-full h-50 overflow-hidden'></div>
                )
            })}
        </div>
    );
}

export default PropertyLoader;
