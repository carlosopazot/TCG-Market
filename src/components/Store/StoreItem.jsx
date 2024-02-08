import { EllipsisOutlined } from '@ant-design/icons'
import { Card, Col, Typography, Row, Dropdown, Tag } from 'antd'
import TagsState from '../TagsState/TagsState'
import SetIcon from '../UploadCard/SetIcon'

const { Title } = Typography

const items = [
  {
    label: <a href="#">Actualizar stock</a>,
    key: '0',
    disabled: true,
  },
  {
    label: <a href="#">Marcar como vendido</a>,
    key: '1',
  },
  {
    type: 'divider',
  },
  {
    label: 'Eliminar',
    key: '2',
    danger: true,
  },
]

const StoreItem = ({ item, onDelete, onSold }) => {
  const handleMenuClick = ({ key }) => {
    if (key === '2') {
      onDelete(item.id)
    } else if (key === '1') {
      onSold(item.stock)
    }
  }
  return (
    <Col xs={12} md={8}>
      <Card
        cover={<img alt={item.name} src={item.image} />}
        actions={[
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick,
            }}
            placement="top"
            trigger={['click']}
            key={item.id}
          >
            <a onClick={(e) => e.preventDefault()}>
              <EllipsisOutlined key="ellipsis" />
            </a>
          </Dropdown>,
        ]}
      >
        <Row gutter={[0, 16]}>
          <Col xs={24}>
            <Title level={4}>{item.name}</Title>
            <SetIcon setCode={item.set} setName={item.set_name}></SetIcon>
            <TagsState item={item}></TagsState>
          </Col>
          {item.stock > 0 ? (
            <Col xs={24}>
              <Title level={5}>Stock: {item.stock}</Title>
              <Title style={{ marginTop: 0 }} level={4}>
                ${item.price} unidad
              </Title>
              <Title style={{ marginTop: 0 }} level={4}>
                ${item.total} total
              </Title>
            </Col>
          ) : (
            <Tag bordered={false}>Vendido</Tag>
          )}
        </Row>
      </Card>
    </Col>
  )
}

export default StoreItem
