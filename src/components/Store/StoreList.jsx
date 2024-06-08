import { Col, Row, Table, Empty, Flex, Button, Card, Image } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import StoreItem from './StoreItem'
import { formattedClp } from '../../utils/utils'

const StoreList = ({ handleDelete, handleSold, list, user, cards }) => {

  const columns = [
    {
      title: <FileImageOutlined/>,
      dataIndex: 'image',
      key: 'image',
      render: (record) => <Image src={record} alt='miniatura' width={20}/>
    },
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Edición',
      dataIndex: 'set_name',
      key: 'set',
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Precio USD',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Precio',
      key: 'price',
      render: (item) => formattedClp(item.customPrice || item.price * item.seller.dollar),
      sorter: (a, b) => a.price - b.price,
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (item) => (
        <Flex gap={8}>
          <Button type='link' onClick={() => handleSold(item.id)}>Marcar como vendida</Button>
          <Button type='link' onClick={() => handleDelete(item.id)}>Eliminar</Button>
        </Flex>
      )
    }
  ]

  return (
    <Col xs={24}>
      <Row gutter={[8,8]}>
        {list === 'list' ? (
          <Col xs={24}>
            <div style={{ overflowX: 'scroll', position: 'relative'}}>
              <Table
                columns={columns}
                dataSource={cards}
                pagination={true}
                rowKey={(record) => record.id}
                width='1000px'
              />
            </div>
          </Col>
        ): (
          cards
            .map((item) => (
              <StoreItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onSold={handleSold}
                user={user.uid}
              />
          ))
        )}
        {cards.length === 0 && (
          <Col xs={24}>
            <Card>
              <Empty description="No hay cartas para mostrar"></Empty>
            </Card>
          </Col>
        )}
      </Row>
    </Col>
  )
}

export default StoreList;