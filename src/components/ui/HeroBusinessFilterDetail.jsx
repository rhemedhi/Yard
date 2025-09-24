import { TabsContent } from "@radix-ui/react-tabs";
import YardInput from "../common/YardInput";
import { BriefcaseIcon, MapPinIcon } from "@heroicons/react/24/outline";
import { businessPropertyList } from "../../data/businessPropertyList";
import YardSelect from "../common/YardSelect";
import DrawerBusinessDetail from "./DrawerBusinessDetail";
import { useRef } from "react";
import UseIsMobile from "../../hooks/UseIsMobile";

function HeroBusinessFilterDetail() {
    let businessInputLocation = useRef(null), businessProperty = useRef(null);
    const isMobile = UseIsMobile();

    return (
        <>
            {/* Business Filter Detail */}
            <TabsContent value="business">
                <div className="businessFilters flex flex-col md:flex-row gap-2">
                    <YardInput 
                        iconElement={<MapPinIcon className="size-6" />}
                        placeholder='Business Location...'
                        id='businessLocation'
                        name='businessLocation'
                        className={`${isMobile && 'w-full'}`}
                        ref={businessInputLocation}
                    />
                    <YardSelect 
                        iconElement={<BriefcaseIcon className="size-6"/>}
                        id='businessSelectProperty'
                        name='businessSelectProperty'
                        placeholder='Select Business'
                        className='mt-2'
                        ref={businessProperty}
                        optionList={businessPropertyList}
                    />
                </div>
                <div>
                    <DrawerBusinessDetail businessInputLocation={businessInputLocation} businessProperty={businessProperty} />
                </div>
            </TabsContent>  
        </>
    );
}

export default HeroBusinessFilterDetail;
