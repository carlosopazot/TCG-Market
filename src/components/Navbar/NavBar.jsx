
import { Layout, Flex } from 'antd'
import CartWidget from './CartWidget'
// import UserMenu from '../UserMenu/UserMenu'
import NavMenu from '../NavMenu/NavMenu'
import Logo from '../../assets/images/card-games.png'
import { Link } from 'react-router-dom'
import './styles.css'

const { Header } = Layout

const Navbar = () => {

  return (
    <>
      <Header className='navbar'>
        <Flex gap={10} className="navbar-left">
          <Link to='/' className="brand">
            <img src={Logo} className='logo' alt="Logo" />
            <h2 className='logo-title'>Card Market</h2>
          </Link>
          <NavMenu></NavMenu>
        </Flex>
        <Flex gap={10} align='center'>
          <CartWidget/>
          {/* <UserMenu /> */}
        </Flex>
      </Header>
    </>
  )
}

export default Navbar