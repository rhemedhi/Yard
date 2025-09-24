import { Link } from 'react-router-dom';
import { ProfileAlertList } from '../../data/ProfileAlertList';
import { UseUser } from '../../context/UserContext';
import YardLink from '../common/YardLink';
import UseIsMobile from '../../hooks/UseIsMobile';
import UseSignOut from '../../context/UserContextLogic/SignOut';
import UserAvatar from '../../features/messaging/components/UserAvatar';
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '../../lib/queryKeys';
import fetchUserProfile from '../../features/profile/services/fetchUserProfile';

function ProfileAlert() {
    const {isAuthenticated, currentUser } = UseUser();
    const isMobile = UseIsMobile();
    const userId = currentUser?.id;
    const SignOut = UseSignOut();

    const {data: fetchedUserProfile} = useQuery({
        queryKey: queryKeys.profile.userProfile(userId),
        queryFn: () => fetchUserProfile(userId),
        enabled: !!userId,
    })

    if (!fetchedUserProfile && !Array.isArray(fetchedUserProfile)) {
        return (
            // <div><UserAvatar /></div>
            <YardLink className='animate-pulse' to='/sign-in'>Sign In</YardLink>
        )
    }

    const userInitials = `${fetchedUserProfile?.profilename?.split(' ')[0].substring(0, 1)}${fetchedUserProfile?.profilename?.split(' ')[1].substring(0, 1)}`;

    function handleLogout() {
        SignOut();
    }

    return (
        <>
            <div>
                {!isAuthenticated && !isMobile ? 
                <YardLink className='animate-pulse' to='/sign-in'>Sign In</YardLink>
                : 
                <div className='cursor-pointer group relative'>
                    <UserAvatar 
                        avatarurl={fetchedUserProfile.avatarurl} 
                        avatarname={fetchedUserProfile.profilename} 
                        userInitials={userInitials} 
                        imageClassName={`object-cover`}
                    />
                    {/* <img src="/src/assets/yard_house.webp" alt="logo" /> */}
                    <div className='dark:bg-[#171717] dark:border-1 dark:border-[#202020] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-[110%] left-[-300%] bg-gray-50 p-4 rounded-lg transition-all duration-500'>
                        <ul className='space-y-3'>
                            {ProfileAlertList.map(function (alList) {
                                return (
                                    <div key={alList.name} className='hover:text-green-600 transition-all duration-500'>
                                        {alList.name === 'Sign Out' ? 
                                        <div className='flex gap-2 items-center' onClick={handleLogout}>
                                            <span>{alList.icon}</span>
                                            <li>{alList.name}</li>
                                        </div> 
                                        : 
                                        <Link to={alList.link} className='flex gap-2 items-center'>
                                            <span>{alList.icon}</span>
                                            <li>{alList.name}</li>
                                        </Link>}
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>}
            </div>
        </>
    );
}

export default ProfileAlert;