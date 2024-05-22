import { Row, Col, Card, Form, Input, Button, Typography, Result, Flex } from 'antd';
import { useState, useContext, useEffect } from 'react';
import { auth } from '../../firebase/config';
import { RecaptchaVerifier, linkWithPhoneNumber, } from 'firebase/auth';
import { UserContext } from '../../context/UserContext';
import { db } from '../../firebase/config';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Helmet } from 'react-helmet-async';
import './styles.css'

const { Title, Text } = Typography;

const VerifyNumber = () => {
  const { user, setUser } = useContext(UserContext)
  const { openMessage, handleAuthError } = useContext(ThemeContext)
  const [ number, setNumber ] = useState('')
  const [ code, setCode ] = useState('')
  const [ confirmationResult, setConfirmationResult ] = useState(null)
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null);



  const prefix = '+569'

  useEffect(() => {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: () => {
        console.log('reCAPTCHA resolved..')
      }
    });
    // Set the recaptchaVerifier in state
    setRecaptchaVerifier(recaptchaVerifier);
  }, []);

  const navigateToHome = () => {
    navigate('/')
  }

  const createStore = async (user) => {
    try {
      const userRef = doc(db, 'stores', user.uid);
      const userDoc = await getDoc(userRef);
      if (!userDoc.exists()) {
        await setDoc(userRef, {
          ...JSON.parse(JSON.stringify(user))
        });
        console.log('Document created for new user:', user.uid);
      } else {
        console.log('Existing user logged in:', user.uid);
      }
    } catch (error) {
      console.error('Error creating store:', error)
    }
  }

  const handleSendOtp = async () => {
    try {
      setLoading(true);
      const currentUser = auth.currentUser
      const phoneNumber = `${prefix}${number}`
      linkWithPhoneNumber(currentUser, phoneNumber, recaptchaVerifier)
        .then((result) => {
          setConfirmationResult(result);
          openMessage('success', 'Código enviado')
        })
        .catch((err) => {
          handleAuthError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
        console.log('error sending otp ' + error)
    }
  }

  const verifyCode = async () => {
    try {
      setLoading(true);
      confirmationResult.confirm(code)
        .then((result) => {
          const userPhone = result.user;
          setUser({
            ...user,
            phone: userPhone.phoneNumber,
            logged: true,
          })
          createStore({
            name: user.name,
            email: user.email,
            uid: user.uid,
            avatar: user.avatar,
            phone: userPhone.phoneNumber,
          })
          openMessage('success', 'Número verificado') 
        })
        .catch((err) => {
          handleAuthError(err);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.log('error verifying code ' + error)
    }
  }

  const handleNumberChange = (e) => {
    setNumber(e.target.value)
  }

  const handleCodeChange = (e) => {
    setCode(e)
  }

  if(user.phone !== null) {
    return (
      <main className='main'>
        <Row justify='center'>
          <Col md={12} lg={8}>
            <Card>
              <Result
                status="success"
                title="Listo!"
                subTitle="Tu cuenta ya está verificada."
                extra={[
                  <Button onClick={navigateToHome} type="primary" key="home">
                   Ir al inicio
                  </Button>,
                ]}
              />
            </Card>
          </Col>
        </Row>
      </main>
    )
  }

  return (
    <>
      <Helmet>
        <title>Verifica tu número - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <div id='recaptcha-container'></div>
      <Row justify='center'>
        <Col md={12} lg={8}>
            <Card extra={<Button size='small' type='link' onClick={()=>{navigate('/')}} >Omitir</Button>} title={<Title style={{ margin: 0 }} level={4}>Verifica tu teléfono</Title>}>
              { confirmationResult === null ? (
                <Flex gap={16} vertical>
                  <Text>Ingresa tu número de teléfono para recibir un código de verificación</Text>
                  <Form layout='vertical' onFinish={handleSendOtp}>
                    <Form.Item
                      name='number'
                      label='Número de teléfono'
                      
                      rules={[
                        {
                          required: true,
                          message: '¡Ingresa un número!',
                        },
                      ]}
                    >
                      <Input maxLength={8} prefix='+569' onChange={handleNumberChange} size='large'></Input>
                    </Form.Item>
                    <Flex justify='end'>
                      
                      <Button size='large'  htmlType='submit' type='primary' loading={loading}>
                        {loading ? 'Enviando...' : 'Enviar código'}
                      </Button>
                    </Flex>
                  </Form>
                </Flex>
              ) : (
                // .ant-form-item .ant-form-item-control-input-content
                <Flex gap={16} vertical>
                  <Text>Te hemos enviado un código de <b>6 dígitos</b> al número de teléfono proporcionado, ingresalo abajo.</Text>
                  <Form layout='vertical' onFinish={verifyCode}>
                    <Form.Item
                      style={{ marginBottom: '1rem' }}
                      name='code'
                      rules={[
                        {
                          required: true,
                          message: 'Please input your code!',
                        },
                      ]}
                    >
                      <Input.OTP type='number' size='large' onChange={handleCodeChange}/>
                    </Form.Item>
                    <Form.Item>
                      <Flex>
                        <Button size='small' type='link' onClick={handleSendOtp}>Reenviar código</Button>
                      </Flex>
                    </Form.Item>
                    <Flex justify='space-between'>
                      <Button size='large' onClick={()=>{setConfirmationResult(null)}} >Atrás</Button>
                      <Button size='large'  htmlType='submit' type='primary' loading={loading}>
                        {loading ? 'Verificando...' : 'Verificar'}
                      </Button>
                    </Flex>
                  </Form>
                </Flex>
              )}
            </Card>
        </Col>
      </Row>
    </>
  );
}

export default VerifyNumber;