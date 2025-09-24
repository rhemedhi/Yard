import { Link, useParams } from "react-router-dom";
import Header from "../components/ui/Header";
import MobileNavigation from "../components/layouts/MobileNavigation";
import Footer from "../components/ui/Footer";
import UseIsMobile from "../hooks/UseIsMobile";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { queryKeys } from "../lib/queryKeys";
import fetchAllProperties from "../features/properties/services/fetchAllProperties";
import PropertyLoader from "../features/properties/components/PropertyLoader";
import { CalendarDaysIcon, CalendarIcon, CheckBadgeIcon, MapPinIcon, PhoneIcon, ShareIcon } from "@heroicons/react/24/outline";
import GetUser from "../services/GetUser";
import { Mail, MessageSquare } from "lucide-react";
import SimilarProperties from "../components/layouts/SimilarProperties";
import { UseUser } from "../context/UserContext";
import { supabase } from "../integrations/supabase/client";
import MoveBack from "../components/ui/MoveBack";

function PropertyPage() {
    const params = useParams();
    const isMobile = UseIsMobile();
    const propertyID = params.propertyId;
    const queryClient = useQueryClient();
    const [userDataInfo, setUserDataInfo] = useState({});
    const { currentUser } = UseUser();
    const UserId = currentUser?.id;
    const [hasChat, setHasChat] = useState(null);
    const [hasChatData, setHasChatData] = useState([]);
    let propertyViewed = useRef(false);

    useEffect(function () {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.alldata() });
    }, [queryClient]);

    const { isLoading, isError, data: allpropertiesdata, error } = useQuery({
        queryKey: queryKeys.properties.alldata(),
        queryFn: fetchAllProperties,
        enabled: !!UserId,
    });

    const [propData] = allpropertiesdata?.filter((p) => p?.propertyid === propertyID) || [];

    useEffect(() => {
        if (propData?.ownerid) {
            (async () => {
                try {
                    const getUser = await GetUser(propData.ownerid);
                    const [getUserObj] = getUser;
                    setUserDataInfo(getUserObj);
                } catch (err) {
                    console.error("Failed to fetch user data:", err);
                }
            })();
        }

        async function fetchChatStatus() {
            try {
                const result = await checkIfHasAMessageWithUser(UserId, propData?.ownerid);
                setHasChat(result?.status);
                setHasChatData(result?.actualData);
            } catch (error) {
                console.error(error);
            }
        }
        fetchChatStatus();

        if (UserId && propertyID && !propertyViewed.current) {
            createUserPropertyView();
            queryClient.invalidateQueries({
                queryKey: queryKeys.properties.propertyview(UserId)
            })
            propertyViewed.current = true;
        }

    }, [propData?.ownerid, UserId, propertyID]);

    if (isLoading) {
        return (
            <PropertyLoader number={2} />
        )
    }

    if (isError) {
        return (
            <div>Error: {error.message}</div>
        )
    }

    if (!Array.isArray(allpropertiesdata)) {
        return <div>Unable to load properties. Please check your internet connection.</div>;
    }

    const filterOutProperty = allpropertiesdata.filter(p => p?.propertyid === propertyID);
    const filterOutSimilarProperties = allpropertiesdata.filter(p => p?.propertyid !== propertyID);

    async function checkIfHasAMessageWithUser(UserId, propertyOwnerId) {
        try {
            if (!UserId || !propertyOwnerId) {
                // console.warn('Missing UserId or PropertyOwnerId');
                return false;
            }
            
            // const { data: HasRec, error: HasError } = await supabase
            //     .from('platformmessages')
            //     .select('*', { count: 'exact', head: true })
            //     .or(`senderid.in.(${UserId},${propertyOwnerId}),recipientid.in.(${UserId},${propertyOwnerId})`);
            const { data: HasRec, error: HasError } = await supabase
                .from('platformmessages')
                .select('*')
                .or(`and(senderid.eq.${UserId},recipientid.eq.${propertyOwnerId}),and(senderid.eq.${propertyOwnerId},recipientid.eq.${UserId})`);
            
            if (HasError) {
                console.error(HasError);
                return false;
            }

            if (HasRec && Array.isArray(HasRec) && HasRec.length > 0) {
                return {status: true, actualData: HasRec};
            }

            // const exists = !!(HasRec?.[0]?.count && HasRec[0].count > 0);
            // return {status: exists, actualData: HasRec};
            
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    function getDeviceInfo() {
        const deviceInfo = {};

        // User Agent and Browser Info
        deviceInfo.userAgent = navigator.userAgent;
        deviceInfo.platform = navigator.platform || 'Unknown'; 
        deviceInfo.language = navigator.language || navigator.userLanguage || 'Unknown'; 
        deviceInfo.browser = {
          name: navigator.appName || 'Unknown',
          version: navigator.appVersion || 'Unknown',
        };
    
        // Screen Information
        deviceInfo.screen = {
          width: window.screen.width,
          height: window.screen.height, 
          colorDepth: window.screen.colorDepth, 
          pixelRatio: window.devicePixelRatio || 1,
          orientation: window.screen.orientation ? window.screen.orientation.type : 'Unknown',
        };
    
        // Hardware Information
        deviceInfo.hardware = {
          cpuCores: navigator.hardwareConcurrency || 'Unknown',
          deviceMemory: navigator.deviceMemory || 'Unknown',
        };
    
        // Device Type Inference
        deviceInfo.isMobile = /Mobi|Android|iPhone|iPad|iPod/.test(navigator.userAgent);
        deviceInfo.isTouchDevice = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
    
        // Media Query for Additional Device Characteristics
        deviceInfo.isHighDensityDisplay = window.matchMedia('(min-resolution: 2dppx)').matches;
    
        // Operating System Detection
        const ua = navigator.userAgent.toLowerCase();
        deviceInfo.os = 'Unknown';
        if (ua.includes('win')) deviceInfo.os = 'Windows';
        else if (ua.includes('mac')) deviceInfo.os = 'macOS';
        else if (ua.includes('linux')) deviceInfo.os = 'Linux';
        else if (ua.includes('android')) deviceInfo.os = 'Android';
        else if (ua.includes('iphone') || ua.includes('ipad')) deviceInfo.os = 'iOS';
    
        // Return the collected information
        return deviceInfo;
    }

    async function createUserPropertyView() {
        try {
            //check if a view already exist
            const { data: existingViews, error: checkError } = await supabase
                .from('propertyviews')
                .select('propertyviewid')
                .eq('userid', UserId)
                .eq('propertyid', propertyID)
                .limit(1);

            if (checkError) {
              console.error('Error checking existing view:', checkError);
              return;
            }
        
            if (existingViews.length > 0) {
              return;
            }

            const deviceInfo = getDeviceInfo();
            const proertyViewsData = {
                userid: UserId,
                propertyid: propertyID,
                deviceinfo: deviceInfo,
            }
            const { error: propertyViewError} = await supabase.from('propertyviews').insert(proertyViewsData);

            if(propertyViewError) {
                console.error(propertyViewError);
                return null;
            }

        } catch (error) {
            console.error(error);
        }
    }

    // console.log(UserId);
    // console.log(propData?.ownerid);
    // console.log(hasChat);
    // console.log(hasChatData);
    // console.log(hasChatData && hasChatData[0]?.conversationid);
    // let deriveConversationId = '123';
    const deriveConversationId = hasChatData && hasChatData[0]?.conversationid;

    return (
        <div>
            <Header />
            <div className='setPageResponsive'>
                <MoveBack />
                {filterOutProperty.map(function (propertyData) {
                    return (
                        <div key={propertyData.propertyid}>
                            {/* Beginning Navigation Links */}
                            <div className='flex gap-2 text-sm'>
                                <Link to='/'><span className='hover:text-green-500 transition-all duration-300'>Home</span><span> /</span></Link>
                                <Link to={`/category/${propertyData.propertycategoryname}`}><span className='hover:text-green-500 transition-all duration-300'>{propertyData.propertycategoryname}</span><span> /</span></Link>
                                <div>{propertyData.propertydescription}</div>
                            </div>

                            {/* Description */}
                            <div className='my-2 text-xl font-bold'>{propertyData.propertydescription}</div>

                            {/* Location */}
                            <div className='flex gap-2 text-gray-600'>
                                <MapPinIcon className='size-5' />
                                <span>{`${propertyData.city}`}</span>
                            </div>

                            {/* Images */}
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mt-10'>
                                {propertyData.imageurls.slice(0, 5).map((url, i) => (
                                    i === 0 ? 
                                    (
                                        <div key={i} className='rounded-lg col-start-1 row-start-1 row-end-3 h-104'>
                                            <img src={url} alt={url.split('/').pop()} loading="lazy" className='rounded-xl w-full h-full object-cover cursor-pointer hover:scale-103 transition-all duration-500' />
                                        </div> 
                                    ) 
                                    : 
                                    (
                                        i === 1 && 
                                        (
                                            <div key='nested grid' className='grid grid-cols-1 md:grid-cols-2 gap-4 md:col-start-2 md:row-start-1 md:row-end-3'>
                                                {propertyData.imageurls.slice(1, 5).map((url, j) => (
                                                    <div key={j} className='rounded-lg h-50'>
                                                        <img src={url} alt={url.split('/').pop()} loading="lazy" className='rounded-xl w-full h-full object-cover cursor-pointer hover:scale-103 transition-all duration-500' />
                                                    </div>
                                                ))}
                                            </div> 
                                        )
                                    ) 
                                ))} 
                            </div> 

                            {/* Property Information Details */} 
                            <div className='grid grid-cols-1 md:grid-cols-3 gap-6 my-10'>
                                <div className='md:col-start-1 md:col-end-3 space-y-6'>

                                    {/* property detail */}
                                    <div className='bg-gray-100 dark:bg-[#202020] p-6 rounded-xl'>
                                        <div className='flex justify-between'>
                                            <div className='text-xl font-semibold'>Details</div>
                                            <div className='bg-green-700 rounded-xl p-2 text-xs hover:bg-green-600 cursor-pointer'>{propertyData.propertycategorytitle}</div>
                                        </div>

                                        <div className='grid grid-cols-3 my-5'>
                                            <div>
                                                <p className='text-gray-600'>Bedrooms</p>
                                                <p className='font-bold'>{propertyData.bedrooms}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-600'>Bathrooms</p>
                                                <p className='font-bold'>{propertyData.bathrooms}</p>
                                            </div>
                                            <div>
                                                <p className='text-gray-600'>Area</p>
                                                <p className='font-bold'>{propertyData.areasquare} m²</p>
                                            </div>
                                        </div>

                                        <div className='my-7'>
                                            <p>
                                                {propertyData.propertydescription}
                                            </p>
                                        </div>

                                        <div className='my-5'>
                                            <div className='font-semibold text-xl mb-2'>Amenities</div>
                                            <div className='grid grid-cols-2'>
                                                {propertyData.amenitydata.slice(0, 10).map(function (amenity) {
                                                    return (
                                                        <div className='flex items-center gap-1' key={amenity}>
                                                            <span><CheckBadgeIcon className='size-4 text-green-500' /></span>
                                                            <span className='truncate'>{amenity}</span>
                                                        </div>
                                                    )
                                                })}
                                                {propertyData.amenitydata.length > 10 && <div className='my-2 bg-green-700 hover:bg-green-600 p-2 w-45 text-center cursor-pointer rounded-xl text-sm'>Show all {propertyData.amenitydata.length} amenities</div>}
                                            </div>
                                        </div>

                                    </div>

                                    {/* property location */}
                                    <div className='bg-gray-100 dark:bg-[#202020] p-3 rounded-xl'>
                                        <div className='text-xl font-bold'>Location</div>
                                        <div className='bg-gray-700 h-80 my-2 mt-5'>hey</div>
                                    </div>
                                </div>

                                {/* property contact info */}
                                <div> 
                                    <div className='bg-gray-100 dark:bg-[#202020] p-6 rounded-xl sticky top-20'>
                                        <div>
                                            <span>{propertyData.currency.toUpperCase()} </span>
                                            <span>{propertyData.propertyprice}</span>
                                            <span className='text-xs text-gray-400'> /{propertyData.rentalperiod}</span>
                                        </div>
                                        <div className='my-3'>
                                            <hr className='text-gray-600' />
                                        </div>
                                        <div className='my-5'>
                                            {UserId && 
                                            <>
                                                <p className='my-2'>Contact</p>
                                                <p className='my-2 text-sm'>{userDataInfo.profilename}</p>
                                                <p className='my-2 flex flex-col gap-2 items-center'>
                                                    <a href={`tel:${userDataInfo.phonenumber}`} className='text-green-700 underline hover:text-green-500 flex gap-2 items-center w-full'>
                                                        <span><PhoneIcon className='size-4' /></span>
                                                        <span>{userDataInfo.phonenumber}</span>
                                                    </a>
                                                    <a href={`mailto:${userDataInfo.email}`} className='text-green-700 underline hover:text-green-500 flex gap-2 items-center w-full'>
                                                        <span><Mail size='17' /></span>
                                                        {userDataInfo.email}
                                                    </a>
                                                </p>
                                                <div className='my-3'>
                                                    <hr className='text-gray-600' />
                                                </div>
                                                <div className='space-y-2'>
                                                    <Link to={`/messages/${hasChat ? deriveConversationId : self.crypto.randomUUID()}${!hasChat ? `?to=${propData?.ownerid}` : ''}`}>
                                                        <div className='flex gap-2 bg-green-700 p-2 rounded-xl cursor-pointer hover:bg-green-500 justify-center items-center my-2'>
                                                            <span><MessageSquare className='size-4' /></span>
                                                            <span>Chat Host</span>
                                                        </div>
                                                    </Link>
                                                    <div className='flex gap-2 bg-green-700 p-2 rounded-xl cursor-pointer hover:bg-green-500 justify-center items-center'>
                                                        <span><CalendarIcon className='size-4' /></span>
                                                        <span>Request Viewing</span>
                                                    </div>
                                                    <div className='flex gap-2 bg-green-700 p-2 rounded-xl cursor-pointer hover:bg-green-500 justify-center items-center'>
                                                        <span><ShareIcon className='size-4' /></span>
                                                        <span>Share</span>
                                                    </div>
                                                </div>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Similar Properties */}
                            <div>
                                <SimilarProperties filterOutSimilarProperties={filterOutSimilarProperties} similarPropertyCategoryName={propertyData.propertycategoryname} />
                            </div>
                        </div>
                    )
                })}
            </div>
           {isMobile ? <MobileNavigation /> : <Footer />}
        </div>
    );
}

export default PropertyPage;
