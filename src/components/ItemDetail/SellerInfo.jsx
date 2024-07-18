import { useContext } from "react"
import { UserContext } from "../../context/UserContext"
import { Row, Col, Typography, Alert, Result, Button, Card, Flex } from "antd"
import { EnvironmentOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import AvatarProfile from "../AvatarProfile/AvatarProfile"

const { Meta } = Card
const { Title } = Typography

const SellerInfo = ({ item }) => {
  
  const navigate = useNavigate()
  const { user } = useContext(UserContext)

  return (
    <>
      {user.logged ? (
        <Row gutter={[16, 16]}>
          <Col xs={24} md={14} lg={12}>
            <Meta
              avatar={
                <AvatarProfile size={52} item={item.seller} />
              }
              title={<Title level={4} style={{ margin: 0 }}>{item.seller.name}</Title>}
              description={
                <Flex vertical gap={8}>
                  <Title level={5} type='secondary'>
                    <EnvironmentOutlined /> {item.seller.location}
                  </Title>
                </Flex>
              }
            />
          </Col>
          <Col xs={24} md={10} lg={12}>
            <Flex gap={8} vertical>
              {user.phone === null ? <Alert showIcon type='warning' message='Verifica tú numero para contactar al vendedor'></Alert> : null}
            </Flex>
          </Col>
        </Row>
      ) : (
        <Row justify='center'>
          <Col xs={24} md={20}>
            <Result
              title="Inicia sesión"
              subTitle="Ingresa ahora a TCG Market para contactar al vendedor y comprar esta carta."
              extra={
                <Button size="large" onClick={()=> {navigate('/login')}} type="primary" key="login">
                  Ingresar ahora
                </Button>
              }
            />
          </Col>
        </Row>
      )}
    </>
  )
}

export default SellerInfo