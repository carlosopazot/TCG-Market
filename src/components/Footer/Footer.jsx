import { Layout, Row, Typography, Image, Col, Flex, Button } from "antd";
import './styles.css';
import Logo from '../../assets/images/imagotipo.svg'
import LogoWhite from '../../assets/images/imagotipo-white.svg'
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const { Footer } = Layout;
const { Text } = Typography;

const FooterHome = () => {
  const { isDarkMode } = useContext(ThemeContext)

  const LogoFooter = isDarkMode ? LogoWhite : Logo

  const termsList = [
    { title: 'Términos y condiciones', link: '/terminos' },
    { title: 'Políticas de privacidad', link: '/privacidad' },
  ]

  const aboutList = [
    { title: 'Preguntas frecuentes', link: '/faq' },
    { title: 'Sobre nosotros', link: '/nosotros' },
    { title: 'Contacto', link: '/contacto' },
  ]

  return (
    <Footer className={`footer ${isDarkMode ? 'footer-dark' : ''} `}>
      <div className="main">
        <Row gutter={[16,16]} justify="space-between">
          <Col xs={24} sm={24} md={10} xl={12}>
            <Flex gap={8} align='flex-start' vertical>
              <Image preview={false} width={120} src={LogoFooter}></Image>
              <Text>Encuentra las mejores cartas de Magic: The Gathering en un solo lugar.</Text>
              <Text type="secondary">© 2024 Sleeve. Todos los derechos reservados.</Text>
            </Flex>
          </Col>
          <Col xs={24} sm={24} md={12} xl={8}>
            <Row gutter={[12,12]}>
              <Col xs={12} sm={12} xl={12}>
                <Flex gap={12} align="flex-start" vertical>
                  {termsList.map((item, index) => (
                    <Button size="small" key={index} type="text" href={item.link}>{item.title}</Button>
                  ))}
                </Flex>
              </Col>
              <Col xs={12} sm={12} xl={12}>
                <Flex gap={12} align="flex-start" vertical>
                  {aboutList.map((item, index) => (
                    <Button size="small" key={index} type="text" href={item.link}>{item.title}</Button>
                  ))}
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

export default FooterHome;