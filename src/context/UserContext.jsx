import { createContext, useEffect, useState } from 'react'
import { auth, provider, fbProvider } from '../firebase/config'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
} from 'firebase/auth'
import { useContext } from 'react'
import { ThemeContext } from './ThemeContext'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: null,
    logged: false,
    uid: null,
    name: '',
    avatar: null,
    phone: null,
    emailVerified: null,
  })

  const { handleAuthError } = useContext(ThemeContext)

  const login = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user
      // Usuario autenticado con éxito

      console.log(user)
      // Continuar con cualquier lógica adicional después del inicio de sesión...
    } catch (error) {
      handleAuthError(error)
    }
  }

  const register = async (values) => {
    try {
      // Crear el usuario con correo y contraseña
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user

      await updateProfile(user, {
        displayName: values.name
      })     
    } catch (error) {
      handleAuthError(error)
    } finally {
      window.location.href = '/verificar-numero'
    }
  }

  const logout = () => {
    signOut(auth)
    window.location.href('/')
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider);
  };

  const facebookLogin = () => {
    signInWithPopup(auth, fbProvider)
  }

  // Set persistence for the authentication state
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
    .then(() => {
      // Continue with the onAuthStateChanged logic
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log('User:', user)
          setUser({
            email: user.email,
            uid: user.uid,
            logged: true,
            name: user.displayName,
            avatar: user.photoURL,
            phone: user.phoneNumber,
            emailVerified: user.emailVerified,
          })
        } else {
          setUser({
            email: null,
            uid: null,
            logged: false,
            name: null,
            avatar: null,
            phone: null,
            emailVerified: null,
          })
        }
      })
    })
    .catch((error) => {
      console.error('Error setting persistence:', error)
    })
  }, [])

  return (
    <UserContext.Provider
      value={{ user, setUser, googleLogin, logout, facebookLogin, login, register }}
    >
      {children}
    </UserContext.Provider>
  )
}
