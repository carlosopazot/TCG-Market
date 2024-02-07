import { createContext, useEffect, useState } from 'react'
import { auth, provider } from '../firebase/config'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    logged: false,
    uid: null,
    name: null,
    avatar: null,
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
        console.log('User:', user)

        setUser({
          email: user.email,
          uid: user.uid,
          logged: true,
          name: user.displayName,
          avatar: user.photoURL,
        })
      } else {
        setUser({
          email: null,
          uid: null,
          logged: false,
          name: null,
          avatar: null,
        })
      }
    })
  }, [])

  return (
    <UserContext.Provider value={{ user, googleLogin, logout }}>
      {children}
    </UserContext.Provider>
  )
}
