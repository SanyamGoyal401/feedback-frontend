import { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const isLogIn = (localStorage.getItem('user') !== null)
    const [login, setLogIn] = useState(isLogIn);

    return (
        <AuthContext.Provider value={{login, setLogIn}}>
            {children}
        </AuthContext.Provider>
    );
}

export { AuthContext, AuthProvider };