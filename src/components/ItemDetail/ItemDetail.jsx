import {
  Row,
  Col,
  Typography,
  Image,
  Card,
  Button,
  Flex,
  Alert,
  Avatar,
  Rate,
} from 'antd'
import {
  EnvironmentOutlined,
  LoginOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import TagsState from '../TagsState/TagsState'
import { Link } from 'react-router-dom'
import './styles.css'
import imgPlaceholder from '../../assets/images/magic_card_back.webp'
import SetIcon from '../UploadCard/SetIcon'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import BackButton from '../BackButton/BackButton'

const { Title } = Typography
const { Meta } = Card

const ItemDetail = ({ item }) => {
  const { user } = useContext(UserContext)

  return (
    <>
      <Row>
        <Col>
          <BackButton></BackButton>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={24} sm={10} md={9} lg={8} xl={8}>
          <Image
            className="img-card"
            src={item.image || imgPlaceholder}
            alt={item.name}
            preview={false}
            placeholder
          />
        </Col>
        <Col xs={24} sm={14} md={15} lg={16} xl={16}>
          <Card className="card-info">
            <Flex justify="space-between" vertical>
              <Flex vertical gap={4} align="flex-start" justify="flex-start">
                <Title level={2} className="title-card">
                  {item.name}
                </Title>
                <SetIcon setCode={item.set} setName={item.set_name}></SetIcon>
                <TagsState item={item}></TagsState>
                <p>{item.description} </p>
                <Flex vertical align="flex-start" gap={8}>
                  {item.stock === 0 ? (
                    <Alert message="Agotado" type="error" />
                  ) : (
                    <Alert message={`Stock: ${item.stock}`} type="info" />
                  )}
                  <Title level={3}>$ {item.price}</Title>
                </Flex>
              </Flex>
            </Flex>
          </Card>
          <Card title="Vendido por">
            {user.logged ? (
              <Row gutter={[16, 16]}>
                <Col xs={24} md={14}>
                  <Meta
                    avatar={
                      <Avatar
                        src={item.seller.avatar}
                        placeholder="https://api.dicebear.com/7.x/miniavs/svg?seed=8"
                      />
                    }
                    title={<Title level={4}>{item.seller.name}</Title>}
                    description={
                      <Flex vertical gap={8}>
                        <Rate disabled defaultValue={5} />
                        <Title level={5}>
                          <EnvironmentOutlined /> Santiago
                        </Title>
                      </Flex>
                    }
                  />
                </Col>
                <Col xs={24} md={10}>
                  <WhatsappButton
                    sellerName={item.seller.name}
                    nameCard={item.name}
                  ></WhatsappButton>
                  <Button icon={<ShopOutlined />} size="large" block>
                    Ver tienda
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row justify="center">
                <Col md={16} style={{ textAlign: 'center' }}>
                  <Title level={2} color="blue">
                    <LoginOutlined />
                  </Title>
                  <Title level={4} style={{ marginTop: 0 }}>
                    Inicia sesión para ver la información del vendedor
                  </Title>
                  <Link to="/login">
                    <Button size="large" type="primary">
                      Ingresar ahora
                    </Button>
                  </Link>
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ItemDetail
