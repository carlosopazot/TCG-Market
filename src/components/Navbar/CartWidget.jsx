import { Popover, Badge, Button, List, Avatar } from "antd"
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useContext } from 'react'
import { CartContext } from "../../context/CartContext";
import { Link } from "react-router-dom";


const CartWidget = () => {

  const { itemsInCart, cart  } = useContext(CartContext)
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
        <List
          itemLayout="horizontal"
          dataSource={cart}
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
        { cart.length > 0 
            ? <LinkToCart></LinkToCart>
            : ''
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