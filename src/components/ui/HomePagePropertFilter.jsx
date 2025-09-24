import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import HeroRentFilterDetail from "./HeroRentFilterDetail";
import HeroBuyFilterDetail from "./HeroBuyFilterDetail";
import HeroBusinessFilterDetail from "./HeroBusinessFilterDetail";
import HeroShortStaysFilterDetail from "./HeroShortStaysFilterDetail";
import { PropertyTypeList } from "../../data/propertyTypeList";

function HomePagePropertFilter() {

    return (
        <div className='dark:bg-[#171717] dark:text-gray-50 dark:border-1 dark:border-[#202020] rounded-2xl shadow-2xl p-2 mt-5 bg-gray-100'>
            <div>
                <Tabs defaultValue="rent" className="text-gray-600">

                    {/* Tabs List Detail */}
                    <TabsList className="dark:bg-[#202020] dark:text-white bg-gray-200 rounded-xl grid grid-cols-4 items-center justify-center h-10 mb-2">
                        {PropertyTypeList.map(function (propType, index) {
                            return (
                                <TabsTrigger key={index} value={propType.value} className={`dark:data-[state=active]:bg-[#292929] rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-300 ${index === 0 ? 'ml-1' : index === PropertyTypeList.length - 1 && 'mr-1'}`}>{propType.label}</TabsTrigger>
                            )
                        })}
                    </TabsList>
                    
                    {/* Tab Content Filter Detail */}
                    <HeroRentFilterDetail />
                    <HeroBuyFilterDetail />
                    <HeroBusinessFilterDetail />
                    <HeroShortStaysFilterDetail />
                    
                </Tabs>
            </div>
        </div>
    );
}

export default HomePagePropertFilter;
