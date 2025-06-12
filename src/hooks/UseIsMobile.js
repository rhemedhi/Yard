import { Capacitor } from "@capacitor/core";
import { useEffect, useState } from "react";

let mobileBreakPoint = 768;

function UseIsMobile() {
  const [isMobile, setIsMobile] = useState();

  useEffect(function () {
    function checkIfMobile() {
      const isMobileScreen = window.innerWidth < mobileBreakPoint;
      const isMobileAgent = /Mobi|Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isMobileCapacitor = Capacitor.isNativePlatform() && Capacitor.getPlatform() !== 'web';

      setIsMobile(isMobileScreen || isMobileAgent || isMobileCapacitor);
    }
    checkIfMobile();

    const mobileMediaQuery = window.matchMedia(`max-width: ${mobileBreakPoint - 1}px`);
    const handlePageResize = () => checkIfMobile();

    if(mobileMediaQuery.addEventListener) {
      mobileMediaQuery.addEventListener('change', handlePageResize);
    } else {
      window.addEventListener('resize', handlePageResize);
    }

    return () => {
      if(mobileMediaQuery.removeEventListener) {
        mobileMediaQuery.removeEventListener('change', handlePageResize);
      } else {
        window.removeEventListener('resize', handlePageResize);
      }
    }

  }, []);

  return isMobile;
}

export default UseIsMobile;