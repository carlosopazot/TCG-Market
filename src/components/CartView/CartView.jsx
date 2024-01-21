import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Col, Row, Image, Typography, Card, Button, Empty, Flex, Badge } from "antd";

const { Title } = Typography

const CartView = () => {
  const { cart, removeItem } = useContext(CartContext);
  if (cart.length === 0) return (
    <Empty description='Tu carro de compra esta vacío'></Empty>
  )
  return (
    <>
      <Row gutter={16}>
        {cart.map((item) => (
          <Col xs={24} key={item.id}>
            <Card 
            style={{ marginBottom: '1rem' }} >
              <Row gutter={16}>
                <Col xs={4}>
                  <Image src={item.image} preview={false}></Image>
                </Col>
                <Col xs={20}>
                  <Title style={{ margin: 0 }} level={4}>{item.name}</Title>
                  <Title style={{ margin: 0, marginBottom: '1rem' }} level={5}>{item.set}</Title>
                  <Flex style={{ marginBottom: '1rem' }} justify="space-between" align="center">
                    <Title style={{ margin: 0  }} level={3}>${item.price}</Title>
                    <Badge count={`x${item.quantity}`} color="blue" size="large"></Badge>
                  </Flex>
                  <Flex justify="flex-end">
                    <Button size="sm" onClick={() => removeItem(item.id)}>Eliminar</Button>
                  </Flex>
                </Col>
              </Row>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CartView