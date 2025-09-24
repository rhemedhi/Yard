import { BanknotesIcon, BookmarkSquareIcon, CalendarIcon, CurrencyDollarIcon, DocumentTextIcon, TagIcon } from "@heroicons/react/24/outline";
import YardInput from "../../../components/common/YardInput";
import YardSelectInForm from "../../../components/common/YardSelectInForm";
import { PropertyCategoryList } from "../../../data/PropertyCategoryList";
import { PropertyPriceCurrencyList } from "../../../data/PropertyPriceCurrencyList";
// import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PropertyTypeList } from "../../../data/propertyTypeList";
import YardButton from "../../../components/common/YardButton";
import { useNavigate } from "react-router-dom";
import SmallLoader from "../../../components/common/SmallLoader";
import { UseListing } from "../context/PropertyListContext";
import { PropertyRentalPeriodList } from "../../../data/PropertyRentalPeriodList";
import { PropertyFurnishedList } from "../../../data/PropertyFurnishedList";
import MoveBack from "../../../components/ui/MoveBack";
// import { useQuery, useQueryClient } from "@tanstack/react-query";
// import { queryKeys } from "../../../lib/queryKeys";
// import fetchPropertyFormData from "../services/fetchPropertyFormData";
import PropertyLoader from "../../properties/components/propertyLoader";
import { UseUser } from "../../../context/UserContext.jsx";
import CreateFormProgressData from "../services/createFormProgressData.js";
import toast from "react-hot-toast";
import { PropertyFormCategoryList } from "../../../data/PropertyFormCategoryList.jsx";

function PropertyDetails() {
    const { register, handleSubmit, control, formState: { errors, isSubmitting }} = useForm();
    const navigate = useNavigate();
    const { propertyData, setPropertyData, setFormStep } = UseListing();
    // const queryClient = useQueryClient();
    const { currentUser } = UseUser();

    // const { data: formProgressData, isLoading: formProgressIsLoading, isError: formProgressIsError, error: formProgressError } = useQuery({
    //     queryKey: queryKeys.listing.base,
    //     queryFn: fetchPropertyFormData
    // });

    // if (formProgressIsError) {
    //     return (
    //         <div>Error: {`${formProgressError.message}`}</div>
    //     )
    // }

    // if (formProgressIsLoading) {
    //     return (
    //         <PropertyLoader />
    //     )
    // }

    async function onPropertyDetailsSubmit(data) {
        try {
            if (data) {
                if (!currentUser?.id) {
                    navigate('/sign-in');
                    throw new Error("You must be logged in to submit property details");
                }
                setPropertyData(prev => {
                    return {...prev, ...data};
                });
                await CreateFormProgressData({...propertyData, ...data}, currentUser);
                // queryClient.invalidateQueries({ queryKey: queryKeys.listing.base });
                setFormStep(1);
                navigate('/list/propertylocation');
            }
            
        } catch (error) {
            console.error(error);
            if (error.message === "You must be logged in to submit property details") {
                toast.error(error.message);
            }
        }

    }

    return (
        <>
            <form className='py-5 overflow-x-hidden' onSubmit={handleSubmit(onPropertyDetailsSubmit)}>
                <div className='formgroup property_detail'>
                    <div className='m-[0px_auto] w-80 md:w-100'><MoveBack /></div>
                    <div className='m-[0px_auto] w-80 md:w-100 font-bold dark:text-gray-500 text-xl'>Property Details</div>
                    <YardInput
                        label='Title'
                        iconElement={<TagIcon className='size-5' />}
                        placeholder='Enter property title'
                        id='propertytitle'
                        name='propertytitle'
                        className='my-5'
                        // defaultValue={formProgressData?.formdata?.propertytitle}
                        register={register}
                        validation={{
                            required: 'Property title is required'
                        }}
                        error={errors?.propertytitle}
                    />
                    <div className='m-[0px_auto] w-80 md:w-100 my-5'>
                        <p>Type</p>
                        <YardSelectInForm 
                            iconElement={<BookmarkSquareIcon className='size-5' />}
                            id='Propertytype'
                            name='Propertytype'
                            placeholder='Select Property Type'
                            control={control}
                            className='my-1'
                            validation={{
                                required: 'Property Type is required'
                            }}
                            error={errors?.Propertytype}
                            optionList={PropertyTypeList}
                        />
                    </div>
                    {propertyData?.Propertytype && (
                    <YardInput
                        label='Start Date'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter property start date'
                        id='propertystartdate'
                        name='propertystartdate'
                        type='datetime-local'
                        className='my-5'
                        register={register}
                        validation={{
                            required: 'Property start date is required'
                        }}
                        error={errors?.propertystartdate}
                    />)}
                    <div className='m-[0px_auto] w-80 md:w-100 my-5'>
                        <p>Category</p>
                        <YardSelectInForm 
                            iconElement={<BookmarkSquareIcon className='size-5' />}
                            id='Propertycategory'
                            name='Propertycategory'
                            placeholder='Select Property Category'
                            // defaultValue={formProgressData?.formdata?.Propertycategory?.value}
                            control={control}
                            className='my-1'
                            validation={{
                                required: 'Property Category is required'
                            }}
                            error={errors?.Propertycategory}
                            optionList={PropertyFormCategoryList}
                        />
                    </div>
                    <YardInput 
                        label='Description'
                        iconElement={<DocumentTextIcon className='size-5' />}
                        placeholder='Describe your property'
                        id='propertydescription'
                        name='propertydescription'
                        type='textarea'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertydescription}
                        register={register}
                        validation={{
                            required: 'Property description is required'
                        }}
                        error={errors?.propertydescription}
                    />


                    <YardInput 
                        label='Year built'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter year built'
                        id='propertyyear'
                        name='propertyyear'
                        type='number'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertyyear}
                        register={register}
                        validation={{
                            required: 'Property year is required',
                            min: {
                                value: 1990,
                                message: 'year built cannot be less than 1990'
                            },
                            max: {
                                value: 2099,
                                message: 'year built cannot be more than 2099'
                            }
                        }}
                        error={errors?.propertyyear}
                    />
                    <div className='m-[0px_auto] w-80 md:w-100 my-5'>
                        <p>Rental period</p>
                        <YardSelectInForm 
                            iconElement={<BookmarkSquareIcon className='size-5' />}
                            id='Propertyrentalperiod'
                            name='Propertyrentalperiod'
                            placeholder='Select Property Rental Period'
                            // defaultValue={formProgressData?.formdata?.Propertyrentalperiod?.value}
                            control={control}
                            className='my-1'
                            validation={{
                                required: 'Property Rental Period is required'
                            }}
                            error={errors?.Propertyrentalperiod}
                            optionList={PropertyRentalPeriodList}
                        />
                    </div>
                    <div className='m-[0px_auto] w-80 md:w-100 my-5'>
                        <p>Furnished</p>
                        <YardSelectInForm 
                            iconElement={<BookmarkSquareIcon className='size-5' />}
                            id='Propertyfurnished'
                            name='Propertyfurnished'
                            placeholder='Is Property furnished'
                            // defaultValue={formProgressData?.formdata?.Propertyfurnished?.value}
                            control={control}
                            className='my-1'
                            validation={{
                                required: 'Property furnished is required'
                            }}
                            error={errors?.Propertyfurnished}
                            optionList={PropertyFurnishedList}
                        />
                    </div>
                    <YardInput 
                        label='Bed rooms'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter number of bed rooms'
                        id='propertybedroom'
                        name='propertybedroom'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertybedroom}
                        register={register}
                        validation={{
                            required: 'Property year is required',
                        }}
                        error={errors?.propertybedroom}
                    />
                    <YardInput 
                        label='Bath rooms'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter number of bath rooms'
                        id='propertybathroom'
                        name='propertybathroom'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertybathroom}
                        register={register}
                        validation={{
                            required: 'Property year is required',
                        }}
                        error={errors?.propertybathroom}
                    />
                    <YardInput 
                        label='Area Square'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter property area square'
                        id='propertyareasquare'
                        name='propertyareasquare'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertyareasquare}
                        register={register}
                        validation={{
                            required: 'Property area square is required',
                        }}
                        error={errors?.propertyareasquare}
                    />
                    <YardInput 
                        label='Parking spaces'
                        iconElement={<CalendarIcon className='size-5' />}
                        placeholder='Enter property area square'
                        id='propertyparkingspaces'
                        name='propertyparkingspaces'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertyparkingspaces}
                        register={register}
                        validation={{
                            required: 'Property parking space is required',
                        }}
                        error={errors?.propertyparkingspaces}
                    />


                    <YardInput 
                        label='Price (₵)'
                        iconElement={<BanknotesIcon className='size-5' />}
                        placeholder='Enter Price'
                        id='propertyprice'
                        name='propertyprice'
                        type='number'
                        className='my-4'
                        // defaultValue={formProgressData?.formdata?.propertyprice}
                        register={register}
                        validation={{
                            required: 'Property Price is required',
                            min: {
                                value: 0,
                                message: 'Price cannot be less than zero'
                            }
                        }}
                        error={errors?.propertyprice}
                    />
                    <div className='m-[0px_auto] w-80 md:w-100 my-5'>
                        <p>Currency</p>
                        <YardSelectInForm 
                            iconElement={<CurrencyDollarIcon className='size-5' />}
                            id='Propertycurrency'
                            name='Propertycurrency'
                            placeholder='Select Price Currency'
                            // defaultValue={formProgressData?.formdata?.Propertycurrency?.value}
                            control={control}
                            className='my-1'
                            validation={{
                                required: 'Price Currency is required'
                            }}
                            error={errors?.Propertycurrency}
                            optionList={PropertyPriceCurrencyList}
                        />
                    </div>
                    <YardButton disabled={isSubmitting} type="submit" id="submit" value='submit property detail' className={`${isSubmitting && 'cursor-not-allowed'} bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 m-[0px_auto] w-80 md:w-100`}>
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

export default PropertyDetails;
