import { useParams } from "react-router-dom";
import CapitalizeString from "../utils/CapitalizeString";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";
import CategoryRoute from "../components/layouts/CategoryRoute";
import UseIsMobile from "../hooks/UseIsMobile";
import MobileNavigation from "../components/layouts/MobileNavigation";
import MoveBack from "../components/ui/MoveBack";
import CategoryPagePropertiesUI from '../components/ui/CategoryPagePropertiesUI';

function CategoryPage() {

  const params = useParams();
  const isMobile = UseIsMobile();

  return (
    <div>
      <Header />
      <div className='setPageResponsive'>
        <div className='text-2xl font-semibold flex gap-2 items-center'>
          <MoveBack />
          <span>{CapitalizeString(params.category)}</span>
        </div>
        <div className='text-sm mt-1 text-gray-500'>Browse available {params.category} in the world</div>
        <CategoryRoute />
        <div><hr className='text-[#202020]' /></div>
        <CategoryPagePropertiesUI params={params.category} />
      </div>
      {isMobile ? <MobileNavigation /> : <Footer />}
    </div>
  );
}

export default CategoryPage;
