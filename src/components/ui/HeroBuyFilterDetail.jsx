import { TabsContent } from '@radix-ui/react-tabs';
import YardInput from '../common/YardInput';
import {
  BuildingOfficeIcon,
  MapPinIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';
import YardSelect from '../common/YardSelect';
import { PropertyCategoryList } from '../../data/PropertyCategoryList';
import { priceRangeList } from '../../data/priceRangeList';
import DrawerBuyDetail from './DrawerBuyDetail';
import { useRef } from 'react';
import UseIsMobile from '../../hooks/UseIsMobile';

function HeroBuyFilterDetail() {
  let buyInputLocation = useRef(null),
    buyProperty = useRef(null),
    buyPrice = useRef(null);
  
  const isMobile = UseIsMobile();

  return (
    <>
      {/* Buy Filter Detail */}
      <TabsContent value='buy'>
        <div className='buyFilters flex flex-col md:flex-row gap-2'>
          <YardInput
            iconElement={<MapPinIcon className='size-6' />}
            placeholder='Location...'
            id='buyLocation'
            name='buyLocation'
            className={`${isMobile && 'w-full'}`}
            ref={buyInputLocation}
          />
          <YardSelect
            iconElement={<BuildingOfficeIcon className='size-6' />}
            id='buySelectProperty'
            name='buySelectProperty'
            placeholder='Properties'
            className='mt-2'
            ref={buyProperty}
            optionList={PropertyCategoryList}
          />
          <YardSelect
            iconElement={<WalletIcon className='size-6' />}
            id='buySelectPrice'
            name='buySelectPrice'
            placeholder='Price Range'
            className='mt-2'
            ref={buyPrice}
            optionList={priceRangeList}
          />
        </div>
        <div>
          <DrawerBuyDetail
            buyInputLocation={buyInputLocation}
            buyProperty={buyProperty}
            buyPrice={buyPrice}
          />
        </div>
      </TabsContent>
    </>
  );
}

export default HeroBuyFilterDetail;
