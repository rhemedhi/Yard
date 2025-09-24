import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { UseUser } from "../../../context/UserContext";
import SmallLoader from "../../../components/common/SmallLoader";
import fetchFullPropertyData from "../../properties/services/fetchFullPropertyData";
import PropertyCard from "../../../components/ui/propertyCard";

function ProfileSavedProperties() {
    const { currentUser } = UseUser();
    const userId = currentUser.id;
    const { isLoading, isError, data: savedPropertiesData, error } = useQuery({
        queryKey: queryKeys.properties.savedFullProperties(userId),
        queryFn: () => fetchFullPropertyData(userId),
        enabled: !!userId,
    })

    if (isLoading) {
        return (
            <div><SmallLoader /></div>
        )
    }

    if (isError) {
        return (
            <div>Unable to fetch saved properties, refresh page: {error}</div>
        )
    }

    if (!savedPropertiesData && !Array.isArray(savedPropertiesData) && savedPropertiesData.length === 0) {
        return <div>You have no saved Properties yet</div>;
    }

    // console.log(savedPropertiesData);

    return (
        <>
            <TabsContent value="saved">
                {savedPropertiesData.length === 0 ? 
                    <div className='text-center text-xs md:text-lg'>You have no saved Properties yet</div> 
                    :
                    <div>
                        <div className='py-2'>
                            <h1 className='text-2xl'>Your Saved Properties</h1>
                            <p className='text-sm text-gray-600'>Properties you have saved for later</p> 
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2'>
                            {savedPropertiesData.length === 0 && <div>You have no saved Properties yet...</div>}
                            {savedPropertiesData.map(function (svdpd) {
                                return (
                                    <PropertyCard property={svdpd} key={svdpd.propertyid} />
                                )
                            })}
                        </div>
                    </div>
                }
            </TabsContent>
        </>
    );
}

export default ProfileSavedProperties;