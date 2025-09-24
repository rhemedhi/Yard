import { ArrowUpTrayIcon, TrashIcon } from "@heroicons/react/24/outline";
import YardButton from "../../../components/common/YardButton";

function InputFileRep({fileInputRef, selectedFile, setSelectedFile}) {

    function triggerFileInput(event) {
        event.preventDefault();
        if (fileInputRef?.current) {
            fileInputRef?.current?.click();
        }
    }

    function handleDeleteFile(fname) {
        setSelectedFile(Array.from(selectedFile).filter((file) => file.name !== fname));
    }

    return (
        <div className='m-[0px_auto] w-80 md:w-100 my-5'>
            <p className='my-5' >Upload pictures of your property</p>
            <YardButton onClick={triggerFileInput} className='flex flex-col justify-center items-center gap-5 border-dashed rounded-2xl p-7 w-80 md:w-100'>
                <ArrowUpTrayIcon className='size-6' />
                <span>Upload</span>
            </YardButton>
                                                                                                                                       
            <div className='fileDescription grid grid-cols-5 gap-2 w-80 md:w-100 my-2 mt-5'> 
                {Array.from(selectedFile).length > 0 &&
                    Array.from(selectedFile).map(function (file) {
                        return (
                            <div key={file.name}>
                                <div className='relative bg-gray-100 dark:bg-[#212121] px-2 py-1 rounded-2xl'>
                                    <img src={URL.createObjectURL(file)} alt={file.name} className="w-15 h-15 object-cover rounded" loading='lazy' />
                                    <span onClick={() => handleDeleteFile(file.name)} title="remove"><TrashIcon  className='absolute top-[-5px] right-[-5px] size-3 hover:text-red-500 hover:scale-150 cursor-pointer transition-all duration-400' /></span>
                                </div>
                            </div>
                        );
                    })
                }
            </div>

        </div>
    );
}

export default InputFileRep;
