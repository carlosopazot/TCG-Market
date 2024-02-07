import { Badge, Button, Drawer, Flex, Typography } from 'antd'
import { ShoppingCartOutlined } from '@ant-design/icons'
import { useContext, useState } from 'react'
import { CartContext } from '../../context/CartContext'
import { Link } from 'react-router-dom'
import CartView from '../CartView/CartView'

const { Title } = Typography

const CartWidget = () => {
  const { itemsInCart, totalCart, clearCart, cart } = useContext(CartContext)
  const [open, setOpen] = useState(false)

  const showDrawer = () => {
    setOpen(true)
  }

  const closeDrawer = () => {
    setOpen(false)
  }

  return (
    <>
      <Badge count={itemsInCart()}>
        <Button size="large" onClick={showDrawer}>
          <ShoppingCartOutlined />
        </Button>
      </Badge>
      <Drawer
        title="Carro de compras"
        onClose={closeDrawer}
        open={open}
        extra={
          cart.length > 0 ? (
            <Button onClick={clearCart}>Vaciar carro</Button>
          ) : null
        }
        footer={
          cart.length > 0 ? (
            <Flex gap={8} vertical>
              <Flex justify="space-between">
                <Title style={{ margin: 0 }} level={4}>
                  Total
                </Title>
                <Title style={{ margin: 0 }} level={3}>
                  ${totalCart()}
                </Title>
              </Flex>
              <Link to="/checkout" onClick={closeDrawer}>
                <Button
                  size="large"
                  type="primary"
                  block
                  disabled={cart.length === 0}
                >
                  Ir a checkout
                </Button>
              </Link>
            </Flex>
          ) : null
        }
      >
        <CartView></CartView>
      </Drawer>
    </>
  )
}

export default CartWidget
