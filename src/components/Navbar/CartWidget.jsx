import { Popover, Badge, Button, List, Avatar, Empty } from "antd"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";


const CartWidget = () => {

  const { itemsInCart, cart  } = useContext(CartContext)

  const locale = {
    emptyText: 'Tu carro está vacío'
  }

  const LinkToCart = () => {
    return(
      <Link to='/cart' className="btn-checkout-wrapper">
        <Button block>
          Ir a checkout
        </Button>
      </Link>
    )
  }

  const content = () => {
    return (
      <>
        { cart.length > 0 
          ? <>
              <List
                className="cart-item-list"
                itemLayout="horizontal"
                dataSource={cart}
                locale={locale}
                renderItem={(item, index) => (
                  <List.Item key={index}>
                    <List.Item.Meta
                      avatar={<Avatar src={item.image} />}
                      title={item.name}
                      description={`x ${item.quantity}`}
                    />
                  </List.Item>
                )}
              />
              <LinkToCart></LinkToCart>
            </>
          : <Empty description='Tu carro de compra está vacío'></Empty>
        }
      </>
    )
  }

  return(
    <Popover title="Carro de compras" content={content} trigger="click" placement='bottomRight'>
      <Badge count={itemsInCart()}>
        <Button size='large'><ShoppingCartOutlined /></Button>
      </Badge>
    </Popover>
  )
}

export default CartWidget