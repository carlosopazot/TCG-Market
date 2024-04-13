import { Button, Dropdown, Badge, Typography, Flex  } from 'antd'
import { LogoutOutlined, ShopOutlined, UserOutlined, ExclamationCircleOutlined, TagsOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import DarkMode from '../DarkMode/DarkMode'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import './styles.css'

const { Text } = Typography

const UserMenu = ({ name }) => {
  const { logout, user } = useContext(UserContext)
  const { store } = useContext(StoreContext)
  const [ show, setShow ] = useState(false)
  const color = '#FFC53D'


  useEffect(() => {
    if (user.phone === null) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [user])
  
  const items = [
    {
      key: '0',
      label: (
        <Link to="/agregar-carta">
          Vender carta
        </Link>
      ),
      icon: <TagsOutlined />,
      disabled: user.phone === null || !store.location || !store.dollar,
    },
    {
      key: '1',
      label: (
        <>
          <Link to={`/tienda/${user.uid}`}>
            Tienda
          </Link>
          {user.phone === null && <ExclamationCircleOutlined style={{ marginLeft: '4px', color: `${color}` }} />}
        </>
      ),
      icon: <ShopOutlined />,
    },
    {
      key: '3',
      label: (
        <Link to="/cuenta">
          Cuenta
        </Link>
      ),
      icon: <UserOutlined />,
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <Flex justify='space-between'>
          <Text>Tema</Text>
          <DarkMode/>
        </Flex>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '5',
      label: (
        <Link onClick={logout}>
          Cerrar sesión
        </Link>
      ),
      icon: <LogoutOutlined />,
    },
  ]
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      trigger={['click']}
    >
      <Button size="large">
        <Badge color={color} dot={show}>
          <AvatarProfile name={name} size='small' src={user.avatar || null}>
          </AvatarProfile>
        </Badge>
      </Button>
    </Dropdown>
  )
}

export default UserMenu
