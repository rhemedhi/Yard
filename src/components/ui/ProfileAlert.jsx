import { Link } from 'react-router-dom';
import { ProfileAlertList } from '../../data/ProfileAlertList';

function ProfileAlert() {
    return (
        <>
            <div>
                <div className='bg-red-500 h-12 w-12 rounded-full cursor-pointer group relative'>
                    <img src="src/assets/yard_house.webp" alt="logo" />
                    <div className='opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-[110%] left-[-200%] bg-gray-50 p-4 rounded-lg transition-all duration-500'>
                        <ul className='space-y-3'>
                            {ProfileAlertList.map(function (alList) {
                                return (
                                    <div key={alList.name} className='hover:text-green-600 transition-all duration-500'>
                                        <Link to={alList.link} className='flex gap-2 items-center'>
                                            <span>{alList.icon}</span>
                                            <li>{alList.name}</li>
                                        </Link>
                                    </div>
                                )
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProfileAlert;