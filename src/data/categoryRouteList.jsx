import { BriefcaseIcon, BuildingLibraryIcon, BuildingOffice2Icon, BuildingOfficeIcon, BuildingStorefrontIcon, GlobeEuropeAfricaIcon, HomeModernIcon } from "@heroicons/react/24/outline";

export const categoryRouteList = [
    {
        "name": "Houses",
        "icon": <HomeModernIcon className='size-6' />,
        "link": '/category/houses'
    },
    {
        "name": "Apartments",
        "icon": <BuildingOfficeIcon className='size-6' />,
        "link": '/category/apartments'
    },
    {
        "name": "Hotels",
        "icon": <BuildingOffice2Icon className='size-6'  />,
        "link": '/category/hotels'
    },
    {
        "name": "Villas",
        "icon": <BuildingOffice2Icon className='size-6'  />,
        "link": '/category/villas'
    },
    {
        "name": "Stores",
        "icon": <BuildingStorefrontIcon className='size-6'  />,
        "link": '/category/stores'
    },
    {
        "name": "Lands",
        "icon": <GlobeEuropeAfricaIcon className='size-6'  />,
        "link": '/category/lands'
    },
    {
        "name": "Schools",
        "icon": <BuildingLibraryIcon className='size-6'  />,
        "link": '/category/schools'
    },
    {
        "name": "Jobs",
        "icon": <BriefcaseIcon className='size-6' />,
        "link": '/category/jobs'
    },
]

