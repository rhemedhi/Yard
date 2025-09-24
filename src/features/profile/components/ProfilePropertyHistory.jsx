import { TabsContent } from "@radix-ui/react-tabs";
import { UseUser } from "../../../context/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchPropertyViewInfo from "../../properties/services/fetchPropertyViewInfo";
import PropertyCard from "../../../components/ui/propertyCard";
import SmallLoader from "../../../components/common/SmallLoader";
import { useEffect, useState } from "react";
import YardButton from "../../../components/common/YardButton";
import clearProfileHistory from "../services/clearProfileHistory";
import toast from "react-hot-toast";

function ProfilePropertyHistory() {
    const { currentUser } = UseUser();
    const userId = currentUser.id;
    const queryClient = useQueryClient();
    const [clearLoading, setClearLoading] = useState(false);

    const { isLoading, isError, data: propertyviewinfodata, error } = useQuery({
        queryKey: queryKeys.properties.propertyview(userId),
        queryFn: () => fetchPropertyViewInfo(userId),
        enabled: !!userId,
    });

    useEffect(function () {
        queryClient.invalidateQueries({
            queryKey: queryKeys.properties.propertyview(userId)
        })
    }, [queryClient, userId]);

    if (isLoading) {
        return (
            <div><SmallLoader /></div>
        )
    }

    if (isError) {
        return (
            <div>Unable to fetch property views, refresh page: {error}</div>
        )
    }

    if (!propertyviewinfodata && !Array.isArray(propertyviewinfodata) && propertyviewinfodata.length === 0) {
        return <div>You have not viewed any property yet</div>;
    }

    async function handleClearProfileHistory() {
        try {
            setClearLoading(true);
            const result = await clearProfileHistory(userId);

            if (result.success) {
                toast.success('History cleared successfully');
                queryClient.invalidateQueries(queryKeys.properties.propertyview(userId));
            } else {
                toast.error(`An error occurred while clearing history, kindly refresh page and try again`);
            }
        } catch (error) {
            console.error(error);
            toast.error('An error occurred while clearing history, kindly refresh page and try again');
        } finally {
            setClearLoading(false);
        }
    }


    return (
        <>
            <TabsContent value="history">
                {propertyviewinfodata.length === 0 ? 
                    <div className='text-center text-xs md:text-lg'>You have not viewed any properties yet</div> 
                    :
                    <div>
                        <div className='flex justify-between items-center py-2'>
                            <div>
                                <h1 className='text-2xl'>Viewing History</h1>
                                <p className='text-sm text-gray-600'>Properties you've viewed recently</p> 
                            </div>
                            {propertyviewinfodata.length > 0 && 
                                <div>
                                    <YardButton onClick={handleClearProfileHistory} className={`p-1 rounded-lg text-sm bg-gray-200 dark:bg-[#212121] hover:scale-105 transition-all duration-300`}>{clearLoading ? <SmallLoader /> : 'Clear History'}</YardButton>
                                </div>
                            }
                        </div>
                        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-2'>
                            {propertyviewinfodata.length === 0 && <div>You have not viewed any property yet</div>}
                            {propertyviewinfodata.map(function (propViewed) {
                                return (
                                    <PropertyCard property={propViewed} key={propViewed.propertyid} />
                                )
                            })}
                        </div>
                    </div>
                }
            </TabsContent>
        </>
    );
}

export default ProfilePropertyHistory;