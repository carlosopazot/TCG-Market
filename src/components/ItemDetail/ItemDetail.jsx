import { Row, Col, Typography, Image, Card, Button, Flex, Alert } from "antd"
import { ShoppingCartOutlined, ArrowLeftOutlined} from "@ant-design/icons"
import QuantitySelector from "./QuantitySelector"
import TagsState from "../TagsState/TagsState"
import { useNavigate } from "react-router-dom"
import { CartContext } from "../../context/CartContext"
import './styles.css'
import { useContext, useState } from "react"

const { Title } = Typography

const ItemDetail = ({ item }) => {

  const navigate = useNavigate()
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isInCart } = useContext(CartContext)

  const handleBack = () => {
    navigate(-1)
  }

  const handleAdd = () => {
    const itemToCart = {
      ...item,
      quantity, // => cantidad: cantidad
    }

    addToCart(itemToCart)
  }

  return (
    <>
    <Row style={{ marginBottom: '16px'}}>
      <Col>
        <Button onClick={handleBack} icon={<ArrowLeftOutlined/>}>Volver</Button>
      </Col>
    </Row>
    <Row gutter={24}>
      <Col md={8}>
        <Image src={item.image} alt={item.name} preview={false} placeholder/>
      </Col>
      <Col md={16}>
        <Card className="card-info">
          <Flex vertical>
            <Flex vertical gap={4} align='flex-start' justify='flex-start' >
              <Title level={2} className="title-card">{item.name}</Title>
              <Title level={3} className="subtitle-card">{item.set}</Title>
              <TagsState item={item}></TagsState>
              <p>{item.description} </p>
            </Flex>
            <Flex vertical align='flex-start' gap={8}>
              <Alert message={`Stock: ${item.stock}`} type="info" />
              <Title level={2}>$ {item.price}</Title>
            </Flex>
            <Flex justify="space-between" className="">
              <QuantitySelector quantity={quantity} stock={item.stock} setQuantity={setQuantity}/>
              { isInCart (item.stock)
                ? <Button>Terminar compra</Button> 
                : <Button 
                  type="primary" 
                  onClick={handleAdd}
                  disabled={item.stock === 0}
                  icon={<ShoppingCartOutlined />}
                  >
                  Agregar al carro
                  </Button>
              }
            </Flex>
          </Flex>
        </Card>
      </Col>
    </Row>
    </>
   
  )
}

export default ItemDetail