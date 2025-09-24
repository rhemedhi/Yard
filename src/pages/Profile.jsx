import { useQuery, useQueryClient } from "@tanstack/react-query";
import UseSignOut from "../context/UserContextLogic/SignOut";
import UserAvatar from "../features/messaging/components/UserAvatar";
import ProfileCard from "../features/profile/components/ProfileCard";
import ProfileTabs from "../features/profile/components/ProfileTabs";
import { queryKeys } from "../lib/queryKeys";
import fetchUserProfile from "../features/profile/services/fetchUserProfile";
import { useEffect } from "react";
import { UseUser } from "../context/UserContext";
import SmallLoader from "../components/common/SmallLoader";
import MoveBack from "../components/ui/MoveBack";

function Profile() {

  const { currentUser } = UseUser();
  const queryClient = useQueryClient();
  const userId = currentUser.id;

  useEffect(function () {
    queryClient.invalidateQueries({
        queryKey: queryKeys.profile.userProfile(userId),
    })
  }, [userId, queryClient]);

  const { isLoading, isError, data: userProfileData, error } = useQuery({
    queryKey: queryKeys.profile.userProfile(userId),
    queryFn: () => fetchUserProfile(userId),
    enabled: !!userId,
  });

  if (isLoading) {
    return (
      <SmallLoader />
    )
  }

  if (isError) {
    return (
      <div>An error occured: {error}</div>
    )
  }

  if (!userProfileData && !Array.isArray(userProfileData)) {
    return (
      <div>No profile data to fetch</div>
    )
  }

  return (
    <div className='profilePageWrapper'>
      <MoveBack />
      <div className='md:flex gap-5 space-y-5'>
        <ProfileCard userProfileData={userProfileData} />
        <ProfileTabs userProfileData={userProfileData} />
      </div>
    </div>
  );
}

export default Profile;
