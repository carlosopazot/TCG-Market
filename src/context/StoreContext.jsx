import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const [store, setStore] = useState(() => {
    const storedStore = localStorage.getItem("store");
    return storedStore ? JSON.parse(storedStore) : {};
  });

  useEffect(() => {
    if (!user.logged) {
      localStorage.removeItem("store");
    }
  }, [user.logged]);
  
  const [dollarUSD, setDollarUSD] = useState(null)

  return (
    <StoreContext.Provider value={{ store, setStore, loading, setLoading, dollarUSD, setDollarUSD }}>
      {children}
    </StoreContext.Provider>
  );
}