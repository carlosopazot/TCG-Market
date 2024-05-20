import { Layout, Flex, Button, theme, Dropdown } from 'antd'
import UserMenu from '../UserMenu/UserMenu'
import Searchbar from '../Searchbar/Searchbar'
import Logo from '../../assets/images/card-games.png'
import DarkMode from '../DarkMode/DarkMode'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { Link, useNavigate } from 'react-router-dom'
import './styles.css'
import { MenuOutlined } from '@ant-design/icons'

const { Header } = Layout
const { useToken } = theme

const Navbar = () => {
  const { user } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)
  const navigate = useNavigate()

  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
    padding: '16px',
  };

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
                <UserMenu name={user.name} />
               ) : (
                  <Dropdown placement='bottomRight' dropdownRender={(menu) => (
                    <Flex style={contentStyle} gap={8} justify='start' vertical>
                      {menu}
                      <Button size='large' onClick={() => {navigate('/login')}} type="primary">Ingresar ahora</Button>
                    </Flex>
                  )}>
                    <Button type='text' size='large' icon={<MenuOutlined />}></Button>
                  </Dropdown>
               )}
            </Flex>
          </Flex>
        </Flex>
      </div>
    </Header>
  )
}

export default Navbar
