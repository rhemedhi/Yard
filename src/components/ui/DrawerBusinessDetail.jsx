import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import YardButton from "../common/YardButton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "../common/YardDrawer";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchAllProperties from "../../features/properties/services/fetchAllProperties";
import PropertyCard from "./propertyCard";

function DrawerBusinessDetail({businessInputLocation, businessProperty}) {
    const [searchData, setSearchData] = useState([]);
    const queryClient = useQueryClient();

    useEffect(function () {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.alldata() });
    }, [queryClient]);

    const { data: allPropertiesData } = useQuery({
        queryKey: queryKeys.properties.alldata(),
        queryFn: fetchAllProperties,
    });

    function handleFetchBusinessProperties() {
        let businessFilterValues = {
            location: businessInputLocation.current.value,
            propertyCategory: businessProperty.current.getValue()[0]?.value || '',
        }

        const searchResult = allPropertiesData.filter((p) => {
            const matchesLocation = businessFilterValues.location === '' ? true : (p.city?.toLowerCase()?.includes(businessFilterValues.location.toLowerCase()) || false) || (p.address?.toLowerCase()?.includes(businessFilterValues.location.toLowerCase()) || false) || (p.neighbourhood?.toLowerCase()?.includes(businessFilterValues.location.toLowerCase()) || false);
            const matchesCategory = businessFilterValues.propertyCategory === '' ? true : p.propertycategoryname.toLowerCase().includes(businessFilterValues.propertyCategory.toLowerCase());
            const matchesType = p.propertytypename.toLowerCase() === 'business';
            return matchesLocation && matchesCategory && matchesType;
        });
        setSearchData(searchResult);
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <YardButton onClick={handleFetchBusinessProperties} className='grid grid-cols place-items-center space-between bg-green-500 w-full rounded-lg my-5 h-12 button-glow'>
                    <div className='flex gap-2 text-white'>
                        <span><MagnifyingGlassIcon className='size-6'/></span>
                        <span>Find Business Properties</span>
                    </div>
                </YardButton>
            </DrawerTrigger>
            <DrawerPortal>
                <DrawerOverlay />
                <DrawerContent className="scrollbar-hide bg-white">
                    <div>
                        <div className="w-10 md:w-20 h-2 bg-gray-400 m-[0px_auto] rounded-full"></div>
                        <div>
                            <div className="flex justify-between">
                                <DrawerTitle className='text-lg font-semibold'>Search Results</DrawerTitle>
                                <DrawerClose><XCircleIcon className='size-6 cursor-pointer ' /></DrawerClose>
                            </div>
                            <DrawerDescription className='text-sm text-gray-600 my-1'>Found {searchData.length} {searchData.length > 1 ? 'properties' : 'property'} for you</DrawerDescription>
                        </div>
                        <div className='mainDrawerContent border-t-1 border-b-1 border-t-gray-200 border-b-gray-200 overflow-auto h-[60vh] grid grid-cols-2 md:grid-cols-7 gap-3 py-5'>
                            {searchData.map(function (search) {
                                return (
                                    <PropertyCard property={search} key={search.propertyid} />
                                )
                            })}
                        </div>
                    </div>
                </DrawerContent>
            </DrawerPortal>
        </Drawer> 
    );
}

export default DrawerBusinessDetail;
