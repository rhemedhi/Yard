import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import YardInput from "../common/YardInput";
import { CalendarDateRangeIcon, CalendarDaysIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef } from "react";
import YardSelect from "../common/YardSelect";
import { BuildingOfficeIcon } from "@heroicons/react/24/outline";

function HomePagePropertFilter() {

    const rentInputFocus = useRef(null);
    useEffect(function () {
        rentInputFocus.current.focus();
    }, []);

    return (
        <div className='rounded-2xl shadow-2xl p-2 mt-5 bg-gray-100'>
            <div>
                <Tabs defaultValue="rent" className="text-gray-600">

                    {/* Tabs List Detail */}
                    <TabsList className="bg-gray-200 rounded-xl grid grid-cols-4 items-center justify-center h-10">
                        <TabsTrigger value="rent" className="rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-700 ml-1">Rent</TabsTrigger>
                        <TabsTrigger value="buy" className="rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-700 ">Buy</TabsTrigger>
                        <TabsTrigger value="business" className="rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-700 ">Business</TabsTrigger>
                        <TabsTrigger value="shortstay" className="rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-700 mr-1">Short Stay</TabsTrigger>
                    </TabsList>

                    {/* Rent Filter Detail */}
                    <TabsContent value="rent">
                        <div className="rentFilters flex flex-col md:flex-row gap-2">
                            <YardInput 
                                iconElement={<MapPinIcon className="size-6" />}
                                placeholder='Where do you want to go?'
                                id='rentLocation'
                                name='rentLocation'
                                defaultValue='Accra'
                                ref={rentInputFocus}
                            />
                            <YardSelect 
                                iconElementStart={<BuildingOfficeIcon className="size-6"/>}
                                id='rentSelectProperty'
                                name='rentSelectProperty'
                                placeholder='Properties'
                                className='mt-2'
                                // optionList={[{id: 100, name: 'test', value: 'Test'}]}
                            />
                            <YardSelect 
                                iconElementStart={<CalendarDaysIcon className="size-6"/>}
                                id='rentSelectProperty'
                                name='rentSelectProperty'
                                placeholder='Price Range'
                                className='mt-2'
                                // optionList={[{id: 100, name: 'test', value: 'Test'}]}
                            />
                        </div>
                        <div></div>
                    </TabsContent>

                    {/* But Filter Detail */}
                    <TabsContent value="buy">buy</TabsContent>

                    {/* Business Filter Detail */}
                    <TabsContent value="business">business</TabsContent>

                    {/* Short Stay Filter Detail */}
                    <TabsContent value="shortstay">short stay</TabsContent>
                </Tabs>
            </div>
        </div>
    );
}

export default HomePagePropertFilter;