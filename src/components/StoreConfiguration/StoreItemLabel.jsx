import { Flex, Typography } from "antd"

const { Title } = Typography

const StoreItemLabel = ({ title, icon }) => {
  return (
    <Flex gap={8}>
      {icon}
      <Title style={{ margin: 0 }} level={5}>{title}</Title>
    </Flex>
  )
}

export default StoreItemLabel