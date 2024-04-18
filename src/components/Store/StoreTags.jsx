import { Tag, Flex } from 'antd'
import { EnvironmentOutlined, DollarOutlined, ExclamationCircleOutlined } from '@ant-design/icons'

const StoreTags = ({ item }) => {
  return (
    <Flex gap={8}>
      {item.location && item.dollar ? (
        <>
          <Tag bordered={false} color='blue' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}>
            <EnvironmentOutlined/> {item.location}
          </Tag>
          <Tag bordered={false} color='green' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}>
            <DollarOutlined/> Dólar {item.dollar}
          </Tag>  
        </>
      ): (
        <>
          <Tag bordered={false} color='yellow' style={{ fontSize: '16px', padding: '0.25rem 0.5rem'}}><ExclamationCircleOutlined/> Sin configurar</Tag>
        </>
      )}
    </Flex>
  )
}
 export default StoreTags