import { Flex, Tag } from 'antd'

const TagsState = ({ item }) => {
  let tagColor = ''

  if (item.state === 'NM') {
    tagColor = 'blue'
  } else if (item.state === 'PLD') {
    tagColor = 'yellow'
  }

  return (
    <Flex wrap="wrap">
      <Tag bordered={false} color={tagColor}>
        {item.state}
      </Tag>
      {item.foil ? <Tag bordered={false} color="gold">Foil</Tag> : <Tag bordered={false}>Non foil</Tag>}
      <Tag bordered={false} color="green">
        USD {item.dollarValue}
      </Tag>
    </Flex>
  )
}

export default TagsState
