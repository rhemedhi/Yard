import { MapPinIcon, Search, StarIcon } from "lucide-react";
import { Link, NavLink } from 'react-router-dom';
import YardInput from '../common/YardInput';
import UseIsMobile from '../../hooks/UseIsMobile';
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchAllProperties from "../../features/properties/services/fetchAllProperties";
import SmallLoader from "../common/SmallLoader";
import OutsideClickHandler from "react-outside-click-handler";

function NavSearch() {
    const isMobile = UseIsMobile();
    const [searchQuery, setSearchQuery] = useState('');
    const [debounceSearchQuery] = useDebounce(searchQuery, 500);

    const { isLoading, data: allpropertiesData } = useQuery({
       queryKey: queryKeys.properties.alldata(),
       queryFn: () => fetchAllProperties(),  
    });

    if (!allpropertiesData && allpropertiesData?.length === 0) {
        return (
            <div>No property names found</div>
        )
    }

    const filteredData = allpropertiesData?.filter(data => {
        return data.propertytitle.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.address.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.city.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.neighbourhood.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.propertycategoryname.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.propertydescription.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.propertystatus.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.propertyprice.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.propertytypename.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.region.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.rentalperiod.toLowerCase().includes(debounceSearchQuery.toLowerCase()) ||
        data.yearbuilt.toLowerCase().includes(debounceSearchQuery.toLowerCase());
    });
   
    function handleNotShowingNavSearchResult() {
        setSearchQuery('');
    }

    return (
        <>
            <div className='hidden md:flex flex-col relative'>
                <YardInput 
                    iconElement={<Search color='#868e96' size={17}/>}
                    placeholder='Search for properties...'
                    inputWrapperClassName='dark:border-1 dark:border-[#202020] border-1 border-gray-100 w-55 focus-within:w-70 md:w-80 md:focus-within:w-100'
                    value={searchQuery}
                    onValueChange={setSearchQuery}
                />
                <div className='absolute top-16'>
                    {searchQuery && 
                        <OutsideClickHandler onOutsideClick={handleNotShowingNavSearchResult} >
                            <div className='navSearchResult border-1 border-gray-100 dark:border-[#212121] p-2 rounded-lg w-100 z-20 bg-gray-100 dark:bg-[#212121] space-y-2'>
                                {isLoading && <SmallLoader />}
                                {filteredData.length === 0 && <div className='p-2'>No properties found ...</div>}
                                {filteredData.slice(0, 5).map(function (fltData) {
                                    return (
                                        <div key={fltData.propertyid} className='border-b-1 border-b-gray-400 dark:border-b-gray-800 p-3 hover:bg-gray-200 dark:hover:bg-[#303030] transition-all duration-300'>
                                            <Link onClick={handleNotShowingNavSearchResult} to={`/property/${fltData.propertyid}`} className='block'>
                                                <div className='flex justify-between items-center'>
                                                    <div>
                                                        <span>{fltData.propertytitle}</span>
                                                        <span className='flex gap-1 items-center text-gray-500 dark:text-gray-600 text-xs'>
                                                            <span><MapPinIcon className='size-4' /></span>
                                                            <span>{fltData.city ?? 'No Location'}</span>
                                                        </span>
                                                    </div>
                                                    <span className='flex gap-1 items-center'>
                                                        <span className='starIcon'><StarIcon className='size-3 fill-yellow-500 stroke-0' /></span>
                                                        <span className='starRating text-yellow-500'>{fltData.rating ?? 0}</span> 
                                                    </span>
                                                </div>
                                            </Link>
                                        </div>
                                    )
                                })}
                            </div>
                        </OutsideClickHandler>
                    }
                </div>
            </div>
            {isMobile && <div className='md:hidden font-bold text-3xl font-[rancho]'>yard</div>}
        </>
    );
}

export default NavSearch;