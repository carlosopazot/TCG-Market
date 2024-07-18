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
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import HelmetMeta from '../HelmetMeta/HelmetMeta'

const { Title, Text } = Typography

const Register = () => {

  const { register } = useContext(UserContext)
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(false)
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
    setLoading(true)
    try {
      await register(values)
      if (user.logged && user.emailVerified) {
        navigate('/')
      } else {
        navigate('/verificar-email')
      }
    } catch (error) {
      console.log('Registration failed:', error)
    } finally {
      setLoading(false)
    }
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <HelmetMeta title="Crear cuenta" />
      <Row justify="center">
        <Col xs={24} md={12} lg={12} xl={8}>
          <Card title={<Title className='m-0' level={3}>Crea tu cuenta</Title>}>
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
                label="Contraseña"
                name="password"
                rules={[
                  {
                    required: true,
                    message: 'Ingresa una contraseña!',
                  },
                ]}
                help="La contraseña debe tener al menos 6 caracteres"
                style={{ marginBottom: '2.5rem' }}
              >
                <Input.Password
                  size="large"
                  onChange={handleInputChange}
                  value={values.password}
                  name="password"
                />
              </Form.Item>
              <Form.Item>
                <Button loading={loading} block size="large" type="primary" htmlType="submit">
                  {loading ? 'Creando cuenta...' : 'Crear cuenta'}
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Flex>
              <Text>¿Ya tienes una cuenta?</Text>
              <Link to="/login">
                <Button type="link" size="small">
                  Inicia sesión
                </Button>
              </Link>
            </Flex>
          </Card>
        </Col>
    </Row>
  </>
  )
}

export default Register
