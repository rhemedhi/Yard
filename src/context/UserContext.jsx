import { createContext, useContext, useEffect, useState } from "react";
import SignUp from './userContextLogic/SignUp.js';
import SignIn from './userContextLogic/SignIn.js';
import { supabase } from "../integrations/supabase/client.js";

const UserContext = createContext();

function UserProvider({children}) {
    const [currentUser, setCurrentUser] = useState({});
    const [isAuthenticated, setIsAuthenticated] = useState(!currentUser ? false : true);

    useEffect(function() {
        supabase.auth.getSession().then(({data: { session }}) => {
            if (session) {
                setCurrentUser(session?.user ?? null);
                setIsAuthenticated(true);
            }
        });
        
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (session) {
                setCurrentUser(session?.user ?? null);
                setIsAuthenticated(true);
            } else {
                setCurrentUser(null);
                setIsAuthenticated(false);
            }
        })

        return () => subscription.unsubscribe();
    }, []);

    return (
        <UserContext.Provider value={{isAuthenticated, setIsAuthenticated, SignUp, SignIn, currentUser, setCurrentUser}}>
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
