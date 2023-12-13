import { Button, Avatar, Dropdown } from 'antd'
import { UserOutlined, ToolOutlined, LogoutOutlined } from '@ant-design/icons';
const items = [
  {
    key: '1',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
        <ToolOutlined style={{ marginRight : '4px'}} />
       Configuración
      </a>
    ),
    disabled: true
  },
  {
    key: '2',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
        <UserOutlined style={{ marginRight : '4px'}} />
       Perfil
      </a>
    ),
    disabled: true
  },
  {
    key: '3',
    label: (
      <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
        <LogoutOutlined style={{ marginRight : '4px'}} />
        Cerrar sesión
      </a>
    ),
    disabled: true
  },
];

const UserMenu = () => {
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
        <span style={{ marginLeft: '4px'}}>Nombre</span>
      </Button>
    </Dropdown>
  )
}

export default UserMenu