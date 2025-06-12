import NavLogo from '../layouts/NavLogo';
import NavSearch from '../layouts/NavSearch';
import NavAlert from '../layouts/NavAlert';

function Header() {

    return (
        <nav className='flex items-center justify-between h-16 mx-auto px-3 md:px-16 border-b-1 border-b-gray-100 fixed top-0 bg-white w-full z-999'>
            <NavLogo />
            <NavSearch />
            <NavAlert />
        </nav>
    );
}

export default Header;