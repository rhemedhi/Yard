import { TabsContent } from "@radix-ui/react-tabs";
import YardInput from "../common/YardInput";
import { CalendarDateRangeIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
import DrawerShortStayDetail from "./DrawerShortStayDetail";
import UseIsMobile from "../../hooks/UseIsMobile";

function HeroShortStaysFilterDetail() {

    let shortInputLocation = useRef(null);
    const [range, setRange] = useState([]);
    const isMobile = UseIsMobile();

    function handleRangeChange(range) {
        setRange(range);
    }

    return (
        <>
            <TabsContent value="shortstay">
                <div className="shortStayFilters flex flex-col md:flex-row gap-2">
                    <YardInput 
                        iconElement={<MapPinIcon className="size-6" />}
                        placeholder='Location...'
                        id='shortStayLocation'
                        name='shortStayLocation'
                        className={`${isMobile && 'w-full'}`}
                        ref={shortInputLocation}
                    />
                    <YardInput 
                        iconElement={<CalendarDateRangeIcon className="size-6" />}
                        placeholder='Date Range'
                        id='shortStayDateRange'
                        name='shortStayDateRange'
                        type='dateRange'
                        className={`${isMobile && 'w-full'}`}
                        onValueChange={handleRangeChange}
                        // ref={shortdateRange}
                    />
                </div>
                <div>
                    <DrawerShortStayDetail shortInputLocation={shortInputLocation} range={range} />
                </div>
            </TabsContent>
        </>
    );
}

export default HeroShortStaysFilterDetail;
