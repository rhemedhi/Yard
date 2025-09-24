import UseIsMobile from "../../hooks/UseIsMobile";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

function MoveBack() {
    const navigate = useNavigate();
    const isMobile = UseIsMobile();

    return (
        <>
            {isMobile && <span onClick={() => navigate(-1)}><ArrowLeft className='dark:bg-[#202020] bg-gray-300 rounded-4xl p-2 m-1' size={40}/></span>}
        </>
    );
}

export default MoveBack;