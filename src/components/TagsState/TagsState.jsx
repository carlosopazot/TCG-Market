import { Flex, Tag } from 'antd'

const TagsState = ({ item }) => {
  let tagColor = ''

  if (item.state === 'NM') {
    tagColor = 'blue'
  } else if (item.state === 'PLD') {
    tagColor = 'yellow'
  }

  return (
    <Flex justify='start' gap={4}  wrap="wrap">
      <Tag bordered={false} color={tagColor}>
        {item.state}
      </Tag>
      <Tag bordered={false} color="green">
        USD {item.dollarValue}
      </Tag>
      {item.foil ? <Tag bordered={false} color="gold">Foil</Tag> : null}
    </Flex>
  )
}

export default TagsState
