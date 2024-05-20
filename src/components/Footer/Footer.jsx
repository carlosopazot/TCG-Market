import { Layout, Row, Typography, Image, Col, Flex } from "antd";
import './styles.css';
import Logo from '../../assets/images/card-games.png'
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const { Footer } = Layout;
const { Text } = Typography;

const FooterHome = () => {
  const { isDarkMode } = useContext(ThemeContext)
  return (
    <Footer className={`footer ${isDarkMode ? 'footer-dark' : ''} `}>
      <div className="main">
        <Row justify="center">
          <Col>
            <Flex gap={8} align="center">
              <Image preview={false} width={32} src={Logo}></Image>
              <Text>TCG Market</Text>
            </Flex>
          </Col>
        </Row>
      </div>
    </Footer>
  );
}

export default FooterHome;