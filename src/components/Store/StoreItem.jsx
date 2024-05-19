import { EllipsisOutlined } from '@ant-design/icons'
import { Card, Col, Typography, Dropdown, Button, Row } from 'antd'
import TagsState from '../TagsState/TagsState'
import CoverImage from '../CoverImage/CoverImage'
import { formattedClp } from '../../utils/utils'

const { Title } = Typography

const StoreItem = ({ item, onDelete, user, onSold}) => {
  const handleMenuClick = ({ key }) => {
    if (key === '1') {
      onDelete(item.id)
    } else if (key === '0') {
      console.log('Actualizar stock')
      onSold(item.id)
    }
  }
  const items = [
    {
      label: 'Marcar como vendida',
      key: '0',
      disabled: item.sold,
    },
    {
      label: 'Eliminar',
      key: '1',
      danger: true,
    },
  ]

  const actionMenu =  
   ([
      <Dropdown
        menu={{
          items,
          onClick: handleMenuClick,
        }}
        placement="top"
        trigger={['click']}
        key={item.id}
      >
        <Button size='small' block type='link' onClick={(e) => e.preventDefault()}>
          <EllipsisOutlined key="ellipsis" />
        </Button>
      </Dropdown>
   ])

  return (
    <Col xs={12} sm={8} lg={6} xl={4}>
      <Card
        actions={
          item.seller.id === user ? actionMenu : null
        }
        cover={<CoverImage item={item}></CoverImage>}
      >
        <Row justify='space-between' gutter={[16,8]}>
          <Col xs={24}>
            <TagsState stock hideDolar={true} item={item}></TagsState>
          </Col>
          <Col xs={24}>
            <Title style={{ margin: 0 }} level={5}>{formattedClp(item.price * item.seller.dollar)}</Title>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default StoreItem
