import { Col, Typography, Button, Flex } from 'antd'
import { SettingOutlined, ShareAltOutlined} from '@ant-design/icons'
import './styles.css'
import { useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import { ThemeContext } from '../../context/ThemeContext'
import { StoreContext } from '../../context/StoreContext'
import StoreTags from './StoreTags'
import { useNavigate } from 'react-router-dom'

const { Title } = Typography

const StoreHeader = () => {
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const { store } = useContext(StoreContext)
  const disabledStore = user.phone === null;
  const navigate = useNavigate();

  const copyLink = () => {
    navigator.clipboard.writeText(`https://tcg-market.vercel.app/vendedor/${store.id}`)
    openMessage('success', 'Enlace copiado al portapapeles')
  }

  return (
    <>
      <Col xs={24} md={12} lg={20}>
        <Flex gap={8}>
          <Flex vertical gap={8}>
            <Title  style={{ margin: 0 }} level={2}>Mi tienda</Title>
            <StoreTags item={store} />
          </Flex>
        </Flex>
      </Col>
      
      <Col xs={24} md={12} lg={4}>
        <Flex gap={8} justify="end">
          <Button onClick={()=>navigate('/tienda/configuracion')} block disabled={disabledStore} icon={<SettingOutlined />} size="large">
            Configurar
          </Button>
          <Button block onClick={copyLink} icon={<ShareAltOutlined/>} size='large'  >Compartir</Button>
        </Flex>
      </Col>
    </>
  )
}

export default StoreHeader
