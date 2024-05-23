import { Flex, Tag } from 'antd'

const TagsState = ({ item, hideDolar, stock }) => {
  return (
    <Flex justify='start' gap={4}  wrap="wrap">
      { hideDolar ? null : <Tag bordered={false} color="green">Dólar {item.dollarValue}</Tag> }
      {item.foil ? <Tag bordered={false} color="gold">✨ Foil</Tag> : null}
      {stock ? <Tag bordered={false}>Stock: {item.stock}</Tag> : null}
    </Flex>
  )
}

export default TagsState
