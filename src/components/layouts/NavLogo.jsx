import { House } from "lucide-react";
import { NavLink} from 'react-router-dom';

function NavLogo() {
    return (
        <>
            <div className={`w-fit`}>
                <NavLink to='/' className='relative'>
                    {/* Replace with real logo */}
                    <img src='/src/assets/yard_house.webp' alt='App Logo' className='w-10 h-10' />
                    {/* <House className='cursor-pointer bg-green-600 rounded-lg p-2' size={45} color='white'/> */}
                </NavLink>
            </div>
        </>
    );
}

export default NavLogo;