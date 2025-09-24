import { Tabs, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ProfileTabList } from "../../../data/ProfileTabList";
import ProfileMyListings from "./ProfileMyListings";
import ProfileSavedProperties from "./ProfileSavedProperties";
import ProfilePropertyHistory from "./ProfilePropertyHistory";

function ProfileTabs({userProfileData}) {

    return (
        <div className='dark:bg-[#171717] dark:text-gray-50 dark:border-1 dark:border-[#202020] rounded-2xl shadow-2xl p-2 bg-gray-100 basis-2/3'>
            <Tabs defaultValue="my_listings" >
                <TabsList className="dark:bg-[#202020] dark:text-white bg-gray-200 rounded-xl grid grid-cols-3 items-center justify-center h-10 mb-2">
                    {ProfileTabList.map(function (profileTab, index) {
                        return (
                            <TabsTrigger key={profileTab.id} value={profileTab.value} className={`dark:data-[state=active]:bg-[#292929] rounded-lg data-[state=active]:bg-white h-8 text-sm hover:cursor-pointer whitespace-nowrap transition-all duration-300 ${index === 0 ? 'ml-1' : index === ProfileTabList.length - 1 && 'mr-1'}`}>{profileTab.label}</TabsTrigger>
                        )
                    })}
                </TabsList>

                <ProfileMyListings isAgent={userProfileData.isagent} />
                <ProfileSavedProperties />
                <ProfilePropertyHistory />

            </Tabs>
        </div>
    );
}

export default ProfileTabs;