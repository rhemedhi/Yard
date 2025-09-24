import UserAvatar from "../../messaging/components/UserAvatar";
import { EditIcon, LogOutIcon, SettingsIcon } from "lucide-react";
import UseSignOut from "../../../context/UserContextLogic/SignOut";
import { Link } from "react-router-dom";
import { useState } from "react";
import EditProfileForm from "./EditProfileForm";
import CreatePortalUi from "../../../components/ui/CreatePortalUi";

function ProfileCard({userProfileData}) {
    const [editOpen, setEditOpen] = useState(false);
    // const [settingsOpen, setSettingsOpen] = useState(false);
    // const SignOut = UseSignOut();
    const userInitials = `${userProfileData?.profilename?.split(' ')[0].substring(0, 1)}${userProfileData?.profilename?.split(' ')[1].substring(0, 1)}`;

    // function handleLogout() {
    //     SignOut();
    // }

    function handleCreateEditPage() {
        setEditOpen((isEditOpen) => !isEditOpen);
    }

    return (
        <>
            {/* Edit Form */}
            {editOpen && <CreatePortalUi children={<EditProfileForm setEditOpen={setEditOpen} />} />}

            {/* Profile Page */}
            <div className='border-1 dark:border-[#202020] border-gray-200 rounded-lg py-5 px-7 space-y-3 basis-1/3'>
                <div className='w-fit m-[0px_auto]'>
                    {userProfileData && 
                        <UserAvatar className={`w-25 h-25`} imageClassName={`w-25 h-24 object-cover`} avatarurl={userProfileData.avatarurl} avatarname={userProfileData.profilename} userInitials={userInitials} addProfileImage={true}  />
                    }
                </div>
                <div className='my-2 space-y-1'>
                    {userProfileData.profilename && <p className='text-center'>{userProfileData.profilename}</p>}
                    {userProfileData.phonenumber && <p className='text-center'>{userProfileData.phonenumber}</p>}
                    {userProfileData.email && <p className='text-xs text-center'>{userProfileData.email}</p>}
                    {userProfileData.bio && <p className='text-xs text-center bg-gray-200 dark:bg-[#212121] p-2 mb-3 rounded-lg'>{userProfileData.bio}</p>}
                </div>
                <div className='flex gap-2 justify-between items-center'>
                    <div onClick={handleCreateEditPage} className='flex gap-1 justify-center items-center cursor-pointer bg-gray-200 dark:bg-[#202020] hover:bg-green-600 hover:scale-105 p-2 rounded-2xl transition-all duration-500 basis-1/2'>
                        <span><EditIcon size={15} /></span>
                        <span>Edit</span>
                    </div>
                    <Link to='/settings' className='flex gap-1 justify-center items-center cursor-pointer bg-gray-200 dark:bg-[#202020] hover:bg-green-600 hover:scale-105 p-2 rounded-2xl transition-all duration-500 basis-1/2'>
                        <span><SettingsIcon size={15} /></span>
                        <span>Settings</span>
                    </Link>
                </div>
                {/* <div onClick={handleLogout} className='flex gap-1 justify-center items-center cursor-pointer bg-red-500 hover:bg-red-800 hover:scale-105 p-2 rounded-2xl transition-all duration-500'>
                    <span><LogOutIcon size={15} /></span>
                    <span>Sign Out</span>
                </div> */}
            </div>
        </>
    );
}

export default ProfileCard;