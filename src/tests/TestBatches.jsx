import { Search } from "lucide-react";
import { Link } from "react-router-dom";
import OutsideClickHandler from "react-outside-click-handler";
import YardInput from "../common/YardInput";
import UseIsMobile from "../../hooks/UseIsMobile";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../lib/queryKeys";
import fetchAllProperties from "../../features/properties/services/fetchAllProperties";
import SmallLoader from "../common/SmallLoader";

// Utility function to delay execution
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Custom query function to fetch properties in batches
const fetchPropertiesInBatches = async () => {
  const batchSize = 100; // Number of records per batch
  const delayMs = 5000; // 5-second delay between batches
  let offset = 0;
  let allProperties = [];
  let hasMore = true;

  while (hasMore) {
    const response = await fetchAllProperties({ offset, limit: batchSize });
    const { properties, hasMore: moreAvailable } = response; // Adjust based on your API response
    allProperties = [...allProperties, ...properties];
    hasMore = moreAvailable; // Update based on API response (e.g., hasMore or total count)
    offset += batchSize;

    if (hasMore) {
      await delay(delayMs); // Wait 5 seconds before fetching the next batch
    }
  }

  return allProperties;
};

function NavSearch() {
  const isMobile = UseIsMobile();
  const [searchQuery, setSearchQuery] = useState("");

  const [debounceSearchQuery] = useDebounce(searchQuery, 500);

  const { isLoading, data: allPropertiesData } = useQuery({
    queryKey: queryKeys.properties.alldata(),
    queryFn: fetchPropertiesInBatches,
  });

  // Handle empty or undefined data
  if (!allPropertiesData || allPropertiesData?.length === 0) {
    return <div>No property names found</div>;
  }

  const filteredData = allPropertiesData?.filter((data) =>
    data.propertytitle.toLowerCase().includes(debounceSearchQuery.toLowerCase())
  );

  // Clear search query to hide search results
  const handleHideSearchResults = () => {
    setSearchQuery("");
  };

  return (
    <>
      <div className="hidden md:flex flex-col relative">
        <YardInput
          iconElement={<Search color="#868e96" size={17} />}
          placeholder="Search for properties..."
          inputWrapperClassName="dark:border-1 dark:border-[#202020] border-1 border-gray-100 w-55 focus-within:w-70 md:w-80 md:focus-within:w-100"
          value={searchQuery}
          onValueChange={setSearchQuery}
        />
        <div className="absolute top-16">
          {searchQuery && (
            <OutsideClickHandler onOutsideClick={handleHideSearchResults}>
              <div
                className="navSearchResult border-1 border-gray-100 dark:border-[#212121] p-2 rounded-lg w-100 z-20 bg-gray-100 dark:bg-[#212121] space-y-2"
              >
                {isLoading && <SmallLoader />}
                {filteredData.length === 0 && (
                  <div className="p-2">No properties found ...</div>
                )}
                {filteredData.map((fltData) => (
                  <div
                    key={fltData.propertyid}
                    className="border-b-1 border-b-gray-400 dark:border-b-gray-800 p-3"
                  >
                    <Link
                      onClick={handleHideSearchResults}
                      to={`/property/${fltData.propertyid}`}
                      className="block"
                    >
                      {fltData.propertytitle}
                    </Link>
                  </div>
                ))}
              </div>
            </OutsideClickHandler>
          )}
        </div>
      </div>
      {isMobile && (
        <div className="md:hidden font-bold text-3xl font-[rancho]">yard</div>
      )}
    </>
  );
}

export default NavSearch;