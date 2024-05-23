import { Layout, Flex, Button, theme, Dropdown, Drawer, Badge } from 'antd'
import UserMenu from '../UserMenu/UserMenu'
import Searchbar from '../Searchbar/Searchbar'
import Logo from '../../assets/images/card-games.png'
import DarkMode from '../DarkMode/DarkMode'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { MenuOutlined } from '@ant-design/icons'
import Sidebar from '../Sidebar/Sidebar'
import AvatarProfile from '../AvatarProfile/AvatarProfile'

const { Header } = Layout
const { useToken } = theme

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)
  const [ openDrawer, setOpenDrawer ] = useState(false)
  const navigate = useNavigate()
  const showDot = user && user.phone === null ? true : false

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: '16px',
  };

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
          <Link to="/" className="brand">
            <img src={Logo} className="logo" alt="Logo" />
            {/* <h2 className={`logo-title ${isDarkMode ? 'logo-title-dark' : ''} `}>
              Card Market
            </h2> */}
          </Link>
          <Searchbar></Searchbar>
          <Flex gap={8} align="center">
            <DarkMode></DarkMode>
            <Flex gap={10} align="center">
               {user && user.logged ? (
                  <Button onClick={openDrawerMenu} type='text' size='large' icon={<Badge dot={showDot}><AvatarProfile item={user} /></Badge>} />
                ) : (
                  <Button onClick={openDrawerMenu}  type='text' size='large' icon={<MenuOutlined />}></Button>
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
