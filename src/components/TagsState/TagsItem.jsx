import { Tag } from "antd"

const TagsItem = ({ text, size, color, emoji }) => {
  return (
    <Tag bordered={false} style={{ fontSize: size }} color={color}>
     {emoji} {text}
    </Tag>
  )
}

export default TagsItem