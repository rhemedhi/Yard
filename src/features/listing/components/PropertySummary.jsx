import { useEffect } from "react";
import YardButton from "../../../components/common/YardButton";
import { UseListing } from "../context/PropertyListContext";
import { useNavigate } from "react-router-dom";
import MoveBack from "../../../components/ui/MoveBack";
import YardInput from "../../../components/common/YardInput";
import { BanknotesIcon, BookmarkSquareIcon, CalendarIcon, CurrencyDollarIcon, DocumentTextIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import { PropertyTypeList } from "../../../data/propertyTypeList";
import { PropertyFormCategoryList } from "../../../data/PropertyFormCategoryList";
import { PropertyRentalPeriodList } from "../../../data/PropertyRentalPeriodList";
import { PropertyFurnishedList } from "../../../data/PropertyFurnishedList";
import { PropertyPriceCurrencyList } from "../../../data/PropertyPriceCurrencyList";
import YardSelect from "../../../components/common/YardSelect";
import { useForm } from "react-hook-form";
import SmallLoader from "../../../components/common/SmallLoader";
import toast from "react-hot-toast";
import { supabase } from "../../../integrations/supabase/client";
import { UseUser } from "../../../context/UserContext";
// import axios from "axios";
import imageCompression from 'browser-image-compression';
import loadImage from "../../../utils/loadImage";
import YardSelectInForm from "../../../components/common/YardSelectInForm";

function PropertySummary() {
  const { propertyData, setPropertyData, formStep } = UseListing();
  const { currentUser } = UseUser();
  const navigate = useNavigate();
  const { register, handleSubmit, control, formState: { errors, isSubmitting }} = useForm();
  let uploadedURLS = [];

  useEffect(function () {
    console.log(propertyData);
    console.log(currentUser);
    console.log(propertyData.selectedFile);

    if (formStep !== 4) {
      navigate('/list');
    }

  }, [propertyData, currentUser, formStep, navigate]);

  function handleAmenityChange(amenity) {
    setPropertyData(prev => ({
      ...prev,
      amenityData: prev.amenityData.filter(item => item !== amenity)
    }));
  }

  function handleRemoveFile(fname) {
    setPropertyData(prev => ({
      ...prev,
      selectedFile: Array.from(prev?.selectedFile).filter((file) => file.name !== fname)
    }));
  }

  async function handlePropertyImageUpload(uploadFiles, propertyId) {
    // Compress and Upload files
    let MAX_FILE_MB = 1;
    let MAX_DIMENSION = 1200;
    let propertyInfoUpdated = false;
    let compressedFile;

    for(let i = 0; i < uploadFiles.length; i++) {
      const file = uploadFiles[i];
      const fileSizeMB = file.size / 1024 / 1024;

      const img = await loadImage(file);
      const compressedFileOption = {
        maxSizeMB: MAX_FILE_MB,
        maxWidthOrHeight: MAX_DIMENSION,
        useWebWorker: true, 
      }

      if (fileSizeMB <= MAX_FILE_MB && img.width <= MAX_DIMENSION && img.height <= MAX_DIMENSION) {
        compressedFile = file;
      } else {
        compressedFile = await imageCompression(file, compressedFileOption);
      }

      const filePath = `properties/${self.crypto.randomUUID()}-${compressedFile.name}`;
      const { error: propertyImageError } = await supabase.storage.from('propertyimages').upload(filePath, compressedFile);

      if (propertyImageError) {
        console.error(propertyImageError);
        continue;
      }

      const { data: publicUrl } = supabase.storage.from("propertyimages").getPublicUrl(filePath);
      uploadedURLS.push(publicUrl.publicUrl);
      if (!propertyInfoUpdated) {
        const { error: updatePropertyInfo1Error } = await supabase.from('property').update({ propertyinfo1: publicUrl.publicUrl }).eq('propertyid', propertyId);
        if (updatePropertyInfo1Error) {
          console.error(updatePropertyInfo1Error);
        }
        propertyInfoUpdated = true;
      }
    }

    // property images
    const propertyImageInsertData = {
      propertyid: propertyId,
      imageurls: uploadedURLS,
    }

    if (uploadedURLS.length > 0) {
      const { error: propertyImageInsertError } = await supabase.from('propertyimage').insert(propertyImageInsertData);
      if (propertyImageInsertError) {
        console.error(propertyImageInsertError);
      }  
    }
  }

  async function handleRollBackIfInsertFails(propertyId) {
    try {
      await supabase.from("propertyimage").delete().eq("propertyid", propertyId);
      await supabase.from("propertyamenity").delete().eq("propertyid", propertyId);
      await supabase.from("propertydetail").delete().eq("propertyid", propertyId);
      await supabase.from("propertylocation").delete().eq("propertyid", propertyId);
      await supabase.from("property").delete().eq("propertyid", propertyId);
    } catch (e) {
      console.error("Rollback failed:", e);
    }
  }

  async function onFinalPropertyFormSubmit() {
    // first check if form progress is complete
    if (formStep === 4) {
      // if yes, then save to tables: property, propertyamenity, propertydetail, propertyimages bucket storage, property location, property image
      
      // property
      const propertyInsertData = {
        propertytitle: propertyData.propertytitle,
        propertydescription: propertyData.propertydescription,
        ownerid: currentUser.id,
        propertyprice: propertyData.propertyprice,
        currency: propertyData.Propertycurrency.value,
        isfeatured: false,
        isavailable: true,
        propertystatus: 'Published',
        propertytypeid: propertyData.Propertytype.id,
        propertycategoryid: propertyData.Propertycategory.id,
      };

      const { data: propertyInsertFetchedData, error: propertyInsertError } = await supabase.from('property').insert(propertyInsertData).select().single();
      if(propertyInsertError) {
        toast.error("Failed to save property");
        console.error(propertyInsertError);
        return null;
      }

      let propertyId = propertyInsertFetchedData.propertyid;
      
      // property amenity, detail and location
      const propertyAmenityInsertData = {
        propertyid: propertyId,
        amenityname: currentUser.user_metadata.username + ' Amenity',
        amenitydata: propertyData.amenityData
      }
      const propertyDetailInsertData = {
        propertyid: propertyId,
        bedrooms: propertyData.propertybedroom,
        bathrooms: propertyData.propertybathroom,
        areasquare: propertyData.propertyareasquare,
        yearbuilt: propertyData.propertyyear,
        rentalperiod: propertyData.Propertyrentalperiod.value,
        furnished: propertyData.Propertyfurnished.value,
        parkingspaces: propertyData.propertyparkingspaces
      }
      const propertyLocationInsertData = {
        propertyid: propertyId,
        address: propertyData.address,
        city: propertyData.propertycity,
        neighbourhood: propertyData.neighbourhood,
        region: propertyData.region,
        postalcode: propertyData.postalcode,
        latitude: propertyData.latitude,
        longitude: propertyData.longitude,
      }

      try {
        await Promise.all([
          supabase.from('propertyamenity').insert(propertyAmenityInsertData),
          supabase.from('propertydetail').insert(propertyDetailInsertData),
          supabase.from('propertylocation').insert(propertyLocationInsertData)
        ]);

        // propertyimages
        await handlePropertyImageUpload(propertyData.selectedFile, propertyId);

        toast.success('Property saved successfully', { duration: 5000 });
        navigate('/');

      } catch (error) {
        console.error(error);
        
        // roll back if upload fails
        await handleRollBackIfInsertFails(propertyId);
        toast.error("An error occurred while saving your property, please try again");
      }    

    }

  }

  return (
    <div>
      <div className='m-[0px_auto] w-80 md:w-100'><MoveBack /></div>
      <p className='m-[0px_auto] w-80 md:w-100 text-xl font-bold mb-2'>property summary</p>
      <p className='m-[0px_auto] w-80 md:w-100'>Kindly Review the summary of your property below: </p>
      <div className='m-[0px_auto] w-80 md:w-100'>

        <form className='py-5 overflow-x-hidden' onSubmit={handleSubmit(onFinalPropertyFormSubmit)}>

        {/* Property Details Summary Start */}
        <div className='text-lg font-bold'>Property Details</div>
        <div>
          <YardInput
            label='Title'
            iconElement={<TagIcon className='size-5' />}
            placeholder='Enter property title'
            id='propertytitle'
            name='propertytitle'
            className='my-5'
            defaultValue={propertyData?.propertytitle}
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
              className='my-1'
              defaultValue={propertyData?.Propertytype}
              control={control}
              validation={{
                required: 'Property Type is required'
              }}
              error={errors?.Propertytype}
              optionList={PropertyTypeList}
            />
          </div>
          <div className='m-[0px_auto] w-80 md:w-100 my-5'>
            <p>Category</p>
            <YardSelect 
              iconElement={<BookmarkSquareIcon className='size-5' />}
              id='Propertycategory'
              name='Propertycategory'
              placeholder='Select Property Category'
              defaultValue={propertyData?.Propertycategory}
              className='my-1'
              control={control}
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
            defaultValue={propertyData?.propertydescription}
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
            defaultValue={propertyData?.propertyyear}
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
              defaultValue={propertyData?.Propertyrentalperiod}
              control={control}
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
              defaultValue={propertyData?.Propertyfurnished}
              control={control}
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
            defaultValue={propertyData?.propertybedroom}
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
            defaultValue={propertyData?.propertybathroom}
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
            defaultValue={propertyData?.propertyareasquare}
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
            defaultValue={propertyData?.propertyparkingspaces}
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
            defaultValue={propertyData?.propertyprice}
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
              defaultValue={propertyData?.Propertycurrency}
              control={control}
              validation={{
                required: 'Price Currency is required'
              }}
              error={errors?.Propertycurrency}
              optionList={PropertyPriceCurrencyList}
            />
          </div>
        </div>
        {/* Property Details Summary End */}  


        {/* Property Location Summary Start */}
        <div className='text-lg font-bold'>Property Location</div>
        <div>
          <YardInput 
            label='Address'
            iconElement='📍'
            placeholder='Enter Property Address'
            id='address'
            name='address'
            className='my-4'
            defaultValue={propertyData?.address}
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
            defaultValue={propertyData?.propertycity}
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
            defaultValue={propertyData?.neighbourhood}
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
            defaultValue={propertyData?.region}
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
            defaultValue={propertyData?.postalcode}
            register={register}
          />
          <YardInput 
            label='Latitude'
            iconElement='↔️'
            placeholder='Enter Property Latitude'
            id='latitude'
            name='latitude'
            className='my-4'
            defaultValue={propertyData?.latitude}
            register={register}
          />
          <YardInput 
            label='Longitude'
            iconElement='↕️'
            placeholder='Enter Property Longitude'
            id='longitude'
            name='longitude'
            className='my-4'
            defaultValue={propertyData?.longitude}
            register={register}
          />
        </div>
        {/* Property Location Summary End */}


        {/* Property Amenity Start */}
        <div className='text-lg font-bold my-5'>Property Amenities</div>
        <div className='grid grid-cols-3 gap-3'>
          {Array.from(propertyData?.amenityData).map(function (amenData, i) {
            return (
              <div key={i} className='flex justify-between items-center cursor-pointer rounded-lg bg-gray-200 dark:bg-[#292929] p-2 h-10 hover:bg-gray-100 dark:hover:bg-[#212121] transition-all duration-700'>
                <span className='amenName block max-w-[150px] truncate'>{amenData}</span>
                <span className='amenNameCancel hover:bg-red-400' onClick={() => handleAmenityChange(amenData)}>X</span>
              </div>
            );
          })}
        </div>
        {/* Property Amenity End */}


        {/* Property Images */}
        <div className='text-lg font-bold my-5'>Property Images</div>
        <div className='grid grid-cols-5 gap-2 w-80 md:w-97 mt-5 mb-9'>
          {(propertyData?.selectedFile ? Array.from(propertyData.selectedFile) : []).map(function (file, i) { 
            return ( 
              <div key={i} className='relative bg-gray-100 dark:bg-[#212121] px-2 py-1 rounded-2xl'>
                <img src={URL.createObjectURL(file)} alt={file.name} className="w-15 h-15 object-cover rounded" loading='lazy' />
                <span title="remove" onClick={() => handleRemoveFile(file.name)}><TrashIcon  className='absolute top-[-5px] right-[-5px] size-3 hover:text-red-500 hover:scale-150 cursor-pointer transition-all duration-400' /></span>
              </div>
            );
          })}
        </div>
        {/* Property Images */}


        <YardButton disabled={isSubmitting} type="submit" id="submit" value='submit final property data' className={`${isSubmitting && 'cursor-not-allowed'} bg-green-600 h-10 rounded-lg flex justify-center items-center gap-2 text-white hover:bg-green-500 transition-all duration-500 m-[0px_auto] w-80 md:w-100`}>
          {isSubmitting ? <SmallLoader /> : 
            <>
              <span>Save your property</span>
            </> 
          }
        </YardButton>
        
        </form>

      </div>
    </div>
  );
}

export default PropertySummary;


