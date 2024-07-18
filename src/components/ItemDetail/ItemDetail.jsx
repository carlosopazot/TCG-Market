import {
  Row,
  Col,
  Typography,
  Card,
  Button,
  Flex
} from 'antd'
import {
  ShopOutlined,
} from '@ant-design/icons'
import './styles.css'
import WhatsappButton from '../WhatsappButton/WhatsappButton'
import { useContext, } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import CoverImage from '../CoverImage/CoverImage'
import HelmetMeta from '../HelmetMeta/HelmetMeta'
import SellerInfo from './SellerInfo'
import CardInfo from './CardInfo'

const { Text } = Typography

const ItemDetail = ({ item }) => {
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const navigate = useNavigate()

  const showStore = () => {
    navigate(`/vendedor/${item.seller.id}`)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    openMessage('success', 'Enlace copiado al portapapeles')
  }

  console.log(item)

  const whatsappButton = user?.logged ? (
    <WhatsappButton
      sellerName={item.seller.name}
      nameCard={item.name}
      disabled={!user.phone}
      number={item.seller.phone || null}
      key='whatsapp'
    />
  ) : null;
  
  const storeButton = user?.logged ? (
    <Button type='text' size='large' icon={<ShopOutlined />} onClick={showStore} key='store'>
      Ver tienda
    </Button>
  ) : null;
  
  const actionsStore = [whatsappButton, storeButton].filter(Boolean);

  return (
    <>
      <HelmetMeta title={item.name}/>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={10} lg={8} xl={6}>
          <Card>
            <Flex vertical gap={8} justify='center' align='center'>
              <CoverImage width={260} item={item}></CoverImage>
            </Flex>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={14} lg={12} xl={12}>
          <CardInfo
            item={item}
            user={user}
            copyLink={copyLink}
          ></CardInfo>
          <Card 
            title={<Text type='secondary'>Vendido por</Text>}
            actions={actionsStore}
            >
            <SellerInfo item={item}></SellerInfo>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default ItemDetail
