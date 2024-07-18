
import { Drawer, Menu, Flex, Button, Card, Typography } from 'antd'
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import Logo from '../../assets/images/imagotipo.svg'
import LogoWhite from '../../assets/images/imagotipo-white.svg'
import './styles.css'
import { HomeOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'
import SidebarUserInfo from './SidebarUserInfo'

const { Text } = Typography

const Sidebar = ({ onClose, open}) => {

  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext)
  const { isDarkMode } = useContext(ThemeContext)

  const [current, setCurrent] = useState('home')

  const items = [
    {
      key: 'home',
      label: 'Inicio',
      path: '/',
      icon: <HomeOutlined />
    },
    {
      key: 'store',
      label: 'Tienda',
      path: '/tienda',
      icon: <ShopOutlined />,
      disabled: user.phone === null,
    },
    {
      key: 'account',
      label: 'Cuenta',
      path: '/cuenta',
      icon: <UserOutlined />
    }
  ]

  // const others = [
  //   {
  //     key: 'faq',
  //     label: 'Preguntas frecuentes',
  //     path: '/faq',
  //   },
  //   {
  //     key: 'soporte',
  //     label: 'Soporte',
  //     path: '/soporte',
  //   },
  //   {
  //     key: 'Contacto',
  //     label: 'Contacto',
  //     path: '/contacto',
  //   },
  //   {
  //     key: 'terminos',
  //     label: 'Términos y condiciones',
  //     path: '/terminos',
  //   },
  //   {
  //     key: 'privacidad',
  //     label: 'Política de privacidad',
  //     path: '/privacidad',
  //   },
  // ]

  const onClick = ({ key }) => {
    setCurrent(key)
    onClose()
    navigate(items.find(item => item.key === key).path)
  }

  const handleLogin = () => {
    navigate('/login')
    onClose()
  }

  const handleLogout = () => {
    logout()
    onClose()
  }

  return (
    <Drawer onClose={onClose} open={open} footer={user.logged && <Button onClick={handleLogout} type='text' block >Cerrar sesión</Button>}>
      <Flex vertical justify='center' gap={16}>
        {user && user.logged ? (
          <Flex vertical gap={16}>
            <SidebarUserInfo user={user} />
            <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
          </Flex>
        ) : (
          <Card bordered={false}>
            <Flex style={{ textAlign: 'center' }} justify='center' align='center' gap={16} vertical>
              <Text>Bienvenido a</Text>
              <img src={isDarkMode ? LogoWhite : Logo} alt="Logo" width={140} />
              <Text type='secondary'>Empieza ahora a comprar y vender tus cartas de Magic The Gathering.</Text>
              <Button size='large' onClick={handleLogin} block type='primary'>Ingresar ahora</Button>
            </Flex>
          </Card>
        )}
        {/* <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={others} /> */}
      </Flex>
    </Drawer>
  )
}

export default Sidebar