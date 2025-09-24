import YardButton from "../common/YardButton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerHandle, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "../common/YardDrawer";
import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchAllProperties from "../../features/properties/services/fetchAllProperties";
import PropertyCard from "./propertyCard";

function DrawerRentDetail({rentInputLocation, rentProperty, rentPrice}) {
    const [searchData, setSearchData] = useState([]);
    const queryClient = useQueryClient();

    useEffect(function () {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.alldata() });
    }, [queryClient]);

    const { data: allPropertiesData } = useQuery({
        queryKey: queryKeys.properties.alldata(),
        queryFn: fetchAllProperties,
    });

    function handleFetchRentProperties() {
        let values = {
            location: rentInputLocation.current.value,
            propertyCategory: rentProperty.current.getValue()[0]?.value || '',
            price: rentPrice.current.getValue()[0]?.value || '',
        }

        if (!Array.isArray(allPropertiesData) || allPropertiesData.length === 0) {
            setSearchData([]);
            return;
        }

        const searchResult = allPropertiesData.filter((p) => {
            const matchesLocation = values.location === '' ? true : (p.city?.toLowerCase()?.includes(values.location.toLowerCase()) || false) || (p.address?.toLowerCase()?.includes(values.location.toLowerCase()) || false) || (p.neighbourhood?.toLowerCase()?.includes(values.location.toLowerCase()) || false);
            const matchesCategory = values.propertyCategory === '' ? true : p.propertycategoryname.toLowerCase().includes(values.propertyCategory.toLowerCase());
            const matchesType = p.propertytypename.toLowerCase() === 'rent';
            let matchesPrice = true;
            if (values.price != '') {
                if (Array.isArray(values.price) && typeof values.price[0] === 'number' && typeof values.price[1] === 'number') {
                    matchesPrice = p.propertyprice >= values.price[0] && p.propertyprice <= values.price[1];
                } else if(Array.isArray(values.price) && typeof values.price[0] === 'string' && typeof values.price[1] === 'number') {
                    matchesPrice = values.price[0] === '<' ? p.propertyprice < values.price[1] : p.propertyprice > values.price[1];
                } else if(typeof values.price === 'number') {
                    matchesPrice = p.propertyprice === values.price;
                } else {
                    matchesPrice = false;
                }
            }
            return matchesLocation && matchesCategory && matchesType && matchesPrice;
        });
        setSearchData(searchResult);
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <YardButton onClick={handleFetchRentProperties} className='grid grid-cols place-items-center space-between bg-green-500 w-full rounded-lg my-5 h-12 overflow-hidden button-glow'>
                    <div className='flex gap-2 text-white'>
                        <span><MagnifyingGlassIcon className='size-6'/></span>
                        <span>Find Properties</span>
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
                        <div className='mainDrawerContent border-t-1 border-b-1 border-t-gray-200 border-b-gray-200 overflow-auto h-[70dvh] grid grid-cols-2 md:grid-cols-7 gap-3 py-5'>
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

export default DrawerRentDetail;
