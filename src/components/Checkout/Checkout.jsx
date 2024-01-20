import { Row, Col, Form, Input, Typography, Card, Button, Result, List, Avatar, Flex, Empty } from "antd"
import { useContext, useState } from "react";
import { CartContext } from '../../context/CartContext'
import { Link } from "react-router-dom";
import { db } from '../../firebase/config'
import { collection, addDoc, writeBatch, query, where, documentId, getDocs } from "firebase/firestore";

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

  const handleSubmit = async () => {
    const order = {
      cliente: values,
      items: cart,
      total: totalCart(),
      date: new Date()
    }

    const batch = writeBatch(db)
    const ordersRef = collection(db, 'orders')
    const productRef = collection(db, 'cards')
    const itemsQuery = query(productRef, where( documentId(), 'in', cart.map(prod => prod.id) ) )
    const querySnapshot = await getDocs(itemsQuery)

    const outOfStock = []

    querySnapshot.docs.forEach(doc => {
      const item = cart.find(prod => prod.id === doc.id)
      const stock = doc.data().stock

      if(stock >= item.quantity) {
        batch.update(doc.ref, {
          stock: stock - item.quantity
        })
      } else {
        outOfStock.push(item)
      }
    })

    if (outOfStock.length === 0) {
      batch.commit()
        .then(() => { 
          addDoc(ordersRef, order).then((doc) => {
            setOrderId(doc.id)
            clearCart()
          });
        })
    } else {
      alert('items sin stock')
    }
  }
  
  if(orderId) {
    return(
      <Result
        status="success"
        title="Listo!"
        subTitle={`Tu codigo de orden es: ${orderId}`}
        extra={[
          <Link to='/' key="buy">
            <Button size="lg" type="primary" >
              Seguir comprando
            </Button>
          </Link>
        ]}
      />
    )
  }

  if (cart.length === 0) {
    return (
      <Empty description='No hay items en tu carro'>
        <Link to='/'>
          <Button type="primary" size="large">Volver a inicio</Button>
        </Link>
      </Empty>
    )
  }

  return (
    <>
      <Row>
        <Title level={4}>Finalizar compra</Title>
      </Row>
      <Row gutter={16} justify='start'>
        <Col md={12}>
          <Card>
            <List 
              itemLayout="horizontal"
              dataSource={cart}
              renderItem={(item,index) => (
                <List.Item>
                  <List.Item.Meta
                    key={index}
                    avatar={<Avatar shape="square" src={item.image} />}
                    title={item.name}
                    description={`$${item.price}`}
                  />
                </List.Item>
              )}
            />
            <Flex justify="space-between">
              <Title style={{ margin: 0 }} level={4}>Total</Title>
              <Title style={{ margin: 0 }} level={3}>${totalCart()}</Title>
            </Flex>
            <Flex>

            </Flex>
          </Card>
        </Col>
        <Col md={12}>
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
              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Enviar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default Checkout