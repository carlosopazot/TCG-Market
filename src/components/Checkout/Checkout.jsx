import { Row, Col, Form, Input, Typography, Card, Button } from "antd"
import { useContext, useState } from "react";
import { CartContext } from '../../context/CartContext'
import { db } from '../../firebase/config'
import { collection, addDoc, writeBatch, query, where, documentId } from "firebase/firestore";

const { Title } = Typography

const Checkout = () => {
  const { cart, totalCart, clearCart } = useContext(CartContext)
  const [values, setValues] = useState ({
    name: '',
    lastname: '',
  })
  const [ orderId, setOrderId] = useState(null)

  const handleInputChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (values) => {
    const order = {
      cliente: values,
      items: cart,
      total: totalCart(),
      date: new Date()
    }


    const batch = writeBatch(db)
    const ordersRef = collection(db, 'orders')
    const productRef = collection(db, 'productos')
    const itemDocs = query(productRef, where( documentId(), 'in', cart.map(prod => prod.id) ) )
    console.log(cart.map(prod => prod.id))
    
    // addDoc(ordersRef, order).then((doc) => {
    //     setOrderId(doc.id)
    //     clearCart()
    // })
  }
  
  if(orderId) {
    return(
      <Row>
        <Col>
          <Card>
            <h1>Listo</h1>
            <h2>Hemos recibido tu orden de compra</h2>
            <p>Tu codigo de orden es: <b>{orderId}</b> </p>
          </Card>
        </Col>
      </Row>
    )
  }

  return (
    <Row justify='start'>
      <Col md={12}>
        <Title level={4}>Checkout</Title>
        <Card>
        <Form
            name="basic"
            layout="vertical"
            onFinish={handleSubmit}
            autoComplete="off"
          >
            <Form.Item
              label="Nombre"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar un nombre!',
                },
              ]}
            >
              <Input value={values.name} onChange={handleInputChange} name="name"/>
            </Form.Item>
            <Form.Item
              label="Apellido"
              name="lastname"
              rules={[
                {
                  required: true,
                  message: 'Debes ingresar un apellido!',
                },
              ]}
            >
              <Input value={values.lastname} onChange={handleInputChange} name="lastname"/>
            </Form.Item>

            <Form.Item
            >
              <Button type="primary" htmlType="submit" block>
                Enviar
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  )
}

export default Checkout