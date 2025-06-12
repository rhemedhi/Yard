import { House } from "lucide-react";
import { NavLink} from 'react-router-dom';

function NavLogo() {
    return (
        <>
            <div className={`w-fit`}>
                <NavLink to='/' className='relative'>
                    {/* Replace with real logo */}
                    <House className='cursor-pointer bg-green-600 rounded-lg p-2' size={45} color='white'/>
                </NavLink>
            </div>
        </>
    );
}

export default NavLogo;