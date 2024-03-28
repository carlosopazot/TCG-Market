import { Card, Flex, Typography, Col } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'
import imgPlaceholder from '../../assets/images/magic_card_back.webp'
import TagsState from '../TagsState/TagsState'

const { Title } = Typography

const ItemCard = ({ item }) => {
  return (
    <Col xs={12} sm={12} md={8} xl={4} xxl={4} style={{ marginBottom: '1rem' }}>
      <Link to={`/item/${item.id}`}>
        <Card
          className="card-item"
          hoverable
          cover={
            <img
              alt={item.name}
              src={item.image || imgPlaceholder}
              className="card-item-img"
            />
          }
        >
          <Flex gap={8} vertical>
            <Title style={{ margin: 0 }} level={4} ellipsis>
              {item.name}
            </Title>
            <Flex>
              <TagsState item={item}></TagsState>
            </Flex>
            <Title level={4} style={{ marginBottom: 0 }}>
              ${item.price}
            </Title>
          </Flex>
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard
