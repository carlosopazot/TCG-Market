import { createContext, useEffect } from "react";
import { useState, useContext } from "react";
import { UserContext } from "./UserContext";
import { db } from "../firebase/config";
import { collection, getDocs, query, where, writeBatch } from "firebase/firestore";
import { ThemeContext } from "./ThemeContext";

export const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const [store, setStore] = useState(() => {
    const storedStore = localStorage.getItem("store");
    return storedStore ? JSON.parse(storedStore) : {};
  });
  const [isStoreUpdated, setIsStoreUpdated] = useState(false);
  const [dollarUSD, setDollarUSD] = useState(null)

  const updateAvatarCards = async (avatar) => {
    const q = query(
      collection(db, 'cards'),
      where('seller.id', '==', store.id)
    )
    const querySnapshot = await getDocs(q);
    const batch = writeBatch(db)

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { 'seller.avatar': avatar });
    });
    await batch.commit();
  };


  const updateAvatarStore = async (value) => {
    try {
      setStore({
        ...store,
        avatar: value
      })
      await updateAvatarCards(value);
    } catch (error) {
      openMessage('error', 'Error al actualizar el avatar de la tienda')
    } finally {
      setLoading(false)
    }
  };


  useEffect(() => {
    if (!user.logged) {
      localStorage.removeItem("store");
    }

    if (user.logged && user.phone && !store.id) {
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
            if (!isStoreUpdated) {
              setStore(store);
              setIsStoreUpdated(true);
              localStorage.setItem('store', JSON.stringify(store));
              console.log(store);
            } 
          });
  
        } catch (error) {
          console.error('Error fetching store:', error)
          openMessage('error','Error al obtener la tienda')
        }
      }
      fetchStore()
    }
  }, [isStoreUpdated, openMessage, store, user]);

  return (
    <StoreContext.Provider value={{ store, setStore, loading, setLoading, dollarUSD, setDollarUSD, updateAvatarStore }}>
      {children}
    </StoreContext.Provider>
  );
}