import SearchPreferences from "../features/settings/components/SearchPreferences";
import NotificationSetting from "../features/settings/components/NotificationSetting";
import SignOutComp from "../features/settings/components/SignOutComp";
import MoveBack from "../components/ui/MoveBack";
import { Link } from "react-router-dom";

function Settings() {
  return (
    <div>
      <MoveBack />
      <div className='font-bold text-2xl w-100 md:w-170 lg:w-200 m-[0px_auto]'>Settings & Preferences</div>
      <SearchPreferences />
      {/* <NotificationSetting /> */}
      <SignOutComp />
      {/* User Complaints Part */}
      <div className='m-[0px_auto] w-fit'>
        <Link className=''>Report an issue</Link>
      </div>
    </div>
  );
}

export default Settings;