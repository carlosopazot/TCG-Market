
import { Drawer, Menu, Flex, Result, Button, Typography, Card } from 'antd'
import { useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { UserContext } from '../../context/UserContext'
import Logo from '../../assets/images/card-games.png'
import './styles.css'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import { HomeOutlined, ShopOutlined, UserOutlined } from '@ant-design/icons'


const { Title, Text } = Typography

const Sidebar = ({ onClose, open}) => {

  const navigate = useNavigate()
  const { user, logout } = useContext(UserContext) 
  const [current, setCurrent] = useState('1')

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

  const onClick = ({ key }) => {
    setCurrent(key)
    onClose()
    navigate(items.find(item => item.key === key).path)
    console.log('click', key)
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
    <Drawer onClose={onClose} open={open}>
      {user && user.logged ? (
        <Flex vertical gap={8}>
          <Card bordered={false}>
            <Flex gap={8}>
              <AvatarProfile size={48} item={user} />
              <Flex vertical>
                <Text type='secondary'>Bienvenido</Text>
                <Title style={{ margin: 0 }} level={4}>{user.name}</Title>
              </Flex>
            </Flex>
          </Card>
          <Menu onClick={onClick} selectedKeys={[current]} mode="vertical" items={items} />
          <Button onClick={handleLogout} type='default' block >Cerrar sesión</Button>
        </Flex>
      ) : (
        <>
          <Result
            icon={<img src={Logo} alt="Logo" style={{ width: 100 }} />}
            status="success"
            title="Bienvenido a TCGMarket!"
            subTitle="Empieza ahora a comprar y vender tus cartas de Magic The Gathering."
            extra={[
              <Flex gap={8} align='center' vertical justify='center' key={1}>
                <Button onClick={handleLogin} block size='large' type="primary">
                  Ingresar ahora
                </Button>
                {/* <Button block size='large' type="default">
                  Registrarme
                </Button> */}
              </Flex>
            ]}
          />
        </>
      )}
    </Drawer>
  )
}

export default Sidebar