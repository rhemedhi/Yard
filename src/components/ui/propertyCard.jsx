import { BookmarkIcon, MapPinIcon, StarIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { supabase } from "../../integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchSavedPropertyByUser from "../../features/properties/services/fetchSavedPropertyByUser";
import { useEffect } from "react";
import { UseUser } from "../../context/UserContext";

function PropertyCard({property}) {

    const { currentUser } = UseUser();
    const userId = currentUser?.id;
    const ownerPropertyCatName = property.propertycategoryname.endsWith('s') ? 
        property.propertycategoryname.substring(0, property.propertycategoryname.length - 1) : 
        property.propertycategoryname.endsWith('es') ? 
        property.propertycategoryname.substring(0, property.propertycategoryname.length - 2)  : property.propertycategoryname;

    const queryClient = useQueryClient();

    useEffect(function () {
        queryClient.invalidateQueries({
            queryKey: queryKeys.properties.savedPropertiesByUser(userId),
        });
        queryClient.invalidateQueries({
            queryKey: queryKeys.properties.savedFullProperties(userId),
        });
    }, [queryClient, userId]);

    const { data: savedPropData } = useQuery({
        queryKey: queryKeys.properties.savedPropertiesByUser(userId),
        queryFn: () => fetchSavedPropertyByUser(userId),
        // enabled: !!userId,
    });

    async function savePropertyByUser() {
        try {
            const savedPropertyData = {
                userid: userId,
                propertyid: property.propertyid
            }
            const { error: savePropertyError } = await supabase.from('savedproperty').insert(savedPropertyData);
    
            if (savePropertyError) {
                console.error(savePropertyError);
                return;
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.properties.savedPropertiesByUser(userId),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.properties.savedFullProperties(userId),
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    async function removePropertyByUser() {
        try {
            // const savedPropertyData = {
            //     userid: userId,
            //     propertyid: property.propertyid
            // }
            const { error: savePropertyError } = await supabase.from('savedproperty').delete()
                .eq('userid', userId)
                .eq('propertyid', property.propertyid);
    
            if (savePropertyError) {
                console.error(savePropertyError);
                return;
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.properties.savedPropertiesByUser(userId),
            });
            queryClient.invalidateQueries({
                queryKey: queryKeys.properties.savedFullProperties(userId),
            });
            
        } catch (error) {
            console.error(error);
        }
    }

    if (!savedPropData && !Array.isArray(savedPropData)) {
        return [];
    }

    let savedProp = false;
    savedPropData.forEach(function (prop) {
        if (prop.propertyid === property.propertyid) {
            savedProp = true;
        }
    });

    return (
        <div key={property.propertyid} className='group relative rounded-lg shadow-sm dark:shadow-gray-800 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 w-full h-50 '>
            {userId && <BookmarkIcon onClick={savedProp ? removePropertyByUser : savePropertyByUser} className={`absolute size-7 top-[5px] left-[5%] h-6 w-8 border-none stroke-0 cursor-pointer ${savedProp ? 'fill-green-600' : 'fill-gray-500'} z-2 transition-all duration-700`} />}
            {/* {<BookmarkIcon onClick={savedProp ? removePropertyByUser : savePropertyByUser} className={`opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute size-7 top-[-10px] left-[5%] h-6 w-8 border-none stroke-0 cursor-pointer ${savedProp ? 'fill-green-600' : 'fill-gray-500'} z-999 transition-all duration-700`} />} */}
            <Link to={`/property/${property.propertyid}`}>

                {/* Property Image and Label */}
                <div className='relative'> 
                    {/* Property Image */}
                    <img src={property.propertyinfo1 ?? 'none'} alt={property.propertydescription} className='rounded-t-lg object-cover w-full h-30' loading="lazy" />

                    {/* Property Label */}
                    <div className='propertyLabel absolute top-2 right-2 bg-green-500 text-white text-xs py-1 px-1 rounded-xl hover:bg-green-700 transition-all duration-500'>{property.propertytitle}</div>
                        <div className='py-2 px-2'>
                            {/* Property Location */}
                            <p className='propertyLocation flex items-center space-x-1 text-gray-600 text-sm truncate'>
                                <span><MapPinIcon className='size-4' /></span>
                                <span>{property.city ?? 'No Location'}</span>
                            </p>

                            {/* Property Description */}
                            <p className='propertyDescription my-2 text-xs truncate' title={`${ownerPropertyCatName} at ${property.city}`}>{`${ownerPropertyCatName} at ${property.city}`}</p>
                            {/* <p className='propertyDescription my-2 text-xs truncate' title={property.propertydescription}>{property.propertydescription}</p> */}

                            {/* Property Price, Rating and amenities */}
                            <div className='propertyPriceAndRating flex my-2 justify-between items-center'>

                            {/* Property Pricing */}
                            <p className='propertyPrice text-xs'>
                                <span className='preferredCurrency text-green-600 font-semibold'>{property.currency?.toUpperCase()} </span>
                                <span className='convertedPrice text-green-600 font-semibold'>{property.propertyprice}</span>
                                <span className='text-xs text-gray-600'>{`/${property.rentalperiod}`} &nbsp;</span>
                            </p>

                            {/* Property Rating */}
                            <p className='propertyRating flex items-center space-x-1 font-medium text-xs'>
                                <span className='starIcon'><StarIcon className='size-3 fill-yellow-500 stroke-0' /></span>
                                <span className='starRating text-yellow-500'>{property.rating ?? 0}</span> 
                            </p>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default PropertyCard;
