import { createContext, useContext, useState } from "react";
import SignUp from './userContextLogic/SignUp.js';
import SignIn from './userContextLogic/SignIn.js';

const UserContext = createContext();

function UserProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <UserContext.Provider value={{isAuthenticated, setIsAuthenticated, SignUp, SignIn}}>
            {children}
        </UserContext.Provider>
    );
}

function UseUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error("Context Used Outside of Scope");
    }
    return context;
}

export {UserProvider, UseUser};
