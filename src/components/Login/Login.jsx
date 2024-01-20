import { Button, Row, Col, Card, Typography, Flex, } from "antd"
import { useContext, } from "react";
import { UserContext } from "../../context/UserContext";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography

const Login = () => {

  const { googleLogin } = useContext(UserContext)

  return (
    <Row justify='center'>
      <Col xs={24} sm={16} lg={12} xl={8}>
        <Card>
          <Title level={3}>Inicia sesión</Title>
          <Flex vertical>
            <Title level={5}>Ingresa con tus redes sociales</Title>
            <Button onClick={googleLogin} size="large">
              <GoogleOutlined style={{ color: 'red' }} />
              Ingresa con Google
            </Button>
          </Flex>
        </Card>
      </Col>
    </Row>
  )
}

export default Login