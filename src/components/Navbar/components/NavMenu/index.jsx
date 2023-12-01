import { useState } from 'react';
import { Menu } from 'antd';
const items = [
  {
    label: 'Inicio',
    key: 'home',
  },
  {
    label: 'Categorías',
    key: 'categories',
    children: [
      {
  
        label: 'Últimas subidas',
        key: 'setting:1',
      },
      {
        label: 'En oferta',
        key: 'setting:2',
      },
      {
        label: 'En tu localidad',
        key: 'setting:3',
      },
    ],
  },
];
const NavMenu = () => {
  const [current, setCurrent] = useState('home');
  const onClick = (e) => {
    setCurrent(e.key);
  };
  return <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />;
};
export default NavMenu;