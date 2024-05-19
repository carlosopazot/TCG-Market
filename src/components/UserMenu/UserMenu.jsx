import { Button, Dropdown, Badge,  } from 'antd'
import { LogoutOutlined, ShopOutlined, UserOutlined, ExclamationCircleOutlined, } from '@ant-design/icons'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { StoreContext } from '../../context/StoreContext'
import { Link } from 'react-router-dom'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import './styles.css'

const UserMenu = ({ name }) => {
  const { logout, user } = useContext(UserContext)
  const { setStore } = useContext(StoreContext)
  const [ show, setShow ] = useState(false)
  const color = '#FFC53D'

  const handleLogout = () => {
    logout()
    setStore(null)
  }

  useEffect(() => {
    if (user.phone === null) {
      setShow(true)
    } else {
      setShow(false)
    }
  }, [user])
  
  const items = [
    {
      key: '1',
      label: (
        <>
          <Link to={`/tienda`}>
            Tienda
          </Link>
          {user.phone === null && <ExclamationCircleOutlined style={{ marginLeft: '4px', color: `${color}` }} />}
        </>
      ),
      icon: <ShopOutlined />,
      disabled: user.phone === null,
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
      key: '5',
      label: (
        <Link onClick={handleLogout}>
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
      <Button 
        type='text' 
        size="large" 
        icon={
          <Badge color={color} dot={show}>
            <AvatarProfile name={name} size='small' src={user.avatar || null}/>
          </Badge>
        }
      />
    </Dropdown>
  )
}

export default UserMenu
