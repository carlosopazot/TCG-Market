import { useState, createContext } from 'react'
import { ConfigProvider, theme } from 'antd'

export const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
  const { defaultAlgorithm, darkAlgorithm } = theme
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleDarkMode = () => {
    setIsDarkMode((previousValue) => !previousValue)
  }

  return (
    <ThemeContext.Provider
      value={{ toggleDarkMode, isDarkMode, setIsDarkMode }}
    >
      <ConfigProvider
        theme={{
          algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
          token: {
            fontFamily: 'DM Sans',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </ThemeContext.Provider>
  )
}
