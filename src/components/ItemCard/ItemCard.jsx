import { Card, Flex, Typography, Button, Tooltip } from 'antd'
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';
import './styles.css'

const { Title, Text } = Typography

const ItemCard = ({ item }) => {
  return (
    <Card 
      className='card-item'
      cover={<img alt={item.name} src={item.image} />}
    >
     <Flex vertical>
        <Title style={{ margin: 0 }} level={4} ellipsis>{item.name}</Title>
        <Text>{item.set}</Text>
        <Title level={5}>${item.price}</Title>
        <Flex gap="small">
          <Tooltip title="Agregar al carro" >
            <Button disabled icon={<ShoppingCartOutlined/>}></Button>
          </Tooltip>
          <Tooltip title="Agregar a favoritos" >
            <Button icon={<HeartOutlined />} ></Button>
          </Tooltip>
        </Flex>
     </Flex>
    </Card>
  )
}

export default ItemCard