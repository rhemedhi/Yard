import { Link } from 'react-router-dom';
import { ExploreList } from '../../data/ExploreList';

function Explore() {
    return (
        <>
            <div className='group relative cursor-pointer hidden md:block'>
                <Link to='/search'><span className='hover:text-green-600 animated-underline'>Explore</span></Link>
                {/* <div className=' dark:border-1 dark:border-[#202020] dark:bg-[#171717] opacity-0 invisible group-hover:opacity-100 group-hover:visible absolute top-[130%] bg-gray-50 p-4 rounded-lg transition-all duration-500'>
                    <ul className='space-y-3'>
                        {ExploreList.map(function (list) {
                            return (
                                <div key={list.name} className='hover:text-green-600 transition-all duration-500'>
                                    <Link to={list.link} className='flex gap-2'>
                                        <span>{list.icon}</span>
                                        <li>{list.name}</li>
                                    </Link>
                                </div>
                            )
                        })}
                    </ul>
                </div> */}
            </div>
        </>
    );
}

export default Explore;
