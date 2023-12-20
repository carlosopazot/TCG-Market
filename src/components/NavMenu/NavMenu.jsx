import { Flex } from 'antd';
import { Link } from 'react-router-dom';

const links = [
  {
    label: 'Nuevas',
    href: '/cards/NM',
  },
  {
    label: 'Usadas',
    href: '/cards/PLD',
  },
  {
    label: 'Altamente usadas',
    href: '/cards/HP',
  },
];

const NavMenu = () => {
  return (
    <Flex gap={24}>
      {links.map((link, index) => (
        <Link key={index} to={link.href}>
          {link.label}
        </Link>
      ))}
    </Flex>
  );
};

export default NavMenu;