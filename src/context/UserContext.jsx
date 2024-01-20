import { createContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase/config";
import { signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


export const UserContext = createContext()

export const UserProvider = ({ children }) => {

  const [user, setUser] = useState({
    email: null,
    logged: false,
    uid: null,
    name: null
  })

  const logout = () => {
    signOut(auth)
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const username = user.displayName.split(' ')[0]
        setUser({
          email: user.email,
          uid: user.uid,
          logged: true,
          name: username
        })
      } else {
        setUser({
          email: null,
          uid: null,
          logged: false,
          name: null
        }) 
      }
    })
  },[])

  return(
    <UserContext.Provider value={{ user, googleLogin, logout }}>
      {children}
    </UserContext.Provider>
  )
}