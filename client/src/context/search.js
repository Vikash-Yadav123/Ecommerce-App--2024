import { useContext, useEffect, useState, createContext } from "react";

const SearchContext = createContext();



const SearchProvider = ({ children }) => {
    const [value, setValue] = useState({
        keyword: "",
        result: [],
    });
    return (
        <SearchContext.Provider value={[value, setValue]}>
            {children}
        </SearchContext.Provider>
    )
};

//CUSTOM HOOKS
const useSearch = () => useContext(SearchContext);
export { useSearch, SearchProvider };