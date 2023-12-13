import { Popover, Badge, Button, Empty } from "antd"
import { ShoppingCartOutlined } from '@ant-design/icons';

const itemsMenu = [
  // {
  //   name: 'cardOne'
  // }
];

const CartWidget = () => {
  const content = () => {
    if(itemsMenu.length > 0 ) {
      return(
        <h1>Hola tengo cosas</h1>
      )
    } else {
      return(
        <Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{ height: 30 }}
        description={
          <span>
            Tu carro está vacío
          </span>
        }
      >
      </Empty>
      )
    }
  }
  return(
    <Popover content={content} trigger="click" placement='bottomRight'>
      <Badge count={itemsMenu.length}>
        <Button size='large'><ShoppingCartOutlined /></Button>
      </Badge>
    </Popover>
  )
}

export default CartWidget