import YardLink from '../../../components/common/YardLink';
import { ChevronRight } from 'lucide-react';
import NewListedPropertiesUi from './NewListedPropertiesUI';

function NewListedProperties() {
  return (
    <div className='my-10'>
      <div className='transition-all duration-700 w-fit'>
        <YardLink className='' to='/allnewlistedproperties'>
          <div className='flex space-x-2 items-center'>
            <h1 className='text-2xl font-bold'>New Listings</h1>
            <span>
              <ChevronRight />
            </span>
          </div>
        </YardLink>
      </div>
      <p className='text-sm text-gray-600'>
        Be the first to check out these recently added properties
      </p>
      <NewListedPropertiesUi />
    </div>
  );
}

export default NewListedProperties;
