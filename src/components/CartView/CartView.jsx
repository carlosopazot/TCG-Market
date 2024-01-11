import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Col, Row, Image, Typography, Card, Button, Empty, Flex } from "antd";

const { Title } = Typography

const CartView = () => {
  const { cart, totalCart, clearCart, removeItem } = useContext(CartContext);
  if (cart.length === 0) return (
    <Row>
      <Col xs={24}>
        <Title level={3}>Carro de Compra</Title>
        <Card>
          <Empty description='Tu carro de compra esta vacío'></Empty>
        </Card>
      </Col>
    </Row>
  )
  return (
    <>
      <Row justify='space-between'>
        <Col>
          <Title level={3}>Carro de Compra</Title>
        </Col>
        <Button onClick={clearCart}>Vaciar carro</Button>
      </Row>
      <Row gutter={16}>
      {cart.map((item) => (
        <Col xs={24} key={item.id}>
          <Card 
          style={{ marginBottom: '1rem' }} >
            <Row gutter={16}>
              <Col sm={6}>
                <Image src={item.image}></Image>
              </Col>
              <Col sm={13}>
                <Title style={{ margin: 0 }} level={4}>{item.name}</Title>
                <Title style={{ margin: 0, marginBottom: '1rem' }} level={4}>{item.set}</Title>
                <Button size="sm" onClick={() => removeItem(item.id)}>Eliminar</Button>
              </Col>
              <Col sm={5}>
                <Title style={{ textAlign: 'right', margin: 0  }} level={3}>${item.price}</Title>
                <Title style={{ textAlign: 'right', margin: 0  }} level={4}>x{item.quantity}</Title>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
    <Row>
      <Col xs={24}>
        <Card>
          <Flex justify="space-between">
            <Title level={2} style={{ margin: 0  }} >Total</Title>
            <Title level={2} style={{ margin: 0  }} >{totalCart()}</Title>
          </Flex>
        </Card>
      </Col>
    </Row>
    </>

  )
}

export default CartView