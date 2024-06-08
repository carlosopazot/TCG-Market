import { Form, Row, Col, Input, Button, Typography, Card, Flex, Result } from 'antd';
import { Helmet } from 'react-helmet-async';
import { auth } from '../../firebase/config';
import { sendPasswordResetEmail } from 'firebase/auth';
import { ThemeContext } from '../../context/ThemeContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

const ResetPassword = () => {

  const { openMessage } = useContext(ThemeContext)
  const [emailSent, setEmailSent] = useState(false)
  const navigate = useNavigate()

  const onFinish = async (values) => {
    const { email } = values
    try {
      await sendPasswordResetEmail(auth, email)
      setEmailSent(true)
      openMessage('success', 'Correo electrónico enviado')
    } catch (error) {
      openMessage('error', 'Error al enviar el correo electrónico')
      console.error('Error sending email:', error)
    }
  }

  return (
    <>
      <Helmet>
        <title>Restablecer contraseña - Card Market</title>
        <meta name="description" content="Card Market - Restablece tu contraseña" />
      </Helmet>
      <Row justify="center">
        <Col xs={24} md={12}>
          {!emailSent ? (
            <Card title={<Title style={{ margin: 0 }} level={4}>Restablece tu contraseña</Title>}>
              <Flex vertical gap={16}>
                <Text type='secondary'>Ingresa tu correo electrónico y te enviaremos un enlace para recuperar tu contraseña.</Text>
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                >
                  <Form.Item
                    label="Correo Electrónico"
                    name="email"
                    rules={[{ required: true, message: 'Ingresa tu correo electrónico' }]}
                  >
                    <Input size='large' />
                  </Form.Item>

                  <Button block size='large' type="primary" htmlType="submit">Enviar</Button>

                </Form>
              </Flex>
            </Card>
          ):(
            <Card>
              <Result
                status="success"
                title="Listo!"
                subTitle="Te hemos enviado un correo electrónico con un enlace para restablecer tu contraseña. Revisa tu bandeja de entrada."
                extra={[
                  <Button onClick={() => {setEmailSent(false)}} type="default" key="resend">
                    Reenviar 
                  </Button>,
                  <Button key="home" type='primary' onClick={()=>{navigate('/')}}>Ir a inicio</Button>,
                ]}
              />
            </Card>
         )}
        </Col>
      </Row>
    </>
  );
}

export default ResetPassword;