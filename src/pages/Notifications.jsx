import { Bell } from "lucide-react";

function Notifications() {
  return (
    <div className='mt-5 p-5 pb-0 rounded-lg border-1 border-gray-200 dark:border-[#212121] w-full md:w-170 lg:w-200 m-[0px_auto]'>
      <div className='flex gap-2 items-center'>
        <span><Bell /></span>
        <span className='text-xl font-semibold'>Notifications</span>
      </div>
      <div className='overflow-y-auto'>
        <div></div>
      </div>
    </div>
  );
}

export default Notifications;
