import { Card, Flex, Typography, Col, Divider } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'
import TagsState from '../TagsState/TagsState'
import { EnvironmentOutlined } from '@ant-design/icons'
import CoverImage from '../CoverImage/CoverImage'

const { Title, Text } = Typography

const ItemCard = ({ item }) => {
  return (
    <Col xs={12} sm={12} md={6} xl={4} xxl={4} style={{ marginBottom: '1rem' }}>
      <Link to={`/item/${item.id}`}>
        <Card
          className="card-item"
          hoverable
          cover={<CoverImage item={item} />}
        >
          <Flex gap={4} vertical>
            <Flex>
              <TagsState item={item}></TagsState>
            </Flex>
            <Title level={5} style={{ marginBottom: 0 }}>
              ${item.price}
            </Title>
          </Flex>
          <Divider style={{ margin: '0.5rem 0' }}></Divider>
          <Text type='secondary' style={{ margin: 0 }} >
            <EnvironmentOutlined /> {item.seller.location}
          </Text>
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard
