import { EllipsisOutlined } from '@ant-design/icons'
import { Card, Col, Typography, Dropdown, Tag, Image, Flex, Button } from 'antd'
import TagsState from '../TagsState/TagsState'

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
      disabled: item.stock === 0,
    },
    {
      label: 'Eliminar',
      key: '1',
      danger: true,
    },
  ]

  const actionMenu =  
   (
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
    )

  return (
    <Col xs={12} sm={8} lg={6}>
      <Card
        actions={[
          item.seller.id === user ? actionMenu : null,
        ]}
        cover={
          <>
            <Image preview={false} alt={item.name} src={item.image} />
            <Tag className='tag-name'>{item.name}</Tag>
          </>
        }
      >
        <Flex align='center' justify='space-between' gap={16}>
          <TagsState stock hideDolar={true} item={item}></TagsState>
          <Title style={{ margin: 0 }} level={5}>${item.price}</Title>
          
        </Flex>
        {/* <Row gutter={[16, 16]}>
          <Col xs={8}>
            <Image preview={false} alt={item.name} src={item.image} />
          </Col>
          <Col xs={16}>
            <Title level={4}>{item.name}</Title>
            <SetIcon setCode={item.set} setName={item.set_name}></SetIcon>
            <TagsState item={item}></TagsState>
            {item.stock > 0 ? (
            <>
              <Title level={5}>Stock: {item.stock}</Title>
              <Title style={{ marginTop: 0 }} level={4}>
                ${item.price} unidad
              </Title>
              <Title style={{ marginTop: 0 }} level={4}>
                ${item.total} total
              </Title>
            </>
          ) : (
            <Tag bordered={false}>Vendido</Tag>
          )}
          </Col>
        </Row> */}
      </Card>
    </Col>
  )
}

export default StoreItem
