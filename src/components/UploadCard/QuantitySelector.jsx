import { Flex, Button, Typography } from 'antd'
import { PlusOutlined, MinusOutlined } from '@ant-design/icons'

const { Title } = Typography

const QuantitySelector = ({ stock, setStock }) => {
  const handleSum = () => {
    setStock(stock + 1)
  }

  const handleRes = () => {
    setStock(stock - 1)
  }

  return (
    <Flex align="center" gap={16}>
      <Button
        size="large"
        icon={<MinusOutlined />}
        onClick={handleRes}
        disabled={stock === 1}
      ></Button>
      <div className="quantity-wrapper">
        <Title style={{ margin: 0 }} level={4}>
          {stock}
        </Title>
      </div>
      <Button
        size="large"
        icon={<PlusOutlined />}
        onClick={handleSum}
      ></Button>
    </Flex>
  )
}

export default QuantitySelector
