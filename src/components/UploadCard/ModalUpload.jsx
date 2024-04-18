import { Modal, Button, Divider, Row, Col, Radio, Flex, Typography } from 'antd'
import QuantitySelector from './QuantitySelector'
import { useNavigate } from 'react-router-dom'

const { Title, Text, Link } = Typography

const ModalUpload = ({
  edition,
  isModalOpen,
  handleOk,
  handleCancel,
  stock,
  setStock,
  state,
  setState,
  dollarValue,
  total,
  unitaryTotal,
  item
}) => {
  const navigate = useNavigate()

  const formattedNumber = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
  }).format(total);

  const states = [
    {
      value: 'NM',
      label: 'NM',
    },
    {
      value: 'PLD',
      label: 'PLD',
    },
    {
      value: 'HP',
      label: 'HP',
    }
  ]

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
          <Flex justify='space-between' align='center'>
            <Title style={{ margin: 0 }} level={5}>Valor referencia dólar</Title>
            <Title style={{ margin: 0 }} level={4}>${dollarValue} CLP</Title>
          </Flex>
          <Flex vertical>
            <Text type='secondary'>Este es el valor del dólar que configuraste en tu tienda</Text>
            <Link onClick={()=> {navigate(`/tienda/${item}`)}}>Ir a tienda</Link>
          </Flex>
        </Col>
        <Col xs={24}>
          <Row gutter={32}>
            <Col xs={24}>
              <Divider style={{ marginTop: '0.5rem' }}></Divider>
              <Flex justify='space-between' align='center'>
                <Title style={{ margin: 0 }} level={5}>Estado</Title>
                <Radio.Group
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  buttonStyle="solid"
                >
                  {states.map((state) => (
                    <Radio.Button key={state.value} value={state.value}>
                      {state.label}
                    </Radio.Button>
                  ))}
                </Radio.Group>
              </Flex>
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
        <Divider style={{ margin: '0.25rem' }}></Divider>
        <Col xs={24}>
          <Flex justify="space-between">
            <Title level={5} type="secondary">
              Precio
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              ${unitaryTotal} CLP
            </Title>
          </Flex>
          <Flex justify="space-between">
            <Title level={4}>Total</Title>
            <Title style={{ marginTop: 0 }} level={4}>
              {formattedNumber} CLP
            </Title>
          </Flex>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalUpload
