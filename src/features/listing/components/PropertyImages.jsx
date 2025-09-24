import { useForm } from "react-hook-form";
import YardInput from "../../../components/common/YardInput";
import MoveBack from "../../../components/ui/MoveBack";
import YardButton from "../../../components/common/YardButton";
import SmallLoader from "../../../components/common/SmallLoader";
import InputFileRep from "./InputFileRep";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { UseListing } from "../context/PropertyListContext";
import retrieveFormProgressData from "../services/retrieveFormProgressData";
import updateFormProgressData from "../services/updateFormProgressData";
import { UseUser } from "../../../context/UserContext";
// import CheckImageIsBlurry from "../../../utils/CheckImageIsBlurry";

function PropertyImages() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState([]);
    const navigate = useNavigate();
    const { propertyData, setPropertyData, setFormStep } = UseListing();
    const { currentUser } = UseUser();
    const { handleSubmit, formState: { errors, isSubmitting }} = useForm();

    function onChangeOfImages(event) {
        if (event.target.files && event.target.files.length > 0) {
            const newFiles = Array.from(event.target.files);
            const imageFiles = newFiles.filter((file) => file.type.startsWith('image/'));

            setSelectedFile(prev => {
                const existingNames = new Set(prev.map(f => f.name));
                const filteredNewFiles = imageFiles.filter(f => !existingNames.has(f.name));
                return [...prev, ...filteredNewFiles];
            });

            event.target.value = null;
        }
    }

    async function onPropertyImageSubmit() {
        if (Array.from(selectedFile).length <= 0) {
            toast.error('Add some pictures of your properties to save and continue');
        } else {
            try {
                // Will do later
                // const fileArray = Array.from(selectedFile);
                // for (let i = 0; i < fileArray.length; i++) {
                //     if (CheckImageIsBlurry(fileArray[i])) {
                //         toast.error('Kindly make sure to upload non blurry images for easy convenient of your clients');
                //         return;
                //     }
                // } 

                setPropertyData(prev => {
                    return {...prev, selectedFile};
                });
                await retrieveFormProgressData(currentUser.id).then(returnData => {
                    updateFormProgressData({ 
                        step: 4, 
                        formdata: JSON.stringify({...propertyData, selectedFile}),
                        updatedat: new Date(),
                    } , returnData.formprogressid);
                });
                setFormStep(4);
                navigate('/list/propertysummary');
                
            } catch (error) {
                console.error(error);
            }
        }
    }

    return (
        <>
            <form className='py-5 overflow-x-hidden' onSubmit={handleSubmit(onPropertyImageSubmit)}>
                <div className='formgroup property_images'>
                    <div className='m-[0px_auto] w-80 md:w-100'><MoveBack /></div>
                    <div className='m-[0px_auto] w-80 md:w-100 font-bold dark:text-gray-500 text-xl'>Property Images</div>
                    <YardInput 
                        label='Upload pictures of your property'
                        type='file'
                        multiple
                        ref={fileInputRef} 
                        className='hidden my-5 '
                        id='propertyimages'
                        name='propertyimages'
                        onChange={onChangeOfImages}
                        accept='.jpg, .jpeg, .png, .webp'
                        // register={register}
                        validation={{
                            required: 'Property image is required',
                        }}
                        error={errors?.propertyimages}
                    />
                    <InputFileRep fileInputRef={fileInputRef} selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
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

export default PropertyImages;

