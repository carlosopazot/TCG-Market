import { Button, Avatar, Dropdown } from 'antd'
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useContext } from "react";
import { UserContext } from '../../context/UserContext';
import { Link } from 'react-router-dom';

const UserMenu = ({ name }) => {

  const { logout } = useContext(UserContext)

  const items = [
    {
      key: '2',
      label: (
        <Link to='/'>
          <UserOutlined style={{ marginRight : '4px'}} />
        Perfil
        </Link>
      ),
    },
    {
      key: '3',
      label: (
        <Link onClick={logout}>
          <LogoutOutlined style={{ marginRight : '4px'}} />
          Cerrar sesión
        </Link>
      ),
    },
  ];
  return(
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomLeft"
      trigger={['click']}
    >
      <Button size='large'>
        <Avatar size="small" icon={<UserOutlined />} />
        <span style={{ marginLeft: '4px'}}>{ name }</span>
      </Button>
    </Dropdown>
  )
}

export default UserMenu