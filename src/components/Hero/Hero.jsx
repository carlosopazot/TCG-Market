import { Card, Typography, Row, Col, Button} from "antd"
import { UserContext } from "../../context/UserContext"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const Hero = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  if (user.logged) {
    return (
      <Card>
        <Row gutter={[16,16]}>
          <Col xs={24} md={18} lg={20}>
            <Text type="secondary">Bienvenido</Text>
            <Title style={{ margin: 0 }} level={3}>{user.name}</Title>
            <Text type="secondary">Compra y vende cartas de Magic: The Gathering</Text>
          </Col>
        </Row>
      </Card>
    )
  }

  return (
    <Card>
      <Row gutter={[16,16]}>
        <Col xs={24} md={18} lg={20}>
          <Title style={{ marginBottom: '0.5rem' }} level={2}>¡Bienvenido a Sleeve!</Title>
          <Text type="secondary">Compra y vende cartas de Magic: The Gathering</Text>
        </Col>
        <Col xs={24} md={6} lg={4}>
          <Button onClick={()=>navigate('/login')} block size="large" type="primary">Ingresar ahora</Button>
        </Col>
      </Row>
    </Card>
  )
}

export default Hero