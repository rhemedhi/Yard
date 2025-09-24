import { TabsContent } from "@radix-ui/react-tabs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchUserListings from "../services/fetchUserListings";
import { UseUser } from "../../../context/UserContext";
import SmallLoader from "../../../components/common/SmallLoader";
import PropertyCard from "../../../components/ui/propertyCard";
import { supabase } from "../../../integrations/supabase/client";
import { useState } from "react";
import toast from "react-hot-toast";

function ProfileMyListings({isAgent}) {

    const [statusLoading, setStatusLoading] = useState(false);
    const [pageUpdated, setPageUpdated] = useState(false);
    const { currentUser } = UseUser();
    const userId = currentUser?.id;
    const queryClient = useQueryClient();

    const { isLoading, isError, data: fetchedUserListingsData, error } = useQuery({
        queryKey: queryKeys.profile.userListings(userId),
        queryFn: () => fetchUserListings(userId),
    });

    // useEffect(function () {
    //     queryClient.invalidateQueries({
    //         queryKey: queryKeys.profile.userListings(userId),
    //     })
    // }, [queryClient, userId]);

    if (isLoading) {
        return (
            <div><SmallLoader /></div>
        )
    }

    if (isError) {
        return (
            <div>An error ocurred, try again: {error}</div>
        )
    }

    if (!fetchedUserListingsData && !Array.isArray(fetchedUserListingsData)) {
        return (
            <div>You haven't listed any property yet</div>
        )
    }

    async function handleChangeUserStatus() {
        try {
            setStatusLoading(true);
            const userStatus = {
                isagent: true,
                usertype: 'Agent'
            }
            const { error: updateUserStatusError } = await supabase.from('profiles').update(userStatus).eq('profileid', userId);
    
            if (updateUserStatusError) {
                console.error(updateUserStatusError);
                return;
            }
            
            const { error: userDataError } = await supabase.auth.updateUser({
                data: { isAgent: true, usertype: 'Agent' }
            })
    
            if (userDataError) {
                console.error(userDataError);
                return;
            }
            setStatusLoading(false);
            setPageUpdated(true);
            queryClient.invalidateQueries({
                queryKey: queryKeys.profile.userListings(userId),
            });
            toast.success('You are now an agent and can list properties');
            
        } catch (error) {
            setStatusLoading(false);
            console.error(error);
            toast.error('An error occured while updating your status to an agent, kindly try again');
        }
    }

    return (
        <>
            <TabsContent value="my_listings" >
                {isAgent || pageUpdated ? 
                    <div className='space-y-2'>
                        <div className='py-2'>
                            <h1 className='text-2xl'>Your Listed Properties</h1>
                            <p className='text-sm text-gray-600'>Properties you have listed</p> 
                        </div>
                       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
                            {fetchedUserListingsData.length === 0 && <div>You haven't listed any property yet...</div>}
                            {fetchedUserListingsData.map(function (listedData) {
                                return (
                                    <PropertyCard property={listedData} key={listedData.propertyid} />
                                )
                            })}
                       </div>
                    </div>
                : 
                    <div className='flex justify-center items-center '>
                        <div className='space-y-2'>
                            <p className='text-xs md:text-lg'>You need to be a property agent to list properties.</p>
                            <div onClick={handleChangeUserStatus} className='text-center text-sm w-fit m-[0px_auto] cursor-pointer bg-gray-200 dark:bg-[#202020] hover:bg-green-600 hover:scale-105 py-2 px-3 rounded-2xl transition-all duration-500'>{statusLoading ? <SmallLoader /> : `Become an Agent`}</div>
                        </div>
                    </div>
                }
            </TabsContent>
        </>
    );
}

export default ProfileMyListings;