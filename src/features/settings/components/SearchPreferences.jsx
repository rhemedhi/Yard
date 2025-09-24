import { Badge, BadgeCheck, DollarSign, HouseIcon, MapPin, Settings, X } from "lucide-react";
import YardInput from "../../../components/common/YardInput";
import YardButton from "../../../components/common/YardButton";
import { PropertyFormCategoryList } from "../../../data/PropertyFormCategoryList";
import { useEffect, useState } from "react";
import SmallLoader from "../../../components/common/SmallLoader";
import toast from "react-hot-toast";
import saveSearchPreferences from "../services/saveSearchPreferences";
import { UseUser } from "../../../context/UserContext";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchUserPreferences from "../services/fetchUserPreferences";

function SearchPreferences() {
    const { currentUser } = UseUser();
    const userId = currentUser?.id;

    const { data: userPreferencesDataInfo } = useQuery({
        queryKey: queryKeys.settings.userSetting(userId),
        queryFn: () => fetchUserPreferences(userId),
        enabled: !!userId,
    });

    useEffect(() => {
        if (userPreferencesDataInfo) {
            setPreferedLocationData(userPreferencesDataInfo.preferredlocations || []);
            setPriceValue({
                minVal: userPreferencesDataInfo.pricerangemin || "",
                maxVal: userPreferencesDataInfo.pricerangemax || "",
            });
            setPreferedProperty(userPreferencesDataInfo.preferredpropertytypes || []);
        }
    }, [userPreferencesDataInfo]);

    const [preferedLocationValue, setPreferedLocationValue] = useState('');
    const [preferedLocationData, setPreferedLocationData] = useState([]);
    const [priceValue, setPriceValue] = useState({
        minVal: '',
        maxVal: ''
    });
    const [preferedProperty, setPreferedProperty] = useState([]);
    const [preferenceSaveLoading, setPreferenceSaveLoading] = useState(false);


    function handleAddLocation() {
        if (!preferedLocationValue.trim()) {
            return;
        }

        setPreferedLocationData(prevData => {
            if (prevData.includes(preferedLocationValue.toLowerCase().trim())) {
                return [...prevData];
            } else {
                return [...prevData, preferedLocationValue];
            }
        });
        setPreferedLocationValue('');
    }

    function handleRemovePreferedLocation(locationToRemove) {
        setPreferedLocationData(prevData => {
            return prevData.filter(location => location !== locationToRemove);
        });
    }

    function handleInputPriceRange(field, val) {
        setPriceValue(prev => ({
           ...prev, [field]: val
        }))
    }

    function handleAddPreferedPropertyType(propValue) {
        setPreferedProperty(prevProp => {
            if (prevProp.includes(propValue)) return prevProp;
            return [...prevProp, propValue];
        })
    }

    function handleRemovePreferedPropertyType(propValue) {
        setPreferedProperty(prevProp => {
            return prevProp.filter(prop => prop !== propValue);
        })
    }

    async function handleSaveSearchPreferences() {
        try {
            setPreferenceSaveLoading(true);
            const updatePreferenceData = {
                preferredlocations: preferedLocationData,
                pricerangemin: priceValue.minVal,
                pricerangemax: priceValue.maxVal,
                preferredpropertytypes: preferedProperty,
                updateddate: new Date(),
            }

            const insertPreferenceData = {
                userid: userId,
                preferredlocations: preferedLocationData,
                pricerangemin: priceValue.minVal,
                pricerangemax: priceValue.maxVal,
                preferredpropertytypes: preferedProperty,
            }

            const response = await saveSearchPreferences(userId, updatePreferenceData, insertPreferenceData);

            if (response.success) {
                const action = response.action === "insert" ? "saved" : "updated";
                toast.success(`Search preferences ${action} successfully`);
            } else {
                toast.error('An error occured while updating your search preferences, kindly try again');
            }

            setPreferenceSaveLoading(false);
        } catch (error) {
            console.error(error);
            setPreferenceSaveLoading(false);
            toast.error('Unable to save search preferences, please try again');
        }
    }

    if (!userPreferencesDataInfo || userPreferencesDataInfo.length === 0) {
        return (
            <div>No user preference and settings exist</div>
        )
    }

    // console.log(userPreferencesDataInfo);
    // console.log(userPreferencesDataInfo?.preferredlocations);
    // console.log(preferedLocationData);
    // console.log(priceValue);
    // console.log(preferedLocationData);
    // console.log(preferedProperty);
    
    return (
        <div className='mt-5 p-5 pb-0 rounded-lg border-1 border-gray-200 dark:border-[#212121] w-full md:w-170 lg:w-200 m-[0px_auto]'>
            <div className='flex gap-2 items-center'>
                <span><Settings /></span>
                <span className='text-xl font-semibold'>Search Preferences</span>
            </div>
            <div className='divide-y-1 divide-gray-200 dark:divide-[#212121] my-9 space-y-5'>
                <div>
                    <div className='flex gap-2 items-center'>
                        <span><MapPin size={15} /></span>
                        <span className='text-md'>Preferred Locations</span>
                    </div>
                    <div className='mt-2 mb-4'>
                        <div className='flex gap-2 items-center'>
                            <YardInput
                                placeholder='Add a location...'
                                className='ml-0 w-full'
                                value={preferedLocationValue}
                                onValueChange={setPreferedLocationValue}
                            />
                            <YardButton onClick={handleAddLocation} className='p-2 rounded-lg mt-2 hover:scale-105 hover:bg-green-400 transition-all duration-500'>Add</YardButton>
                        </div>
                        {preferedLocationData && preferedLocationData.length > 0 && 
                            <div className='flex gap-2 items-center flex-wrap mt-2'>
                                {preferedLocationData.map(function (prefLocData) {
                                    return (
                                        <div key={prefLocData} className='flex gap-2 items-center border-1 border-gray-100 dark:border-[#212121] bg-orange-500 p-1 rounded-xl text-sm'>
                                            <span>{prefLocData}</span>
                                            <span><X size={15} cursor={'pointer'} onClick={() => handleRemovePreferedLocation(prefLocData)} /></span>
                                        </div>
                                    )
                                })}
                            </div>
                        }
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 items-center'>
                        <span><DollarSign size={15} /></span>
                        <span className='text-md'>Price Range</span>
                    </div>
                    <div className='flex gap-4 mt-2 mb-4'>
                        <YardInput
                            placeholder='Minimum Price...'
                            className='ml-0 w-full'
                            value={priceValue.minVal}
                            onValueChange={(newVal) => handleInputPriceRange('minVal', newVal)}
                        />
                        <YardInput
                            placeholder='Maximum Price...'
                            className='ml-0 w-full'
                            value={priceValue.maxVal}
                            onValueChange={(newVal) => handleInputPriceRange('maxVal', newVal)}
                        />
                    </div>
                </div>
                <div>
                    <div className='flex gap-2 items-center'>
                        <span><HouseIcon size={15} /></span>
                        <span className='text-md'>Preferred Property Types</span>
                    </div>
                    <div className='grid grid-cols-2 mt-2 mb-4'>
                        {PropertyFormCategoryList.map(function (propFormCat) {
                            return (
                                <div key={propFormCat.id} className='flex gap-2 items-center'>
                                    {preferedProperty && preferedProperty.includes(propFormCat.value) ? 
                                        <BadgeCheck size={15} cursor={'pointer'} color="green" onClick={() => handleRemovePreferedPropertyType(propFormCat.value)} /> 
                                        : 
                                        <Badge size={15} cursor={'pointer'} onClick={() => handleAddPreferedPropertyType(propFormCat.value)} />
                                    }
                                    <span className=''>{propFormCat.label}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <YardButton onClick={handleSaveSearchPreferences} className='w-full m-[0px_auto] p-2 rounded-lg hover:scale-102 hover:bg-green-400 transition-all duration-500' >{preferenceSaveLoading ? <div className='w-fit m-[0px_auto]'><SmallLoader /></div> : 'Save Search Preferences'}</YardButton>
                </div>
            </div>
        </div>
    );
}

export default SearchPreferences;