import { useState ,useContext,createContext } from 'react';

const SearchContext = createContext();

const SearchProvider = ({children}) =>{
    const [values,setValues] =useState({
       keyword: "",
       results: [],
    })
    // state for total-search-products count
    const [total,setTotal] = useState(0);
    // pagination state of search page
    const [page,setPage] = useState(1);
    // pagination state of search page
    const [catPage,setCatPage] = useState(1);

    const value={
        values:values,
        setValues:setValues,
        total:total,
        setTotal:setTotal,
        page:page,
        setPage:setPage,
        catPage:catPage,
        setCatPage:setCatPage
    }  

    return(
        // <SearchContext.Provider value={[auth,setAuth]}>
        <SearchContext.Provider value={value}>
            {children}
        </SearchContext.Provider>
    )
}

// custom hook
const useSearch = () => useContext(SearchContext);

export { useSearch, SearchProvider };