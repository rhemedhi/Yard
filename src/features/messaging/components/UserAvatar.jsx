import { CameraIcon } from "lucide-react";
import CreatePortalUi from "../../../components/ui/CreatePortalUi";
import { useState } from "react";
import AddProfileImage from "../../profile/components/AddProfileImage";

function UserAvatar({avatarurl, avatarname, userInitials, className, addProfileImage, imageClassName}) {
    const [portalOpen, setPortalOpen] = useState(false);

    return (
        <>
            {portalOpen && <CreatePortalUi children={<AddProfileImage setPortalOpen={setPortalOpen} />} />}
            <div className={`relative flex h-10 w-10 shrink-0 rounded-full border-green-600 border-2 items-center justify-center ${className}`}>
                {avatarurl ? 
                <div>
                    <img src={avatarurl} alt={avatarname} loading="lazy" className={`rounded-full h-9 w-10 ${imageClassName}`} />
                </div> 
                : 
                <div>{userInitials}</div>}
                {addProfileImage && <div onClick={() => setPortalOpen((open) => !open)} className='absolute right-0 bottom-0 cursor-pointer bg-gray-100 dark:bg-[#212121] rounded-full p-1'><CameraIcon size={20} strokeWidth={0.75} /></div>}
            </div>
        </>
        
    );
}

export default UserAvatar;