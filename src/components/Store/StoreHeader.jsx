import { Col, Typography, Button, Flex } from 'antd'
import { Link } from 'react-router-dom'
import { PlusOutlined } from '@ant-design/icons'
import './styles.css'

const { Title } = Typography

const StoreHeader = () => {
  return (
    <>
      <Col xs={12} md={12}>
        <Title level={2}>Mi tienda</Title>
      </Col>
      <Col xs={12} md={12}>
        <Flex gap={8} justify="end">
          {/* <Button icon={<SettingOutlined />} disabled size="large">
            <span className="hide-mobile">Configurar</span>
          </Button> */}
          <Link to="/agregar-carta">
            <Button type="primary" icon={<PlusOutlined />} size="large">
              Agregar carta
            </Button>
          </Link>
        </Flex>
      </Col>
    </>
  )
}

export default StoreHeader
