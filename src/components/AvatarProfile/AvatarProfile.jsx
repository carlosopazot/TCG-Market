import { Avatar } from "antd"

const AvatarProfile = ({ size, item }) => {
  return (
    <Avatar size={size} src={item.avatar}>
      {item.name && item.name.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default AvatarProfile