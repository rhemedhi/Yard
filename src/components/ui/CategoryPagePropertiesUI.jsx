import { useEffect } from "react";
import CapitalizeString from "../../utils/CapitalizeString";
import { Link } from "react-router-dom";
import { MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchPropertiesPerCategoryName from "../../features/properties/services/fetchPropertiesPerCategoryName.js";
import PropertyLoader from "../../features/properties/components/propertyLoader.jsx";
import UseIsMobile from "../../hooks/UseIsMobile.js";
import PropertyCard from "./propertyCard.jsx";

function CategoryPagePropertiesUI({params}) {
    let initParam = CapitalizeString(params);
    const queryClient = useQueryClient();
    // const isMobile = UseIsMobile();
    
    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.categories() });
    }, [queryClient, initParam]);

    const { isLoading, isError, data: fetchPropertiesPerCategory, error} = useQuery({
        queryKey: queryKeys.properties.categories(),
        queryFn: fetchPropertiesPerCategoryName,
    });

    if (isLoading) {
        return (
            <PropertyLoader number={6}/>
        )
    }

    if (isError) {
        return (
            <div>Error: {`${error.message}`}</div>
        )
    }

    if (!Array.isArray(fetchPropertiesPerCategory)) {
        return <div>Unable to load properties. Please check your internet connection.</div>;
    }

    const filteredProperties = fetchPropertiesPerCategory.filter(p => p?.propertycategoryname === initParam);

    return (
        <div>
            <div className='my-5'>{filteredProperties.length > 0 ? `Showing ${filteredProperties.length} ${filteredProperties.length > 1 ? 'properties' : 'property'}` : ''}</div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3'>
                {filteredProperties.length === 0 && <div className='whitespace-nowrap'>No properties found in this category</div>}
                {filteredProperties.map(function (property) {
                    return (
                        <PropertyCard property={property} key={property.propertyid} />
                        // <div key={property.propertyid} className='rounded-lg shadow-sm dark:shadow-gray-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-700 w-full h-50 overflow-hidden'>
                        //     <Link to={`/property/${property.propertyid}`}>

                        //         {/* Property Image and Label */}
                        //         <div className='relative'> 
                        //             {/* Property Image */}
                        //             <img src={property.propertyinfo1 ?? 'none'} alt={property.propertydescription} className='rounded-t-lg object-cover w-full h-30' loading="lazy" />

                        //             {/* Property Label */}
                        //             {property.isfeatured && <div className='propertyLabel absolute top-2 left-2 bg-yellow-700 text-white text-xs py-1 px-1 rounded-xl hover:bg-yellow-500 transition-all duration-500'>featured</div>}
                        //             <div className='propertyLabel absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-1 rounded-xl hover:bg-green-700 transition-all duration-500'>{property.propertytitle}</div>
                        //         </div>
                        //         <div className='py-2 px-2'>
                        //             {/* Property Location */}
                        //             <p className='propertyLocation flex items-center space-x-1 text-gray-600 text-sm'>
                        //                 <span><MapPinIcon className='size-4' /></span>
                        //                 <span>{property.city ?? 'No Location'}</span>
                        //             </p>

                        //             {/* Property Description */}
                        //             <p className='propertyDescription my-2 text-xs truncate'>{property.propertydescription}</p>

                        //             {/* Property Price, Rating and amenities */}
                        //             <div className='propertyPriceAndRating flex my-2 justify-between items-center'>

                        //                 {/* Property Pricing */}
                        //                 <p className='propertyPrice text-xs'>
                        //                     <span className='preferredCurrency text-green-600 font-semibold'>{property.currency.toUpperCase()} </span>
                        //                     <span className='convertedPrice text-green-600 font-semibold'>{property.propertyprice}</span>
                        //                     <span className='text-xs text-gray-600'>{`/${property.rentalperiod}`} &nbsp;</span>
                        //                 </p>

                        //                 {/* Property Rating */}
                        //                 <p className='propertyRating flex items-center space-x-1 font-medium text-xs'>
                        //                     <span className='starIcon'><StarIcon className='size-3 fill-yellow-500 stroke-0' /></span>
                        //                     <span className='starRating text-yellow-500'>{property.rating ?? 0}</span> 
                        //                 </p>
                        //                 {!isMobile && <p className='propertyRating flex items-center space-x-1 font-medium text-xs'>
                        //                     <span className='starRating text-yellow-500 text-xs'>{property.bedrooms ?? 0} {property.bedrooms > 1 ? 'beds' : 'bed'}</span>
                        //                 </p>}
                        //             </div>
                        //         </div>
                        //     </Link>
                        // </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CategoryPagePropertiesUI;