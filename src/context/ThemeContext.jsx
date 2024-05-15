import { useState, useEffect, createContext } from 'react'
import { ConfigProvider, theme, message } from 'antd'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the value from localStorage, or default to false if not found
    return localStorage.getItem('isDarkMode') === 'true' || false
  })
  const algorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm

  const [messageApi, contextHolder] = message.useMessage()

  const errorMessages = {
    'auth/invalid-email': 'El correo es inválido',
    'auth/invalid-credential': 'Credencial inválida',
    'auth/wrong-password': 'Contraseña incorrecta',
    'auth/user-not-found': 'Usuario no encontrado',
    'auth/invalid-email-verified': 'Email no verificado',
    'auth/weak-password': 'La contraseña es muy débil',
    'auth/email-already-in-use': 'Correo ya está en uso',
    'auth/credential-already-in-use': 'Credencial ya está en uso',
    'auth/too-many-requests': 'Has solicitado demasiados códigos, intenta más tarde',
    'auth/invalid-verification-code': 'Código inválido',
    'auth/code-expired': 'Código expirado',
    'auth/account-exists-with-different-credential': 'El número ya está en uso con otra cuenta',
  }

  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    })
  }

  const handleAuthError = (error) => {
    const errorMessage =
      errorMessages[error.code] ||
      'Ha ocurrido un error. Por favor, inténtalo de nuevo.'
    openMessage('error', errorMessage)
  }

  const toggleDarkMode = () => {
    setIsDarkMode((previousValue) => {
      const newValue = !previousValue
      // Store the new value in localStorage
      localStorage.setItem('isDarkMode', newValue)
      return newValue
    })
  }

  useEffect(() => {
    // Remove the stored value from localStorage when the component unmounts
    return () => {
      localStorage.removeItem('isDarkMode')
    }
  }, [])

  return (
    <ThemeContext.Provider
      value={{ toggleDarkMode, isDarkMode, setIsDarkMode, openMessage, handleAuthError }}
    >
      <ConfigProvider
        theme={{
          algorithm: algorithm,
          token: {
            fontFamily: 'DM Sans',
          },
        }}
      >
        {contextHolder}
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
