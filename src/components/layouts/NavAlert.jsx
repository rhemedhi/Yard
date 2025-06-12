import {Link} from 'react-router-dom';
import Explore from '../ui/Explore';
import ProfileAlert from '../ui/ProfileAlert';
import YardLink from '../common/YardLink';

function NavAlert() {
    return (
        <>
            <div className='flex gap-10 justify-center items-center'>
                <Explore />
                <div className='hidden md:block hover:text-green-600'>
                    <YardLink to='/list'>
                        List Properties 
                    </YardLink>
                </div>
                <ProfileAlert />
            </div>
        </>
    );
}

export default NavAlert;