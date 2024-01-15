import { Row, Col, Card, Typography, Form, Input, Button, Flex } from "antd"
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { Link } from "react-router-dom";


const { Title, Text } = Typography

const Register = () => {

  const { register } = useContext(UserContext);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    register(values);
  };

  return(
    <Row justify='center'>
      <Col xs={24} sm={16} lg={12} xl={8}>
        <Card>
          <Title level={4}>Crea tu cuenta</Title>
          <Text type="secondary">Ingresa tu datos para crear tu cuenta en Card Market</Text>
          <Form layout="vertical" onFinish={handleSubmit} autoComplete="off">
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}
            >
              <Input value={values.name} onChange={handleInputChange} name="name" />
            </Form.Item>
            <Form.Item
              label="Correo electronico"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please input your email!',
                },
              ]}
            >
              <Input value={values.email} onChange={handleInputChange} name="email" />
            </Form.Item>
            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
              ]}
            >
              <Input.Password value={values.password} onChange={handleInputChange} name="password" />
            </Form.Item>
            <Button block type="primary" htmlType="submit">Crear cuenta</Button>
          </Form>
            <Flex gap={4} layout='vertical' align="center">
              <p>¿Ya tienes cuenta?</p>
              <Link to='/login'>Inicia sesión</Link>
            </Flex>
        </Card>
      </Col>
    </Row>
  )
}

export default Register