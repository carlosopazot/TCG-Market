import { createContext, useEffect, useState } from 'react'
import { auth, provider, fbProvider } from '../firebase/config'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { message } from 'antd'
import { useNavigate } from 'react-router-dom'

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

      // Actualizar el perfil del usuario con el nombre
      await updateProfile(user, {
        displayName: values.name,
      })

      // await sendEmailVerification(user)
      // Otros procesos posteriores al registro, como redireccionar al usuario, mostrar un mensaje de éxito, etc.
      console.log('Usuario creado exitosamente:', user)
      window.location.href = '/verificar-numero'
      
    } catch (error) {
      handleAuthError(error)
    }
  }

  const logout = () => {
    signOut(auth)
  }

  const googleLogin = () => {
    signInWithPopup(auth, provider)
  }

  const facebookLogin = () => {
    signInWithPopup(auth, fbProvider)
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('User:', user)
        // const username = user.displayName.split(' ')[0]

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
  }, [])

  return (
    <UserContext.Provider
      value={{ user, setUser, googleLogin, logout, facebookLogin, login, register }}
    >
      {children}
    </UserContext.Provider>
  )
}
