
import { useState, createContext } from "react";

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = (search) => {
    setSearchValue(search);
    console.log('busqueda:', search);
  }

  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue, handleSearch }}>
      {children}
    </SearchContext.Provider>
  );
}