import { Card, Flex, Typography, Button, Col, Tag } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'

const { Title, Text } = Typography

const ItemCard = ({ item }) => {
  return (
    <Col xs={24} sm={12} md={8} xl={6} xxl={4} style={{ marginBottom: '1rem'}}>
      <Card 
        className='card-item'
        hoverable
        cover={<img alt={item.name} src={item.image} className='card-item-img' />}
      >
      <Flex gap={4} vertical>
          <Title style={{ margin: 0 }} level={4} ellipsis>{item.name}</Title>
          <Text>{item.set}</Text>
          <Flex>
            <Tag>{item.state}</Tag>
          </Flex>
          <Title level={5}>${item.price}</Title>
          <Link to={`/item/${item.id}`} style={{ display: 'block', width: '100%'}}>
            <Button block>Ver detalle</Button>
          </Link>
      </Flex>
      </Card>
    </Col>
  )
}

export default ItemCard