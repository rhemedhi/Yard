import { X } from "lucide-react";
import UserAvatar from "../../messaging/components/UserAvatar";
import YardButton from "../../../components/common/YardButton";
import InputFileRep from "../../listing/components/InputFileRep";
import { useEffect, useRef, useState } from "react";
import YardInput from "../../../components/common/YardInput";
import { UseUser } from "../../../context/UserContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchUserProfile from "../services/fetchUserProfile";
import { supabase } from "../../../integrations/supabase/client";
import loadImage from "../../../utils/loadImage";
import imageCompression from 'browser-image-compression';
import toast from "react-hot-toast";
import SmallLoader from "../../../components/common/SmallLoader";

function AddProfileImage({setPortalOpen}) {

    const profileInputRef = useRef(null);
    const [imageAdded, setImageAdded] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { currentUser } = UseUser();
    const queryClient = useQueryClient();
    const userId = currentUser?.id;

    const { data: userProfileData } = useQuery({
        queryKey: queryKeys.profile.userProfile(userId),
        queryFn: () => fetchUserProfile(userId),
    })

    useEffect(function () {
        queryClient.invalidateQueries({
            queryKey: queryKeys.profile.userProfile(userId),
        })
    }, [queryClient, userId]);

    function handleSetPortalState() {
        setPortalOpen((isOpen) => !isOpen);
    }

    function handleStopPropagation(e) {
        e.stopPropagation();
    }

    function onChangeOfImages(e) {
        const selectedImg = e.target.files[0];
        if (selectedImg) {
            const createImgEle = document.createElement('img');
            createImgEle.src = URL.createObjectURL(selectedImg);
            createImgEle.alt = selectedImg.name;
            createImgEle.setAttribute('style', 'border-radius: 100%; width: 180px; height: 180px; object-fit: cover;');
            const container = document.querySelector('.addProfilePicCls');
            container.innerHTML = '';   
            container.appendChild(createImgEle); 
            setImageAdded(true);
            setSelectedImage(selectedImg);
        }
    }

    function handleImageAdd() {
        profileInputRef?.current?.click();
    }

    async function handleSaveProfileImage(selectedImage) {
        try {
            setIsLoading(true);
            let MAX_FILE_MB = 1;
            let MAX_DIMENSION = 1200;
            let compressedFile;

            const fileSizeMB = selectedImage.size / 1024 / 1024;
            const img = await loadImage(selectedImage);
            const compressedFileOption = {
                maxSizeMB: MAX_FILE_MB,
                maxWidthOrHeight: MAX_DIMENSION,
                useWebWorker: true, 
            }
        
            if (fileSizeMB <= MAX_FILE_MB && img.width <= MAX_DIMENSION && img.height <= MAX_DIMENSION) {
                compressedFile = selectedImage;
            } else {
                compressedFile = await imageCompression(selectedImage, compressedFileOption);
            }

            const filePath = `profileimages/${self.crypto.randomUUID()}-${compressedFile.name}`;
            const { error: profileImageError } = await supabase.storage.from('profileavatar').upload(filePath, compressedFile);

            if (profileImageError) {
                setIsLoading(false);
                console.warn(profileImageError);
                toast.error('An error ocurred while uploading your profile picture, kindly try again');
                return;
            }

            const { data: publicUrl } = supabase.storage.from("profileavatar").getPublicUrl(filePath);
            const getAvatarUrl = publicUrl.publicUrl;

            const profileUpdate = {
                avatarurl: getAvatarUrl,
            };
            const { error: updateProfileImageError } = await supabase.from('profiles').update(profileUpdate).eq('profileid', userId);

            if (updateProfileImageError) {
                console.warn(updateProfileImageError);
                return;
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.profile.userProfile(userId),
            });

            toast.success('Profile Image updated successfully');
            setIsLoading(false);
            setPortalOpen(false);
        } catch (error) {
            setIsLoading(false);
            console.error(error);
            toast.error('An error ocurred while uploading your profile picture, kindly try again');
        }
    }

    if (!userProfileData) {
        return [];
    }

    const userInitials = `${userProfileData.profilename.split(' ')[0].substring(0, 1)}${userProfileData.profilename.split(' ')[1].substring(0, 1)}`;

    return (
        <div onClick={handleSetPortalState} className='fixed top-0 left-0 w-full h-full z-5 backdrop-blur-xs'>
            <div onClick={(e) => handleStopPropagation(e)} className='my-20 md:mb-5 mx-auto p-2 min-h-120 top-0 left-[42%] m-[0px_auto] w-75 md:w-100 bg-gray-100 dark:bg-[#212121] z-6 rounded-2xl'>
                <div className='flex justify-between items-center'>
                    <div className='text-lg font-semibold'>Yard Account</div>
                    <div onClick={handleSetPortalState} className='cursor-pointer hover:bg-gray-600 rounded-full p-0.5'><X /></div>
                </div>
                <div className='my-5 mt-10 space-y-2'>
                    <h2 className='font-bold text-lg'>Profile picture</h2>
                    <p className='text-sm'>A profile picture enhances your recognition and provides a visual cue to confirm you're signed into your account.</p>
                </div>
                <div className='m-[0px_auto] w-fit my-10'>
                    <UserAvatar className={`w-45 h-45 addProfilePicCls`} imageClassName={`w-45 h-44 object-cover`} avatarurl={userProfileData.avatarurl} avatarname={userProfileData.profilename} userInitials={userInitials}  />
                </div>
                <div className='m-[0px_auto] w-fit mt-10 mb-4'>
                    <YardInput 
                        label='Upload your profile picture'
                        type='file'
                        ref={profileInputRef} 
                        className='hidden my-5'
                        id='profileimages'
                        name='profileimages'
                        onChange={(e) => onChangeOfImages(e)}
                        accept='.jpg, .jpeg, .png, .webp'
                    />
                    <YardButton onClick={handleImageAdd} className={`bg-green-600 rounded-lg p-2`}>{userProfileData.avatarurl ? 'Change Photo' : imageAdded ? 'Change Photo' : 'Add photo'}</YardButton>
                </div>
                {imageAdded && <div className='m-[0px_auto] w-fit'><YardButton disabled={isLoading} onClick={() => handleSaveProfileImage(selectedImage)} className={`bg-green-600 rounded-lg p-2 mb-3`}>
                    {isLoading ? <SmallLoader /> : <span>Save Photo</span>}
                </YardButton></div>}
            </div>
        </div>
    );
}

export default AddProfileImage;