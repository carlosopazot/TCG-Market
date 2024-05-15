import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  Flex,
  Alert,
} from 'antd'
import {
  EnvironmentOutlined,
  LoginOutlined,
  ShopOutlined,
} from '@ant-design/icons'
import TagsState from '../TagsState/TagsState'
import { Link } from 'react-router-dom'
import './styles.css'
import SetIcon from '../UploadCard/SetIcon'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import { useContext, } from 'react'
import { UserContext } from '../../context/UserContext'
import BackButton from '../BackButton/BackButton'
import { useNavigate } from 'react-router-dom'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import CoverImage from '../CoverImage/CoverImage'
import { formattedClp } from '../../utils/utils'
import { Helmet } from 'react-helmet-async'

const { Title } = Typography
const { Meta } = Card

const ItemDetail = ({ item }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const showStore = () => {
    navigate(`/vendedor/${item.seller.id}`)
  }

  return (
    <>
      <Helmet>
        <title>{item.name} - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={14} sm={10} md={9} lg={6} xl={6}>
          <CoverImage item={item}></CoverImage>
        </Col>
        <Col xs={24} sm={14} md={15} lg={12} xl={12}>
          <Card className="card-info">
              <Flex vertical gap={4} align="flex-start" justify="flex-start">
                <Title level={3} className="title-card">
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
                  <Title level={3}>{formattedClp(item.price)}</Title>
                </Flex>
              </Flex>
          </Card>
          <Card title="Vendido por">
            {user.logged ? (
              <Row gutter={[16, 16]}>
                <Col xs={24} md={14} lg={10}>
                  <Meta
                    avatar={
                      <AvatarProfile name={item.seller.name} src={item.seller.avatar} />
                    }
                    title={<Title level={4}>{item.seller.name}</Title>}
                    description={
                      <Flex vertical gap={8}>
                        <Title type='secondary' level={5}>
                          <EnvironmentOutlined /> {item.seller.location}
                        </Title>
                      </Flex>
                    }
                  />
                </Col>
                <Col xs={24} md={10} lg={12}>
                  <Flex gap={8} vertical>
                    {user.phone === null ? <Alert showIcon type='warning' message='Verifica tú numero para contactar al vendedor'></Alert> : null}
                    <WhatsappButton
                      sellerName={item.seller.name}
                      nameCard={item.name}
                      disabled={user.phone === null}
                      number={item.seller.phone || null}
                    ></WhatsappButton>
                    <Button icon={<ShopOutlined />} onClick={showStore} size="large" block>
                      Ver tienda
                    </Button>
                  </Flex>
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
