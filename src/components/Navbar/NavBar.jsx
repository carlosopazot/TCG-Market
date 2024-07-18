import { Layout, Flex, Button, Badge } from 'antd'
import Searchbar from '../Searchbar/Searchbar'
import DarkMode from '../DarkMode/DarkMode'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import './styles.css'
import { MenuOutlined } from '@ant-design/icons'
import Sidebar from '../Sidebar/Sidebar'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import NavLogo from './NavLogo'

const { Header } = Layout

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)
  const [ openDrawer, setOpenDrawer ] = useState(false)
  const showDot = user && user.phone === null ? true : false
  const color = '#FFC53D'

  const openDrawerMenu = () => {
    setOpenDrawer(true)
  }

  const closeDrawerMenu = () => {
    setOpenDrawer(false)
  }

  return (
    <Header className={`navbar ${isDarkMode ? 'navbar-dark' : ''} `}>
      <div className="main">
        <Flex justify='space-between' align='center' gap={12}>
          <NavLogo></NavLogo>
          <Searchbar></Searchbar>
          <Flex gap={8} align="center">
            <DarkMode></DarkMode>
            <Flex gap={10} align="center">
               {user && user.logged ? (
                  <Button onClick={openDrawerMenu} type='text' size='large' icon={<Badge color={color} dot={showDot}><AvatarProfile item={user} /></Badge>} />
                ) : (
                  <Button onClick={openDrawerMenu} type='text' size='large' icon={<MenuOutlined />}></Button>
               )}
               <Sidebar onClose={closeDrawerMenu} open={openDrawer}/>
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Header>
  )
}

export default Navbar
