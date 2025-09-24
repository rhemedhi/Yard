import { TabsContent } from '@radix-ui/react-tabs';
import YardInput from '../common/YardInput';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import YardSelect from '../common/YardSelect';
import UseIsMobile from '../../hooks/UseIsMobile';
import { PropertyCategoryList } from '../../data/PropertyCategoryList';
import { priceRangeList } from '../../data/priceRangeList';
import DrawerRentDetail from './DrawerRentDetail';
import { useEffect, useRef } from 'react';

function HeroRentFilterDetail() {
  let rentInputLocation = useRef(null),
    rentProperty = useRef(null),
    rentPrice = useRef(null);
    const isMobile = UseIsMobile();

  useEffect(function () {
    rentInputLocation.current.focus();
  }, []);

  return (
    <>
      {/* Rent Filter Detail */}
      <TabsContent value='rent'>
        <div className='rentFilters flex flex-col md:flex-row gap-2'>
          <YardInput
            iconElement={<MapPinIcon className='size-6' />}
            placeholder='Location...'
            id='rentLocation'
            name='rentLocation'
            className={`${isMobile && 'w-full'}`}
            ref={rentInputLocation}
          />
          <YardSelect
            iconElement={<BuildingOfficeIcon className='size-6' />}
            id='rentSelectProperty'
            name='rentSelectProperty'
            placeholder={`${isMobile ? 'Select Properties' : 'Properties'}`}
            className='mt-2'
            ref={rentProperty}
            optionList={PropertyCategoryList}
          />
          <YardSelect
            iconElement={<WalletIcon className='size-6' />}
            id='rentSelectPrice'
            name='rentSelectPrice'
            placeholder='Price Range'
            className='mt-2'
            ref={rentPrice}
            optionList={priceRangeList}
          />
        </div>
        <div>
          <DrawerRentDetail
            rentInputLocation={rentInputLocation}
            rentProperty={rentProperty}
            rentPrice={rentPrice}
          />
        </div>
      </TabsContent>
    </>
  );
}

export default HeroRentFilterDetail;
