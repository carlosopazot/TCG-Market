import { Button, Avatar, Dropdown, Badge, Typography, Flex  } from 'antd'
import { LogoutOutlined, ShopOutlined, UserOutlined, ExclamationCircleOutlined, TagsOutlined } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'
import DarkMode from '../DarkMode/DarkMode'
import './styles.css'

const { Text } = Typography

const UserMenu = ({ name }) => {
  const { logout, user } = useContext(UserContext)
  const [ show, setShow ] = useState(false)
  const color = '#FFC53D'
  const navigate = useNavigate()


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
      disabled: user.phone === null,
    },
    {
      key: '1',
      label: (
        <>
          <Link to="/tienda">
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
          <Avatar size="small" src={user.avatar || null }>
            {name && name.charAt(0).toUpperCase()}
          </Avatar>
        </Badge>
      </Button>
    </Dropdown>
  )
}

export default UserMenu
