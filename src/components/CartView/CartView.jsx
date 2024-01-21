import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { Col, Row, Image, Typography, Card, Button, Empty, Flex, Badge, Divider } from "antd";

const { Title } = Typography

const CartView = () => {
  const calculateItemTotal = (quantity, price) => quantity * price;
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
              <Row gutter={[16]}>
                <Col xs={4}>
                  <Image src={item.image} preview={false}></Image>
                </Col>
                <Col xs={20}>
                  <Title style={{ margin: 0 }} level={4}>{item.name}</Title>
                  <Title type="secondary" style={{ margin: 0, marginBottom: '1rem' }} level={5}>{item.set}</Title>
                  <Flex style={{ marginBottom: '1rem' }} justify="space-between" align="center">
                    <Title type="secondary" style={{ margin: 0  }} level={5}>${item.price}</Title>
                    <Badge count={`x${item.quantity}`} color="blue" size="large"></Badge>
                  </Flex>
                  <Divider></Divider>
                  <Flex justify="space-between">
                    <Title level={4}>${calculateItemTotal(item.quantity,item.price).toFixed(2)}</Title>
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