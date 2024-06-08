import { Card, Flex, Typography, Col, Divider } from 'antd'
import { Link } from 'react-router-dom'
import './styles.css'
import TagsState from '../TagsState/TagsState'
import { EnvironmentOutlined } from '@ant-design/icons'
import CoverImage from '../CoverImage/CoverImage'
import { formattedClp } from '../../utils/utils'
import ItemCardDate from '../ItemCardDate/ItemCardDate'

const { Title, Text } = Typography

const ItemCard = ({ item, showLocation }) => {


  return (
    <Col style={{ margin: '0.25rem' }}>
      <Link to={`/cartas/${item.id}`}>
        <Card
          className="card-item"
          hoverable
          cover={<CoverImage item={item} />}
        >
          <Flex gap={4} vertical>
            <ItemCardDate item={item}/>
            <Title level={4} style={{ margin: 0 }}>
              {formattedClp(item.customPrice || item.price * item.seller.dollar)}
            </Title>
            <Flex>
              <TagsState size={14} item={item}></TagsState>
            </Flex>
          </Flex>
          {showLocation && (
            <>
              <Divider style={{ margin: '0.5rem 0' }}></Divider>
              <Text type='secondary' style={{ margin: 0 }} >
                <EnvironmentOutlined /> {item.seller.location}
              </Text>
            </>
          )}
        </Card>
      </Link>
    </Col>
  )
}

export default ItemCard
