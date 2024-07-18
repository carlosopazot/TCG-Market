import {
  Button,
  Row,
  Col,
  Card,
  Typography,
  Flex,
  Divider,
  Form,
  Input,
} from 'antd'
import { useContext, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import { FacebookFilled, GoogleOutlined } from '@ant-design/icons'
import { useNavigate, Link } from 'react-router-dom'
import { QuestionCircleFilled } from '@ant-design/icons'
import { Helmet } from 'react-helmet-async'

const { Title, Text } = Typography

const Login = () => {
  const { googleLogin, facebookLogin, login, user } = useContext(UserContext)
  const [values, setValues] = useState({
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  const onFinish = async (values) => {
    try {
      await login(values)
    } catch (error) {
      console.error('Error logging in:', error)
    } 
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const loginGoogle = async () => {
    try {
      await googleLogin()
    } catch (error) {
      console.error('Error logging in with Google:', error)
    } finally {
      if(user) {
        navigate(-1)
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Inicia sesión - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row justify="center">
        <Col xs={24} md={12} lg={12} xl={8}>
          <Card title={<Title style={{ margin: 0 }} level={3}>Inicia sesión</Title>} >
            <Flex gap={8} vertical>
              <Title level={5}>Ingresa con tus redes</Title>
              <Button onClick={loginGoogle} size="large">
                <GoogleOutlined style={{ color: 'red' }} />
                Ingresa con Google
              </Button>
              <Button disabled onClick={facebookLogin} size="large">
                <FacebookFilled style={{ color: 'blue' }} />
                Ingresa con Facebook
              </Button>
            </Flex>
            <Divider></Divider>
            <Form
              name="basic"
              initialValues={{
                remember: true,
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="on"
              layout="vertical"
            >
              <Form.Item
                label="Correo"
                name="email"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
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
                style={{ marginBottom: '1rem' }}
                rules={[
                  {
                    required: true,
                    message: 'Please input your password!',
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
              <Flex style={{ marginBottom: '1rem' }} justify="end">
                <Button
                  icon={<QuestionCircleFilled />}
                  type="link"
                  size="small"
                  onClick={() => navigate('/recuperar-contrasena')}
                >
                  Olvidé mi contrasena
                </Button>
              </Flex>
              <Form.Item>
                <Button block size="large" type="primary" htmlType="submit">
                  Ingresar
                </Button>
              </Form.Item>
            </Form>
            <Divider></Divider>
            <Flex>
              <Text>¿No tienes una cuenta?</Text>
              <Link to="/registro">
                <Button type="link" size="small">
                  Crea una cuenta
                </Button>
              </Link>
            </Flex>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Login
