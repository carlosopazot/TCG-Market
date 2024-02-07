import { Button, Avatar, Dropdown } from 'antd'
import {
  HeartOutlined,
  LogoutOutlined,
  ShopOutlined,
  UserOutlined,
} from '@ant-design/icons'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link } from 'react-router-dom'
import './styles.css'

const UserMenu = ({ name }) => {
  const { logout, user } = useContext(UserContext)
  const initial = name.split('')[0]
  const username = name.split(' ')[0]

  const items = [
    {
      key: '1',
      label: (
        <Link to="/tienda">
          <ShopOutlined style={{ marginRight: '4px' }} />
          Tienda
        </Link>
      ),
    },
    {
      key: '2',
      label: (
        <Link to="/Favoritos">
          <HeartOutlined style={{ marginRight: '4px' }} />
          Favoritos
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link to="/favoritos">
          <UserOutlined style={{ marginRight: '4px' }} />
          Perfil
        </Link>
      ),
    },
    {
      type: 'divider',
    },
    {
      key: '4',
      label: (
        <Link onClick={logout}>
          <LogoutOutlined style={{ marginRight: '4px' }} />
          Cerrar sesión
        </Link>
      ),
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
        <Avatar size="small" src={user.avatar}>
          {initial}
        </Avatar>
        <span className="text-user">{username}</span>
      </Button>
    </Dropdown>
  )
}

export default UserMenu
