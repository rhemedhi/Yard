import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import { useEffect } from "react";
import fetchNewListedProperties from "../services/fetchNewListedProperties.js";
import PropertyCard from "../../../components/ui/propertyCard.jsx";
import PropertyLoader from "./PropertyLoader.jsx";

function NewListedPropertiesUi() {

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.newLists() });
    }, [queryClient]);

    const { isLoading, isError, data: fetchedNewListedProperties, error} = useQuery({
        queryKey: queryKeys.properties.newLists(),
        queryFn: fetchNewListedProperties,
    });

    if (isLoading) {
        return (
            <PropertyLoader number={7} />
        )
    }

    if (isError) {
        return (
            <div>Error: {`${error.message}`}</div>
        )
    }

    if (!Array.isArray(fetchedNewListedProperties)) {
        return <div>Unable to load properties. Please check your internet connection.</div>;
    }

    return (
        <div className='mt-5'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-3'>
                {fetchedNewListedProperties.length === 0 && <div>No newly listed Properties...</div>}
                {fetchedNewListedProperties.map(function (newListed) {
                    return (
                        <PropertyCard property={newListed} key={newListed.propertyid} />
                    )
                })}
            </div>
        </div>
    );
}

export default NewListedPropertiesUi;
