import { ChatBubbleLeftIcon, HomeModernIcon, MagnifyingGlassIcon, SquaresPlusIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { NavLink } from 'react-router-dom';
import UseIsMobile from "../../hooks/UseIsMobile";


function MobileNavigation() {
    const isMobile = UseIsMobile();

    return (
        isMobile &&
        <div className='md:hidden fixed bottom-0 flex justify-between w-full p-3 bg-white border-t-2 border-t-gray-100'>
            <div>
                <NavLink to='/' className='btnMobiNav text-[#868e96] grid place-items-center'>
                    <HomeModernIcon className='size-6' />
                    <span className='text-sm'>Home</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/search' className='btnMobiNav text-[#868e96] grid place-items-center'>
                    <MagnifyingGlassIcon className='size-6' />
                    <span className='text-sm'>Search</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/list' className='btnMobiNav text-[#868e96] grid place-items-center'>
                    <SquaresPlusIcon className='size-6' />
                    <span className='text-sm'>Post</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/messages' className='btnMobiNav text-[#868e96] grid place-items-center'>
                    <ChatBubbleLeftIcon className='size-6' />
                    <span className='text-sm'>Messages</span>
                </NavLink>
            </div>
            <div>
                <NavLink to='/profile' className='btnMobiNav text-[#868e96] grid place-items-center'>
                    <UserCircleIcon className='size-6' />
                    <span className='text-sm'>Profile</span>
                </NavLink>
            </div>
        </div>
    );
}

export default MobileNavigation;