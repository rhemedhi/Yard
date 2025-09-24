import YardLink from '../../../components/common/YardLink';
import { ChevronRight } from 'lucide-react';
import FeaturedPropertiesUi from './FeaturedPropertiesUi';

function FeaturedProperties() {
  return (
    <div className='my-10'>
      <div className='transition-all duration-700 w-fit'>
        <YardLink className='' to='/featuredproperties'>
          <div className='flex space-x-2 items-center'>
            <h1 className='text-2xl font-bold'>Featured Properties</h1>
            <span>
              <ChevronRight />
            </span>
          </div>
        </YardLink>
      </div>
      <p className='text-sm text-gray-600'>
        Discover our hand-picked properties across Ghana
      </p>
      <FeaturedPropertiesUi />
    </div>
  );
}

export default FeaturedProperties;
