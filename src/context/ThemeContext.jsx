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

  const openMessage = (type, content) => {
    messageApi.open({
      type: type,
      content: content,
    })
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
      value={{ toggleDarkMode, isDarkMode, setIsDarkMode, openMessage }}
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
