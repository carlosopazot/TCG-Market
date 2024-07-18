import { SettingOutlined } from '@ant-design/icons'
import { Card, Col, Typography, Dropdown, Button, Flex } from 'antd'
import CoverImage from '../CoverImage/CoverImage'
import ItemCardPrice from '../ItemCardPrice/ItemCardPrice'
import QuantitySelector from '../QuantitySelector/QuantitySelector'
import { useState } from 'react'

const { Text } = Typography

const StoreItem = ({ item, onDelete, user, onSold}) => {

  const [stock, setStock] = useState(item.stock)

  const handleMenuClick = ({ key }) => {
    if (key === '2') {
      onDelete(item.id)
    } else if (key === '1') {
      console.log('Actualizar stock')
      onSold(item.id)
    }
  }
  const items = [
    {
      label: (
        <Flex justify='space-between'>
          <Text>Precio </Text>
          <ItemCardPrice item={item} />
        </Flex>
      ),
      key: '0',
      disabled: true,
    },
    {
      label: (
        <Flex justify='space-between'>
          <Text>Stock </Text>
          <QuantitySelector size='small' stock={stock} setStock={setStock} item={item} />
        </Flex>
      ),
      key: '1',
      disabled: true,
    },
    {
      label: 'Marcar como vendida',
      key: '2',
      disabled: item.stock === 0,
    },
    {
      label: 'Eliminar',
      key: '3',
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
        dropdownRender={(menu) => (
          <div>
            {menu}
          </div>
        )}
        key={item.id}
      >
        <div style={{ padding: '0 10px'}}>
          <Button icon={<SettingOutlined/>} block type='text' onClick={(e) => e.preventDefault()}>
          Configurar
          </Button>
        </div>
      </Dropdown>
   ])

  return (
    <Col xs={12} sm={8} lg={6} xl={4}>
      <Card
       className='card-item-store'
        actions={
          item.seller.id === user ? actionMenu : null
        }
        cover={<CoverImage item={item}></CoverImage>}
      />
        {/* <Row justify='space-between' gutter={[16,8]}>
          <Col xs={24}>
            <TagsState stock hideDolar={true} item={item}></TagsState>
          </Col>
          <Col xs={24}>
            <ItemCardPrice title item={item}></ItemCardPrice>
          </Col>
        </Row> */}
    </Col>
  )
}

export default StoreItem
