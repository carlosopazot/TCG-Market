import { createContext } from "react";
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/config";
import { doc, updateDoc, getDoc, query, collection, where, getDocs } from "firebase/firestore";
import { message } from "antd";
import { UserContext } from "./UserContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
  const [store, setStore] = useState({})

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const q = query(
          collection(db, 'stores'),
          where('email', '==', user.email)
        )
        const querySnapshot = await getDocs(q)
        const storeData = []
        querySnapshot.forEach((doc) => {
          storeData.push({ id: doc.id, ...doc.data() })
        })
        storeData.forEach((store) => {
          setTimeout(() => {
            setStore(store);
            console.log(store)
          }, 2000);
        });
        
        
      } catch (error) {
        console.error('Error fetching store:', error)
        message.error('Error al obtener la tienda')
      }
    }

    fetchStore()
  }, [user.email])


  return (
    <StoreContext.Provider value={{ store, setStore, loading, setLoading }}>
      {children}
    </StoreContext.Provider>
  );
}