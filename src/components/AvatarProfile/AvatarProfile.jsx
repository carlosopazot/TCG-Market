import { Avatar } from "antd"

const AvatarProfile = ({ size, src, name }) => {
  return (
    <Avatar size={size} src={src}>
      {name && name.charAt(0).toUpperCase()}
    </Avatar>
  )
}

export default AvatarProfile