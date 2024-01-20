
import { Layout, Flex, Button } from 'antd'
import CartWidget from './CartWidget'
import UserMenu from '../UserMenu/UserMenu'
import NavMenu from '../NavMenu/NavMenu'
import Logo from '../../assets/images/card-games.png'
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from 'react-router-dom'
import './styles.css'

const { Header } = Layout

const Navbar = () => {

  const { user } = useContext(UserContext)

  return (
    <Header className='navbar'>
      <Flex gap={10} className="navbar-left">
        <Link to='/' className="brand">
          <img src={Logo} className='logo' alt="Logo" />
          <h2 className='logo-title'>Card Market</h2>
        </Link>
      </Flex>
      <NavMenu mode='horizontal'></NavMenu> 
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
    </Header>
  )
}

export default Navbar