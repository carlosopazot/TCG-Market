import { Flex, Tag } from 'antd'

const TagsState = ({ item, hideDolar, stock, size, justify }) => {

  const sizeTag = size || 12

  return (
    <Flex justify={justify} gap={4}  wrap="wrap">
      { hideDolar ? null : <Tag style={{ fontSize: sizeTag }} bordered={false} color="green"> 💵 {item.seller.dollar}</Tag> }
      {item.foil ? <Tag style={{ fontSize: sizeTag }}  bordered={false} color="gold">✨ Foil</Tag> : null}
      {stock ? <Tag style={{ fontSize: sizeTag }}  bordered={false}>Stock: {item.stock}</Tag> : null}
    </Flex>
  )
}

export default TagsState
