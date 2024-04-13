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
import { db } from '../firebase/config'
import { setDoc, doc } from 'firebase/firestore'
import { message } from 'antd'

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

  const errorMessages = {
    'auth/invalid-email': 'El correo es inválido',
    'auth/invalid-credential': 'Credencial inválida',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-email-verified': 'Email no verificado',
    'auth/weak-password' : 'La contraseña es muy débil',
    'auth/email-already-in-use' : 'Correo ya está en uso'
  }

  const handleAuthError = (error) => {
    console.error('Error:', error);
    const errorMessage =
    errorMessages[error.code] || 'Ha ocurrido un error. Por favor, inténtalo de nuevo.';
    message.error(errorMessage);
  }

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
      console.log('Tienda creada')
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
      });

      await setDoc(doc(db, "stores", user.uid), {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        phone: user.phoneNumber,
      });
      console.log('Tienda creada')
       

      // await sendEmailVerification(user)
      // Otros procesos posteriores al registro, como redireccionar al usuario, mostrar un mensaje de éxito, etc.
      console.log('Usuario creado exitosamente:', user)
      
    } catch (error) {
      handleAuthError(error)
    } finally {
      window.location.href = '/verificar-numero'
    }
  }

  const logout = () => {
    signOut(auth)
  }

  const googleLogin = async () => {
    try {
      // await signInWithPopup(auth, provider)
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user
      await setDoc(doc(db, "stores", user.uid), {
        email: user.email,
        name: user.displayName,
        avatar: user.photoURL,
        phone: user.phoneNumber,
      });
    } catch (error) {
      handleAuthError(error)
    }
  }

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
