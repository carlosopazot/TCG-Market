import { Modal, Button, Divider, Row, Col, Flex, Typography } from 'antd'
import QuantitySelector from './QuantitySelector'
import { useNavigate } from 'react-router-dom'
import { formattedClp } from '../../utils/utils'
import { ExportOutlined } from '@ant-design/icons'

const { Title, Text, Link } = Typography

const ModalUpload = ({
  edition,
  isModalOpen,
  handleOk,
  handleCancel,
  stock,
  setStock,
  dollarValue,
  total,
  unitaryTotal,
}) => {
  const navigate = useNavigate()

  return (
    <Modal
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      title={`Agregando ${edition.name}`}
      footer={[
        <Button size="large" key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button size="large" key="send" type="primary" onClick={handleOk}>
          Agregar
        </Button>,
      ]}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Row>
            <Col xs={16} md={18}>
              <Title style={{ margin: 0 }} level={5}>Valor referencia dólar</Title>
              <Text type='secondary'>Este es el valor del dólar que configuraste en tu tienda. </Text>
              <Link onClick={()=> {navigate('/tienda')}}>Ir a tienda <ExportOutlined /></Link>
            </Col>
            <Col xs={8} md={6} style={{ textAlign: 'right'}}>
              <Title style={{ margin: 0 }} level={4}>${dollarValue} <Text>CLP</Text> </Title>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Flex justify='space-between' align='center'>
          <Title style={{ margin: 0 }} level={5}>Cantidad</Title>
          <QuantitySelector
            stock={stock}
            setStock={setStock}
          ></QuantitySelector>
          </Flex>
        </Col>
        <Col xs={24}>
          <Divider></Divider>
          <Flex justify="space-between">
            <Title level={5} type="secondary">
              Precio
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              {formattedClp(unitaryTotal)}  <Text type="secondary">CLP</Text>
            </Title>
          </Flex>
          <Flex justify="space-between">
            <Title level={4}>Total</Title>
            <Title style={{ marginTop: 0 }} level={4}>
              {formattedClp(total)}  <Text>CLP</Text>
            </Title>
          </Flex>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalUpload
