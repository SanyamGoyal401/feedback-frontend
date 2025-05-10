import { createContext, useState } from "react";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
    const[isLogInModalOpen, setLoginModal] = useState(false);
    const[isSignUpModalOpen, setSignUpModal] = useState(false);

    return (
        <ModalContext.Provider value={{isLogInModalOpen, setLoginModal, isSignUpModalOpen, setSignUpModal}}>
            {children}
        </ModalContext.Provider>
    );
}

export { ModalContext, ModalProvider };