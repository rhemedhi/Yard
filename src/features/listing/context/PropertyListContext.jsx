import { createContext, useContext, useState } from "react";

const ListContext = createContext();

function PropertyListProvider({children}) {
    const [propertyData, setPropertyData] = useState({});
    const [formStep, setFormStep] = useState(0);

    return (
        <ListContext.Provider value={{ propertyData, setPropertyData, formStep, setFormStep }}>
            {children}
        </ListContext.Provider>
    );
}

function UseListing() {
    const context = useContext(ListContext);
    if (context === undefined) {
        throw new Error("Context Used Outside of Scope");
    }
    return context;
}

export {PropertyListProvider, UseListing};
