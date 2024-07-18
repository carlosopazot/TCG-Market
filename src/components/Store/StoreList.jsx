import { Col, Row, Table, Empty, Flex, Button, Card, Image } from 'antd'
import { FileImageOutlined } from '@ant-design/icons'
import StoreItem from './StoreItem'
import { ThemeContext } from '../../context/ThemeContext'
import { useContext } from 'react'
import ItemCardPrice from '../ItemCardPrice/ItemCardPrice'

import './styles.css'

const StoreList = ({ handleDelete, handleSold, list, user, cards }) => {
  const { isDarkMode } = useContext(ThemeContext)
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
      responsive: ['md'],
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: 'Precio',
      key: 'price',
      render: (item) => (
        <ItemCardPrice item={item} storePrice />
      )
    },
    {
      title: 'Acciones',
      key: 'actions',
      render: (item) => (
        <Flex gap={8}>
          {item.stock === 0 ? <Button type='link'>Agregar stock</Button> : <Button type='link' onClick={() => handleSold(item.id)}>Marcar como vendida</Button>}
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
            <div className='card-table-container' style={{ background: isDarkMode ? '#141414' : 'white'}}>
              <Table
                columns={columns}
                dataSource={cards}
                pagination={true}
                rowKey={(record) => record.id}
                size='middle'
                width='3000px'
              />
            </div>
          </Col>
        ): (
          <>
            {cards.length !== 0 ? (
              <>
                {cards
                  .map((item) => (
                    <StoreItem
                      key={item.id}
                      item={item}
                      onDelete={handleDelete}
                      onSold={handleSold}
                      user={user.uid}
                    />
                ))}
              </>
            ): (
              <Col xs={24}>
                <Card>
                  <Empty description="No hay cartas para mostrar"></Empty>
                </Card>
              </Col>
            )}
          </>
        )}
      </Row>
    </Col>
  )
}

export default StoreList;