import { Toaster } from "react-hot-toast";
import UseIsMobile from "./UseIsMobile";

function UseToast() {
  const isMobile = UseIsMobile();

  return (
    <>
        <Toaster
            position={`${isMobile ? 'top-center' : 'bottom-right'}`}
            reverseOrder={false}
            gutter={5}
            containerStyle={{ margin: '10px' }}
            toastOptions={{
              duration: 1000,
              removeDelay: 1000,
              style: {
                width: '400px',
                backgroundColor: '#fff',
                color: '#000',
                fontSize: '14px',
                padding: '15px 25px',
                whiteSpace: 'nowrap',
              },
              success: {
                duration: 3000,
              },
              error: {
                duration: 3000,
                style: {
                  backgroundColor: '#fa5252',
                  color: '#fff'
                }
              },
            }}
        />
    </>
  )
}

export default UseToast;
