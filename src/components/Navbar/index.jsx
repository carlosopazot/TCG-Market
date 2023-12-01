
import { Layout, Flex } from 'antd'
import CardWidget from './components/CardWidget';
import UserMenu from './components/UserMenu';
import NavMenu from './components/NavMenu';
import Logo from '../../assets/images/card-games.png'
import './styles.css'

const { Header } = Layout

const Navbar = () => {

  return (
    <>
      <Header className='navbar'>
        <Flex gap={10} className="navbar-left">
          <div className="brand">
            <img src={Logo} className='logo' alt="Logo" />
            <h2 className='logo-title'>Card Market</h2>
          </div>
          <NavMenu></NavMenu>
        </Flex>
        <Flex gap={10} align='center'>
          <CardWidget/>
          <UserMenu />
        </Flex>
      </Header>
    </>
  )
}

export default Navbar