import { Card, Flex, Typography, Col, Tag } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'

const { Title } = Typography

const ItemCard = ({ item }) => {

  let tagColor = ''

  if(item.state === 'NM') {
    tagColor = 'blue'
  } else if (item.state === 'PLD') {
    tagColor = 'yellow'
  }


  return (
    <Col xs={12} sm={12} md={8} xl={6} style={{ marginBottom: '1rem'}}>
      <Link to={`/item/${item.id}`}>
        <Card 
          className='card-item'
          hoverable
          cover={<img alt={item.name} src={item.image} className='card-item-img' />}
        >
          <Flex gap={8} vertical>
            <Title style={{ margin: 0 }} level={4} ellipsis>{item.name}</Title>
            <Flex>
              <Tag bordered={false} color={tagColor} >{item.state}</Tag>
              {item.foil === true ? <Tag bordered={false} color='gold'>FOIL</Tag> : ''}
            </Flex>
            <Title level={4} style={{ marginBottom: 0 }}>${item.price}</Title>
          </Flex>
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard