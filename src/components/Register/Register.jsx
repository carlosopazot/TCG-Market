import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Typography,
  Flex,
  Divider,
  Button,
} from 'antd'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { Link, useNavigate } from 'react-router-dom'

const { Title, Text } = Typography

const Register = () => {
  const { register } = useContext(UserContext)
  const [values, setValues] = useState({
    email: '',
    password: '',
    name: '',
    phone: '',
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const onFinish = async (values) => {
    register(values)
    navigate('/verificar-cuenta')
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <div className="main">
      <Row justify="center">
      <Col xs={24} md={12}>
        <Card>
          <Title level={3}>Crea tu cuenta</Title>
          <Divider></Divider>
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
            layout="vertical"
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Ingresa tu nombre!',
                },
              ]}
            >
              <Input
                size="large"
                onChange={handleInputChange}
                value={values.name}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Correo"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Ingresa un correo válido!',
                  type: 'email',
                },
              ]}
            >
              <Input
                size="large"
                onChange={handleInputChange}
                value={values.email}
                name="email"
                placeholder="Ej: juan@email.com"
              />
            </Form.Item>

            <Form.Item
              label="N° de teléfono"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Ingresa un numero valido!',
                },
              ]}
            >
              <Input
                size="large"
                onChange={handleInputChange}
                value={values.phone}
                name="phone"
                placeholder="Ej: 912345678"
                style={{ width: '100%' }}
              />
            </Form.Item>

            <Form.Item
              label="Contraseña"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Ingresa una contraseña!',
                },
              ]}
            >
              <Input.Password
                size="large"
                onChange={handleInputChange}
                value={values.password}
                name="password"
              />
            </Form.Item>
            <Form.Item>
              <Button block size="large" type="primary" htmlType="submit">
                Crear cuenta
              </Button>
            </Form.Item>
          </Form>
          <Divider></Divider>
          <Flex>
            <Text>Ya tienes una cuenta?</Text>
            <Link to="/login">
              <Button type="link" size="small">
                Inicia sesión
              </Button>
            </Link>
          </Flex>
        </Card>
      </Col>
    </Row>
    </div>
  )
}

export default Register
