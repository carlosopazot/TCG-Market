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

  const login = (values) => {
    signInWithEmailAndPassword(auth, values.email, values.password)
  }

  const logout = () => {
    signOut(auth)
  }

  const register = (values) => {
    createUserWithEmailAndPassword(auth, values.email, values.password)
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log("User:" , user)
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
    <UserContext.Provider value={{ user, googleLogin, login, logout, register }}>
      {children}
    </UserContext.Provider>
  )
}