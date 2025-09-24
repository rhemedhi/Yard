import { MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/24/outline";
import YardButton from "../common/YardButton";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerOverlay, DrawerPortal, DrawerTitle, DrawerTrigger } from "../common/YardDrawer";
import { useEffect, useState } from "react";
import { queryKeys } from "../../lib/queryKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import fetchAllProperties from "../../features/properties/services/fetchAllProperties";
import PropertyCard from "./propertyCard";

function DrawerShortStayDetail({shortInputLocation, range}) {
    const [searchData, setSearchData] = useState([]);
    const queryClient = useQueryClient();

    useEffect(function () {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.alldata() });
    }, [queryClient]);

    const { data: allPropertiesData } = useQuery({
        queryKey: queryKeys.properties.alldata(),
        queryFn: fetchAllProperties,
    });

    function handleFetchShortStayProperties() {
        let shortStayFilterValues = {
            location: shortInputLocation.current.value,
            dateRange: [range[0]?.toLocaleString() || '', range[1]?.toLocaleString() || ''],
        }

        const searchResult = allPropertiesData.filter((p) => {
            const matchesLocation = shortStayFilterValues.location === '' ? true : (p.city?.toLowerCase()?.includes(shortStayFilterValues.location.toLowerCase()) || false) || (p.address?.toLowerCase()?.includes(shortStayFilterValues.location.toLowerCase()) || false) || (p.neighbourhood?.toLowerCase()?.includes(shortStayFilterValues.location.toLowerCase()) || false);
            const matchesType = p.propertytypename.toLowerCase() === 'shortstay';
            // const matchDate = '';
            return matchesLocation && matchesType;
        });
        setSearchData(searchResult);
    }

    return (
        <Drawer>
            <DrawerTrigger>
                <YardButton onClick={handleFetchShortStayProperties} className='grid grid-cols place-items-center space-between bg-green-500 w-full rounded-lg my-5 h-12 button-glow'>
                    <div className='flex gap-2 text-white'>
                        <span><MagnifyingGlassIcon className='size-6'/></span>
                        <span>Find Short Stays</span>
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
                        <div className='mainDrawerContent border-t-1 border-b-1 border-t-gray-200 border-b-gray-200 overflow-auto h-[60vh]'>
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

export default DrawerShortStayDetail;

