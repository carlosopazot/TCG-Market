import { EllipsisOutlined, SettingOutlined, EditOutlined,  } from '@ant-design/icons'
import { Card, Col, Typography, Row, Dropdown, Flex, Button, message } from 'antd'
import TagsState from '../TagsState/TagsState'
import SetIcon from '../UploadCard/SetIcon'
import { db } from '../../firebase/config'
import { doc, deleteDoc } from "firebase/firestore";

const { Title } = Typography

const items = [
  {
    label: <a href="#">Actualizar stock</a>,
    key: '0',
    disabled: true,
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
      onDelete(item.id);
    } else if ( key === '1') {
      onSold(item.sold)
    }
  };
  return (
    <Col xs={12} md={8}>
      <Card 
        cover={<img alt={item.name} src={item.image} />}
        actions={[
          <Dropdown
            menu={{
              items,
              onClick: handleMenuClick
            }}
            placement='top'
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>

            <EllipsisOutlined key="ellipsis" />
            </a>
          </Dropdown>
        ]}
      >
        <Row>
          <Col xs={24}>
            <Title level={4}>{item.name}</Title>
            <SetIcon setCode={item.set} setName={item.set_name}></SetIcon>
            <Title style={{ marginTop: 0 }} level={4}>${item.price} unidad</Title>
            <Title style={{ marginTop: 0 }} level={4}>${item.total} total</Title>
            <TagsState item={item}></TagsState>
            <Title level={5}>Stock: {item.stock}</Title>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default StoreItem
