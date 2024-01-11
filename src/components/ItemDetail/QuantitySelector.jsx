import { Flex, Button, Typography } from "antd"
import { PlusOutlined, MinusOutlined } from "@ant-design/icons"

const { Title } = Typography

const QuantitySelector = ({ quantity, setQuantity, stock }) => {
  const handleSum = () => {
    quantity < stock && setQuantity(quantity + 1);
  };

  const handleRes = () => {
    quantity > 1 && setQuantity(quantity - 1);
  };

  return (
    <Flex gap={16}>
      <Button icon={<MinusOutlined/>} onClick={handleRes} disabled={quantity === 1}></Button>
      <div className="quantity-wrapper">
        <Title level={4}>{quantity}</Title>
      </div>
      <Button icon={<PlusOutlined/>} onClick={handleSum} disabled={quantity === stock}></Button>
    </Flex>
  )
}

export default QuantitySelector