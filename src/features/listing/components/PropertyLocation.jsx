import { ArrowPathRoundedSquareIcon, GlobeEuropeAfricaIcon } from "@heroicons/react/24/outline";
import YardInput from "../../../components/common/YardInput";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import YardButton from "../../../components/common/YardButton";
import SmallLoader from "../../../components/common/SmallLoader";
import MoveBack from "../../../components/ui/MoveBack";
import { UseListing } from "../context/PropertyListContext";
import retrieveFormProgressData from "../services/retrieveFormProgressData";
import { UseUser } from "../../../context/UserContext";
import updateFormProgressData from "../services/updateFormProgressData";

function PropertyLocation() {
    const { register, handleSubmit, setFocus, formState: { errors, isSubmitting }} = useForm();
    const navigate = useNavigate();
    const { propertyData, setPropertyData, setFormStep } = UseListing();
    const { currentUser } = UseUser();

    async function onPropertyLocationSubmit(data) {
        try {
            if (data) {
                setPropertyData(prev => {
                    return {...prev, ...data};
                });
                await retrieveFormProgressData(currentUser.id).then(returnData => {
                    updateFormProgressData({ 
                        step: 2, 
                        formdata: JSON.stringify({...propertyData, ...data}),
                        updatedat: new Date(),
                    } , returnData.formprogressid);
                });
                setFormStep(2);
                navigate('/list/propertyamenities');
            }
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(function () {
        setFocus('address');
    }, [setFocus]);

    return (
        <>
            <form className='py-5 overflow-x-hidden' onSubmit={handleSubmit(onPropertyLocationSubmit)}>
                <div className='formgroup property_location'>
                    <div className='m-[0px_auto] w-80 md:w-100'><MoveBack /></div>
                    <div className='m-[0px_auto] w-80 md:w-100 font-bold dark:text-gray-500 text-xl'>Property Location</div>
                    <YardInput 
                        label='Address'
                        iconElement='📍'
                        placeholder='Enter Property Address'
                        id='address'
                        name='address'
                        className='my-4'
                        register={register}
                        validation={{
                            required: 'Property Address is required',
                        }}
                        error={errors?.address}
                    />
                    <YardInput 
                        label='City'
                        iconElement='🏙️'
                        placeholder='Enter Property City'
                        id='propertycity'
                        name='propertycity'
                        className='my-4'
                        register={register}
                        validation={{
                            required: 'Property City is required',
                        }}
                        error={errors?.propertycity}
                    />
                    <YardInput 
                        label='Neighbourhood'
                        iconElement='🛣️'
                        placeholder='Enter Property Neighbourhood'
                        id='neighbourhood'
                        name='neighbourhood'
                        className='my-4'
                        register={register}
                        validation={{
                            required: 'Property Neighbourhood is required',
                        }}
                        error={errors?.neighbourhood}
                    />
                    <YardInput 
                        label='Region/Province'
                        iconElement='🗺️'
                        placeholder='Enter Property Region'
                        id='region'
                        name='region'
                        className='my-4'
                        register={register}
                        validation={{
                            required: 'Property Province is required',
                        }}
                        error={errors?.region}
                    />
                    <YardInput 
                        label='Postal Code'
                        iconElement='⚲'
                        placeholder='Enter Property Postal Code'
                        id='postalcode'
                        name='postalcode'
                        className='my-4'
                        register={register}
                    />
                    <YardInput 
                        label='Latitude'
                        iconElement='↔️'
                        placeholder='Enter Property Latitude'
                        id='latitude'
                        name='latitude'
                        className='my-4'
                        register={register}
                    />
                    <YardInput 
                        label='Longitude'
                        iconElement='↕️'
                        placeholder='Enter Property Longitude'
                        id='longitude'
                        name='longitude'
                        className='my-4'
                        register={register}
                    />
                    <YardButton disabled={isSubmitting} type="submit" id="submit" value='submit property location' className={`${isSubmitting && 'cursor-not-allowed'} bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 m-[0px_auto] w-80 md:w-100`}>
                        {isSubmitting ? <SmallLoader /> : 
                            <>
                                <span>Save and continue</span>
                            </> 
                        }
                    </YardButton>
                </div>
            </form> 
        </>
    );
}

export default PropertyLocation;