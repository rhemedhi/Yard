import { Search } from "lucide-react";
import { NavLink } from 'react-router-dom';
import YardInput from '../common/YardInput';
import UseIsMobile from '../../hooks/UseIsMobile';

function NavSearch() {
    const isMobile = UseIsMobile();

    return (
        <>
            <div className='hidden md:flex'>
                <YardInput 
                    iconElement={<Search color='#868e96' size={17}/>}
                    placeholder='Search for properties...'
                    inputWrapperClassName='border-1 border-gray-100 w-55 focus-within:w-70 md:w-80 md:focus-within:w-100'
                />
            </div>
            {isMobile && <div className='md:hidden font-bold text-3xl font-[rancho]'>yard</div>}
        </>
    );
}

export default NavSearch;