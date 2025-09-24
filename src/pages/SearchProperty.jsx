import MobileNavigation from '../components/layouts/MobileNavigation.jsx';
import Header from '../components/ui/Header.jsx';
import Footer from '../components/ui/Footer.jsx';
import UseIsMobile from '../hooks/UseIsMobile.js';
import MoveBack from '../components/ui/MoveBack.jsx';
import YardInput from '../components/common/YardInput.jsx';
import { ChevronDown, House, MapPin, Search } from 'lucide-react';
import { PropertyCategoryList } from '../data/PropertyCategoryList.jsx';
import YardButton from '../components/common/YardButton.jsx';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../lib/queryKeys.js';
import fetchAllProperties from '../features/properties/services/fetchAllProperties.js';
import PropertyCard from '../components/ui/propertyCard.jsx';
import YardSelectOwnState from '../components/common/YardSelectOwnState.jsx';

function SearchProperty() {
  const isMobile = UseIsMobile();
  const searchPropertyCategoryRef = useRef();
  const [foundData, setFoundData] = useState([]);
  const [searchClicked, setSearchClicked] = useState(false);

  const [searchValue, setSearchValue] = useState({
    searchLocation: '',
    searchPropertyCategory: searchPropertyCategoryRef?.current?.getValue()[0]?.value || '',
    pricemin: 0,
    pricemax: Infinity,
  });

  const { data: allpropertiesData } = useQuery({
    queryKey: queryKeys.properties.alldata(),
    queryFn: () => fetchAllProperties(),
  });

  if (!allpropertiesData || allpropertiesData.length === 0) {
    return [];
  }

  function handleSearchProperty() {
    if (isMobile) {
      setSearchClicked(true);
    }
    const searchValues = {...searchValue, searchPropertyCategory: searchPropertyCategoryRef?.current?.getValue()[0]?.value};
    const searchResult = allpropertiesData.filter((p) => {
      const matchesLocation = searchValues.searchLocation === '' 
        || (p.city?.toLowerCase()?.includes(searchValues?.searchLocation?.toLowerCase()) || false) 
        || (p.address?.toLowerCase()?.includes(searchValues?.searchLocation?.toLowerCase()) || false) 
        || (p.neighbourhood?.toLowerCase()?.includes(searchValues?.searchLocation?.toLowerCase()) || false);

      const matchesPropertyCategory = (searchValues.searchPropertyCategory === '' || searchValues.searchPropertyCategory === undefined) 
        || (p.propertycategoryname?.toLowerCase()?.includes(searchValues?.searchPropertyCategory?.toLowerCase()) || false);
      
      const rawMin = searchValues.pricemin;
      const rawMax = searchValues.pricemax;
      const pricemin = rawMin === '' || rawMin == null ? 0 : Number(rawMin);
      const pricemax = rawMax === '' || rawMax == null ? Infinity : Number(rawMax);

      const matchesPrices = (searchValues.pricemin === 0 && searchValues.pricemax === 0) 
        || (p.propertyprice >= pricemin && p.propertyprice <= pricemax);
      
      return matchesLocation && matchesPropertyCategory && matchesPrices;
    });
    setFoundData(searchResult);
  }

  function handleClearSearch() {
    setSearchValue({
      searchLocation: '',
      searchPropertyCategory: null, 
      pricemin: 0,
      pricemax: Infinity,
    });
  }

  function handleShowBackSearchInput() {
    setSearchClicked(false);
  }

  return (
    <div className='overflow-x-hidden'>
      <Header />
        <div className='setPageResponsive'>
          <MoveBack />
          <div>
            <div className='text-2xl my-3'>Find Your Perfect Space</div>
            {/* <div className='grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-6'> */}
            <div className='md:flex gap-5 space-y-5'>
              <div className='rounded-lg border-1 border-gray-200 dark:border-[#212121] p-4 basis-1/3'>
                <div className='flex justify-between'>
                  <div className='text-md font-semibold mb-4'>Filter Options</div>
                  {isMobile && searchClicked && <div onClick={handleShowBackSearchInput} className='text-md font-semibold mb-4'><ChevronDown /></div>}
                </div>
                {!searchClicked &&
                <>
                  <YardInput 
                    iconElement={<MapPin />}
                    label='Location'
                    id='searchLocation'
                    name='searchLocation'
                    placeholder='Search location...'
                    className='ml-0 mb-3 w-full'
                    value={searchValue.searchLocation}
                    onValueChange={(newValue) => setSearchValue(prev => {
                      return {...prev, searchLocation: newValue}
                    })}
                  />
                  <div className='mb-3'>
                    <div className='mb-1'>Property Category</div>
                    <YardSelectOwnState 
                      iconElement={<House />}
                      id='searchPropertyCategory'
                      name='searchPropertyCategory'
                      placeholder='Select Property Category'
                      className='w-full'
                      optionList={PropertyCategoryList}
                      value={searchValue.searchPropertyCategory}
                      onChange={(option) => {
                        setSearchValue((prev) => ({
                          ...prev, searchPropertyCategory: option
                        }))
                      }}
                      ref={searchPropertyCategoryRef}
                    />
                  </div>
                  <div className='flex gap-3 ml-0 w-full'>
                    <YardInput 
                      label='Price Min (₵)'
                      placeholder='0'
                      type='number'
                      id='pricemin'
                      name='pricemin'
                      className='ml-0 w-fit'
                      value={searchValue.pricemin}
                      onValueChange={(newValue) => setSearchValue(prev => {
                        return {...prev, pricemin: Number(newValue)}
                      })}
                    />
                    <YardInput 
                      label='Price Max (₵)'
                      placeholder='Any'
                      type='number'
                      id='pricemax'
                      name='pricemax'
                      className='ml-0 w-fit'
                      value={searchValue.pricemax === Infinity ? '' : searchValue.pricemax}
                      onValueChange={(newValue) => setSearchValue(prev => {
                        return {...prev, pricemax: Number(newValue)}
                      })}
                    />
                  </div>
                  <div className='flex gap-3'>
                    <YardButton onClick={handleSearchProperty} className='flex gap-2 w-full items-center justify-center p-2 my-4 rounded-lg basis-2/3 hover:scale-105 hover:bg-green-500 transition-all duration-500'>
                      <span><Search /></span>
                      <span>Search</span>
                    </YardButton>
                    <YardButton onClick={handleClearSearch} className='flex gap-2 w-full items-center justify-center p-2 my-4 rounded-lg basis-1/3 hover:scale-105 hover:bg-green-500 transition-all duration-500'>
                      <span>Clear</span>
                    </YardButton>
                  </div>
                </>
                }
              </div>
              <div className='basis-2/3'>
                <Tabs defaultValue='list'>
                  <div className='flex justify-between items-center'>
                    <div>Search Results ({`${foundData.length} found`})</div>
                    <div>
                      <TabsList className='dark:bg-[#202020] dark:text-white bg-gray-200 rounded-xl flex gap-2 items-center justify-center h-10 mb-2'>
                        <TabsTrigger value='list' className={`dark:data-[state=active]:bg-[#292929] rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-300 ml-1 px-3 py-1`}>List</TabsTrigger>
                        <TabsTrigger value='map' className={`dark:data-[state=active]:bg-[#292929] rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-300 mr-1 px-3 py-1`}>Map</TabsTrigger>
                      </TabsList>
                    </div>
                  </div>
                  <div>
                    <TabsContent value='list'>
                      <div className='overflow-auto h-[70dvh] grid grid-cols-2 md:grid-cols-3 gap-3 py-5'>
                        {foundData.length === 0 && <div>No properties found...</div>}
                        {foundData.map(function (fndData) {
                          return (
                            <PropertyCard property={fndData} key={fndData.propertyid} />
                          )
                        })} 
                      </div>
                    </TabsContent>
                    <TabsContent value='map'>Maps</TabsContent>
                  </div>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

export default SearchProperty;