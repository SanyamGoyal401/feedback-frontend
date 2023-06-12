import { createContext, useState } from "react";

const SortContext = createContext();

const SortProvider = ({ children }) => {
    const [sortBy, setSortBy] = useState("");

    return (
        <SortContext.Provider value={{ sortBy, setSortBy}}>
            {children}
        </SortContext.Provider>
    );
}

export { SortContext, SortProvider };