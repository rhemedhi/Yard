import { NavLink, useLocation } from "react-router-dom";
import { categoryRouteList } from "../../data/categoryRouteList";

function CategoryRoute() {
    const { pathname }  = useLocation();

    return (
        <div className='mt-5'>
            <div className='flex gap-2 overflow-x-auto py-3'>
                {categoryRouteList.map(function (catRouteLst, index) {
                    return (
                        <div key={index}>
                            <NavLink to={catRouteLst.link} className={`catRoute flex flex-col items-center cursor-pointer rounded-2xl py-3 px-3 dark:hover:bg-[#252525] hover:bg-gray-100 hover:text-green-600 transition-all duration-300 ${index === 0 && pathname === '/' && 'text-green-600 dark:bg-[#171717] bg-gray-100'}`}>
                                {catRouteLst.icon}
                                <span className='text-sm'>{catRouteLst.name}</span>
                            </NavLink>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

export default CategoryRoute;

