import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  Flex,
  Alert,
  Result
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
import { useNavigate } from 'react-router-dom'
import AvatarProfile from '../AvatarProfile/AvatarProfile'
import CoverImage from '../CoverImage/CoverImage'
import { formattedClp } from '../../utils/utils'
import { Helmet } from 'react-helmet-async'
import ItemCardDate from '../ItemCardDate/ItemCardDate'

const { Title, Text } = Typography
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
      <Row gutter={[16, 16]}>
        <Col xs={14} sm={10} md={9} lg={6} xl={6}>
          <CoverImage item={item}></CoverImage>
        </Col>
        <Col xs={24} sm={14} md={15} lg={12} xl={12}>
          <Card className="card-info">
            <Flex gap={16} vertical>
              <Flex vertical gap={4}>
                <ItemCardDate item={item} size={14}></ItemCardDate>
                <Title level={3} style={{ margin: 0}} className="title-card">
                  {item.name}
                </Title>
                <SetIcon setCode={item.set} setName={item.set_name}></SetIcon>
              </Flex>
              <TagsState size={16} stock={true} item={item}></TagsState>
              <Title level={3}>{formattedClp(item.customPrice || item.price * item.seller.dollar)}</Title>
              </Flex>
          </Card>
          <Card>
            {user.logged ? (
              <Row gutter={[16, 16]}>
                <Col xs={24} md={14} lg={12}>
                  <Meta
                    avatar={
                      <AvatarProfile size={48} item={item.seller} />
                    }
                    title={<Title level={4} style={{ margin: 0 }}>{item.seller.name}</Title>}
                    description={
                      <Flex vertical gap={8}>
                        <Text type='secondary' level={5}>
                          <EnvironmentOutlined /> {item.seller.location}
                        </Text>
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
              <Row justify='center'>
                <Col xs={20}>
                  <Result
                    title="Inicia sesión"
                    subTitle="Ingresa ahora a TCG Market para contactar al vendedor y comprar esta carta."
                    extra={
                      <Button onClick={()=> {navigate('/login')}} type="primary" key="console">
                        Ingresar ahora
                      </Button>
                    }
                  />
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
