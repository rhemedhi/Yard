import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "../../../lib/queryKeys";
import fetchFeaturedProperties from "../services/fetchFeaturedProperties.js";
import { useEffect } from "react";
import PropertyCard from "../../../components/ui/propertyCard.jsx";
import PropertyLoader from "./PropertyLoader.jsx";

function FeaturedPropertiesUi() {

    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.invalidateQueries({ queryKey: queryKeys.properties.featured() });
    }, [queryClient]);

    const { isLoading, isError, data: fetchedFeaturedProperties, error} = useQuery({
        queryKey: queryKeys.properties.featured(),
        queryFn: fetchFeaturedProperties,
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

    if (!Array.isArray(fetchedFeaturedProperties)) {
        return <div>Unable to load properties. Please check your internet connection.</div>;
    }

    return (
        <div className='mt-5'>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-7 gap-3'>
                {fetchedFeaturedProperties.length === 0 && <div>No featured Properties...</div>}
                {fetchedFeaturedProperties.map(function (featProps) {
                    return (
                        <PropertyCard property={featProps} key={featProps.propertyid} />
                    )
                })}
            </div>
        </div>
    );
}

export default FeaturedPropertiesUi;
