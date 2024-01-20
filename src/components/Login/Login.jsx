import { Form, Input, Button, Row, Col, Card, Typography, Flex, Divider } from "antd"
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";
import { GoogleOutlined } from "@ant-design/icons";

const { Title } = Typography

const Login = () => {

  const { login, googleLogin } = useContext(UserContext)

  const [ values, setValues ] = useState({
    email: '',
    password: ''
  })

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    login(values);
  };


  return (
    <Row justify='center'>
      <Col xs={24} sm={16} lg={12} xl={8}>
        <Card>
          <Title level={3}>Inicia sesión</Title>
          <Flex vertical>
            <Title level={5}>Ingresa con tus redes sociales</Title>
            <Button onClick={googleLogin} size="large"><GoogleOutlined style={{ color: 'red' }} />Ingresa con Google</Button>
          </Flex>
          <Divider></Divider>
          <Title level={5}>Ingresa con tu correo</Title>
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off" >
            <Form.Item
              label="Correo electronico"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input size="large" value={values.email} onChange={handleInputChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password size="large" value={values.password} onChange={handleInputChange} name="password" />
            </Form.Item>
            <Button block type="primary" htmlType="submit">Ingresar</Button>
            <Flex gap={4} layout='vertical' align="center">
              <p>¿No tienes una cuenta?</p>
              <Link to='/register'>Regístrate</Link>
            </Flex>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Login