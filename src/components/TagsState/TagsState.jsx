import { Flex, Tag } from "antd"


const TagsState = ({ item }) => {

  let tagColor = ''

  if(item.state === 'NM') {
    tagColor = 'blue'
  } else if (item.state === 'PLD') {
    tagColor = 'yellow'
  }
  
  return (
    <Flex>
      <Tag bordered={false} color={tagColor} >{item.state}</Tag>
      {item.foil === true ? <Tag bordered={false} color='gold'>FOIL</Tag> : null}
    </Flex>
  )
}

export default TagsState