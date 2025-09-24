import { createPortal } from "react-dom";

function CreatePortalUi({children}) {
    const overlayPortal = document.getElementById('AppPortal');
    return (
        <>
            {createPortal(children, overlayPortal)}
        </>
    )
}

export default CreatePortalUi;