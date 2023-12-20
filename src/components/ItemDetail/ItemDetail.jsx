import { Row, Col, Typography, Image, Card, Button } from "antd"
import { ShoppingCartOutlined } from "@ant-design/icons"

const { Title } = Typography

const ItemDetail = ({ item }) => {
  return (
    <Row gutter={24}>
      <Col md={8}>
        <Image src={item.image} alt={item.name} preview={true} placeholder/>
      </Col>
      <Col md={16}>
        <Card>
          <Title level={2}>{item.name}</Title>
          <Title level={3}>{item.set}</Title>
          <Title level={2}>$ {item.price}</Title>
          <Button size='large' disabled><ShoppingCartOutlined />Agregar al carro</Button>
        </Card>
      </Col>
    </Row>
  )
}

export default ItemDetail