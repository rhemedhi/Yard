import { useForm } from "react-hook-form";
import SmallLoader from "../../../components/common/SmallLoader";
import YardButton from "../../../components/common/YardButton";
import { PropertyAmenityList } from "../../../data/PropertyAmenityList";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UseListing } from "../context/PropertyListContext";
import MoveBack from "../../../components/ui/MoveBack";
import retrieveFormProgressData from "../services/retrieveFormProgressData";
import updateFormProgressData from "../services/updateFormProgressData";
import { UseUser } from "../../../context/UserContext";

function PropertyAmenities() {
    const { handleSubmit, formState: { isSubmitting }} = useForm();
    const [amenityData, setAmenityData] = useState([]);
    const navigate = useNavigate();
    const { propertyData, setPropertyData, setFormStep } = UseListing();
    const { currentUser } = UseUser();

    function handleSelectAmenity(e) {
        let amenityValue = e.target.innerText;
        setAmenityData(prev => {
            if (prev.includes(amenityValue)) {
                return prev.filter(item => item != amenityValue);
            } else {
                return [...prev, amenityValue];
            }
        });
    }

    async function onAmenitySubmit() {
        if (amenityData.length === 0) {
            toast.error('Please select at least one amenity to proceed');
        } else {
            try {
                setPropertyData(prev => {
                    return {...prev, amenityData};
                });
                await retrieveFormProgressData(currentUser.id).then(returnData => {
                    updateFormProgressData({ 
                        step: 3, 
                        formdata: JSON.stringify({...propertyData, ...amenityData}),
                        updatedat: new Date(),
                    } , returnData.formprogressid);
                });
                setFormStep(3);
                navigate('/list/propertyimages');
                
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <form className='py-5 overflow-x-hidden' onSubmit={handleSubmit(onAmenitySubmit)}>
                <div className='formgroup property_amenity'>
                    <div className='m-[0px_auto] w-80 md:w-100'><MoveBack /></div>
                    <div className='m-[0px_auto] w-80 md:w-100 font-bold dark:text-gray-500 text-xl'>Property Amenity</div>
                    <div className='m-[0px_auto] w-80 md:w-100 '>Select the amenities available at your property</div>
                    <div className='m-[0px_auto] my-5 w-80 md:w-200 grid grid-cols-3 md:grid-cols-5 gap-3'>
                        {PropertyAmenityList.map(function (amenity) {
                            return (
                                <div onClick={(e) => handleSelectAmenity(e)} key={amenity.value} className={`border-2 ${amenityData.includes(amenity.value) ? 'border-green-500' : 'border-red-200'} cursor-pointer text-sm w-full h-20 flex justify-center items-center p-4 md:p-3 rounded-lg transition-all duration-500`}>
                                    <span>{amenity.label}</span>
                                </div>
                            );
                        })}
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

export default PropertyAmenities;
