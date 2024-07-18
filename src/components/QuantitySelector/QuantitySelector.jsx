import { Flex, Button, Typography } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const { Title } = Typography

const QuantitySelector = ({ stock, setStock, size }) => {
  const handleSum = () => {
    setStock(stock + 1)
  }

  const handleRes = () => {
    setStock(stock - 1)
  }

  const gap = size === 'small' ? 4 : 16
  const level = size === 'small' ? 5 : 4

  return (
    <Flex align="center" gap={gap}>
      <Button
        icon={<MinusOutlined />}
        onClick={handleRes}
        disabled={stock === 1}
        size={size}
      ></Button>
      <div className="quantity-wrapper">
        <Title style={{ margin: 0 }} level={level}>
          {stock}
        </Title>
      </div>
      <Button icon={<PlusOutlined />} onClick={handleSum} size={size}></Button>
    </Flex>
  )
}

export default QuantitySelector
