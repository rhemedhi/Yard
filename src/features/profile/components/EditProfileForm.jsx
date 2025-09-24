import { TagIcon, X } from "lucide-react";
import { useForm } from "react-hook-form";
import YardInput from "../../../components/common/YardInput";
import SmallLoader from "../../../components/common/SmallLoader";
import YardButton from "../../../components/common/YardButton";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchUserProfile from "../services/fetchUserProfile";
import { UseUser } from "../../../context/UserContext";
import { useEffect, useState } from "react";
import { supabase } from "../../../integrations/supabase/client";
import toast from "react-hot-toast";

function EditProfileForm({setEditOpen}) {
    const {handleSubmit, formState: { isSubmitting }} = useForm();
    const { currentUser } = UseUser();
    const userId = currentUser?.id;
    const queryClient = useQueryClient();

    const { data: userProfileData } = useQuery({
        queryKey: queryKeys.profile.userProfile(userId),
        queryFn: () => fetchUserProfile(userId),
    })

    const [profileData, setProfileData] = useState({
        profilename: userProfileData?.profilename || '',
        email: userProfileData?.email || '',
        phonenumber: userProfileData?.phonenumber || null,
        bio: userProfileData?.bio || null,
    })

    useEffect(function () {
        queryClient.invalidateQueries({
            queryKey: queryKeys.profile.userProfile(userId),
        })
    }, [queryClient, userId]);

    function handleSetPortalState() {
        setEditOpen((isOpen) => !isOpen);
    }

    function handleStopPropagation(e) {
        e.stopPropagation();
    }

    if (!userProfileData && userProfileData.length === 0) {
        return [];
    }
    
    function handleProfileDataChange(field, value) {
        setProfileData(prevState => ({
            ...prevState, [field]: value
        }));
    }
    
    async function onProfileUpdateSubmit() {
        try {
            const { error: updateProfileDataError } = await supabase.from('profiles').update(profileData).eq('profileid', userId);
    
            if (updateProfileDataError) {
                toast.error('An error occured while updating your profile information, kindly try again');
                console.error(updateProfileDataError);
                return; 
            }

            queryClient.invalidateQueries({
                queryKey: queryKeys.profile.userProfile(userId),
            });
            toast.success('Your profile information has been updated successfully');
            setEditOpen(false);

        } catch (error) {
            toast.error('An error occured while updating your profile information, kindly try again');
            console.error(error);
        }
    }

    return (
        <>
            <div onClick={handleSetPortalState} className='fixed top-0 left-0 w-full h-full z-5 backdrop-blur-xs'>
                <div onClick={(e) => handleStopPropagation(e)} className='my-20 md:mb-5 mx-auto p-2 min-h-120 top-0 left-[42%] m-[0px_auto] w-75 md:w-100 bg-gray-100 dark:bg-[#212121] z-6 rounded-2xl'>
                    <div className='flex justify-between items-center'>
                        <div className='text-lg font-semibold'>Edit your profile Information</div>
                        <div onClick={handleSetPortalState} className='cursor-pointer hover:bg-gray-600 rounded-full p-0.5'><X /></div>
                    </div>
                    <div className='my-5 mt-10 space-y-2'>
                        <form className='' onSubmit={handleSubmit(onProfileUpdateSubmit)}>
                            <YardInput
                                label='Full Name'
                                iconElement={<TagIcon className='size-5' />}
                                placeholder='Enter your profile name'
                                id='profilename'
                                name='profilename'
                                className='my-5'
                                value={profileData?.profilename || ''}
                                onValueChange={(newValue) => handleProfileDataChange('profilename', newValue)}
                                // register={register}
                            />
                            <YardInput
                                label='Email'
                                iconElement={<TagIcon className='size-5' />}
                                placeholder='Enter your email'
                                id='email'
                                name='email'
                                type='email'
                                className='my-5'
                                value={profileData?.email || ''}
                                onValueChange={(newValue) => handleProfileDataChange('email', newValue)}
                                // register={register}
                            />
                            <YardInput
                                label='Phone Number'
                                iconElement={<TagIcon className='size-5' />}
                                placeholder='Enter your phone number'
                                id='phonenumber'
                                name='phonenumber'
                                type='tel'
                                className='my-5'
                                value={profileData?.phonenumber || null}
                                onValueChange={(newValue) => handleProfileDataChange('phonenumber', newValue)}
                                // register={register}
                            />
                            <YardInput
                                label='Bio'
                                iconElement={<TagIcon className='size-5' />}
                                placeholder='Write something nice about yourself'
                                id='bio'
                                name='bio'
                                type='textArea'
                                className='my-5'
                                inputClassName='h-30 p-2'
                                value={profileData?.bio || null}
                                onValueChange={(newValue) => handleProfileDataChange('bio', newValue)}
                                // register={register}
                            />

                            <YardButton disabled={isSubmitting} type="submit" id="submit" value='submit final profile data' className={`${isSubmitting && 'cursor-not-allowed'} bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 m-[0px_auto] w-full`}>
                                {isSubmitting ? <SmallLoader /> : 
                                    <>
                                        <span>Save Profile</span>
                                    </> 
                                }
                            </YardButton>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditProfileForm;