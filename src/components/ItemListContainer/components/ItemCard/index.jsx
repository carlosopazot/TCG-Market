import { Card } from 'antd';

const ItemCard = ({ item }) => {
  return (
    <Card 
      style={{ width: '300px' }}
      cover={<img alt={item.name} src={item.image} />}
    >
      <h3>{item.name}</h3>
      <h5>{item.set}</h5>
      <h4>${item.price}</h4>
    </Card>
  )
}

export default ItemCard