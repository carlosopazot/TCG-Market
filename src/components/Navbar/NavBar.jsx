
import { Layout, Flex, Button, Typography } from 'antd'
import CartWidget from './CartWidget'
import UserMenu from '../UserMenu/UserMenu'
import NavMenu from '../NavMenu/NavMenu'
import Logo from '../../assets/images/card-games.png'
import DarkMode from '../DarkMode/DarkMode'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from '../../context/ThemeContext'
import { Link } from 'react-router-dom'
import './styles.css'

const { Header } = Layout

const Navbar = () => {

  const { user } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)

  return (
    <Header className={`navbar ${isDarkMode ? 'navbar-dark' : '' } `}>
      <Flex gap={10} className="navbar-left">
        <Link to='/' className="brand">
          <img src={Logo} className='logo' alt="Logo" />
          <h2 className={`logo-title ${isDarkMode ? 'logo-title-dark' : '' } `}>Card Market</h2>
        </Link>
      </Flex>
      <NavMenu mode='horizontal'></NavMenu>
      <Flex gap={24} align='center'>
        <DarkMode></DarkMode>
        <Flex gap={10} align='center'>
          <CartWidget/>
          {!user.logged 
            ? 
            <Link to='/login'>
              <Button size='large' type='primary'>Ingresar</Button>
            </Link>
            :
            <UserMenu name={user.name} />
          }
        </Flex>
      </Flex>
    </Header>
  )
}

export default Navbar