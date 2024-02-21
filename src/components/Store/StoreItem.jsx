import { EllipsisOutlined } from '@ant-design/icons'
import { Card, Col, Typography, Row, Dropdown, Tag } from 'antd'
import TagsState from '../TagsState/TagsState'
import SetIcon from '../UploadCard/SetIcon'

const { Title } = Typography

const items = [
  {
    label: 'Eliminar',
    key: '1',
    danger: true,
  },
]

const StoreItem = ({ item, onDelete}) => {
  const handleMenuClick = ({ key }) => {
    if (key === '1') {
      onDelete(item.id)
    }
  }
  return (
    <Col xs={12} md={8} xl={6} xxl={4}>
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
