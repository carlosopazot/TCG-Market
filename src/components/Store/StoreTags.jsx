import { Tag, Flex } from 'antd'
import { EnvironmentOutlined, DollarOutlined } from '@ant-design/icons'

const StoreTags = ({ item }) => {
  return (
    <Flex gap={8}>
      <Tag bordered={false} color='blue' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><EnvironmentOutlined/> {item.location}</Tag>
      <Tag bordered={false} color='green' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><DollarOutlined/> Dolar {item.dollar}</Tag>
    </Flex>
  )
}
 export default StoreTags