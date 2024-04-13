import { Card, Flex, Typography, Col, Divider } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'
import imgPlaceholder from '../../assets/images/magic_card_back.webp'
import TagsState from '../TagsState/TagsState'
import { EnvironmentOutlined } from '@ant-design/icons'

const { Title } = Typography

const ItemCard = ({ item }) => {
  return (
    <Col xs={12} sm={12} md={6} xl={4} xxl={4} style={{ marginBottom: '1rem' }}>
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
          <Flex gap={4} vertical>
            <Title style={{ margin: 0 }} level={5} ellipsis>
              {item.name}
            </Title>
            <Flex>
              <TagsState item={item}></TagsState>
            </Flex>
            <Title level={4} style={{ marginBottom: 0 }}>
              ${item.price}
            </Title>
          </Flex>
          <Divider style={{ margin: '0.5rem 0' }}></Divider>
          <Title type='secondary' style={{ margin: 0 }} level={5}>
            <EnvironmentOutlined /> {item.seller.location}
          </Title>
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard
