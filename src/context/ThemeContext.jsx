import { useState, createContext } from 'react'
import { ConfigProvider, theme, message } from 'antd'
import { errorMessages } from '../utils/utils'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('isDarkMode') === 'true' || false
  })

  const systemAlgorithm = window.matchMedia('(prefers-color-scheme: dark)').matches
  const algorithm = isDarkMode ? darkAlgorithm : defaultAlgorithm || systemAlgorithm
  

  const [messageApi, contextHolder] = message.useMessage()

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
      localStorage.setItem('isDarkMode', newValue)
      return newValue
    })
  }

  return (
    <ThemeContext.Provider
      value={{ toggleDarkMode, isDarkMode, setIsDarkMode, openMessage, handleAuthError }}
    >
      <ConfigProvider
        theme={{
          algorithm: algorithm,
          token: {
            fontFamily: 'DM Sans'
          },
        }}
      >
        {contextHolder}
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
