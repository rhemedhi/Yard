import PropertyCard from "../ui/propertyCard";

function SimilarProperties({filterOutSimilarProperties, similarPropertyCategoryName}) {

    const filterOutSimilarPropertiesData = filterOutSimilarProperties.filter(p => p.propertycategoryname === similarPropertyCategoryName);

    return (
        <div>
            {filterOutSimilarPropertiesData.length > 0 && 
            <div className='mb-7'>
                <div className='text-xl font-bold'>Similar Properties</div>
                <p className='whitespace-nowrap text-sm text-gray-400'>You might also be interested in these properties</p>
            </div>}
            <div className='grid grid-cols-2 md:grid-cols-7 gap-3'>
                {filterOutSimilarPropertiesData.map(function (prop) {
                    return (
                        <PropertyCard property={prop} key={prop.propertyid} />
                    )
                })}
            </div>
        </div>
    );
}

export default SimilarProperties;
