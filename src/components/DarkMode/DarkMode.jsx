import { Button } from 'antd'
import { useContext } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import { SunOutlined, MoonOutlined } from '@ant-design/icons'

const DarkMode = () => {
  const { isDarkMode, toggleDarkMode } = useContext(ThemeContext)
  return (
    <Button 
      size='large' 
      onClick={toggleDarkMode} 
      icon={isDarkMode ? <SunOutlined /> : <MoonOutlined /> } 
      type='Text'
    />
  )
}

export default DarkMode
