import { Card, Typography, Flex } from 'antd'
import AvatarProfile from '../AvatarProfile/AvatarProfile'

const { Title, Text } = Typography

const SidebarUserInfo = ({ user }) => {
  return (
    <Card bordered={true}>
      <Flex gap={16}>
        <AvatarProfile size={48} item={user} />
        <Flex vertical>
          <Title style={{ margin: 0 }} level={4}>{user.name}</Title>
          <Text type='secondary'>{user.email}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}

export default SidebarUserInfo