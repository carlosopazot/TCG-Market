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
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../context/UserContext'
import BackButton from '../BackButton/BackButton'
import { query, collection, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'
import AvatarProfile from '../AvatarProfile/AvatarProfile'

import { db } from '../../firebase/config'

const { Title } = Typography
const { Meta } = Card



const ItemDetail = ({ item }) => {
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const showStore = () => {
    navigate(`/tienda/${item.seller.id}`)
  }
  return (
    <div className='main'>
      <Row justify='center'>
        <Col xs={24} lg={18}>
          <BackButton></BackButton>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="center">
        <Col xs={14} sm={10} md={9} lg={6} xl={6}>
          <Image
            className="img-card"
            src={item.image || imgPlaceholder}
            alt={item.name}
            preview={false}
            placeholder
          />
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
                  <Title level={3}>$ {item.price}</Title>
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
                        <Title level={5}>
                          <EnvironmentOutlined /> Santiago
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
    </div>
  )
}

export default ItemDetail
