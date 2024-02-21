import { Modal, Button, Divider, Row, Col, Radio, Flex, Typography } from 'antd'
import QuantitySelector from './QuantitySelector'

const { Title } = Typography

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
  setDollarValue,
  total,
  unitaryTotal,
  dollar,
}) => {
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
      <Divider></Divider>
      <Row gutter={[16, 32]}>
        <Col xs={24}>
          <Title level={5}>Cantidad</Title>
          <QuantitySelector
            stock={stock}
            setStock={setStock}
          ></QuantitySelector>
        </Col>
        <Col xs={24}>
          <Row gutter={32}>
            <Col xs={12}>
              <Title level={5}>Estado</Title>
              <Radio.Group
                value={state}
                onChange={(e) => setState(e.target.value)}
                buttonStyle="solid"
              >
                <Radio.Button value="NM">NM</Radio.Button>
                <Radio.Button value="PLD">PLD</Radio.Button>
                <Radio.Button value="HP">HP</Radio.Button>
              </Radio.Group>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Title level={5}>Valor dólar</Title>
          <Radio.Group
            value={dollarValue}
            buttonStyle="solid"
            onChange={(e) => setDollarValue(e.target.value)}
          >
            <Radio.Button value={dollar}>{dollar}</Radio.Button>
            <Radio.Button value={850}>850</Radio.Button>
            <Radio.Button value={800}>800</Radio.Button>
            <Radio.Button value={750}>750</Radio.Button>
            <Radio.Button value={700}>700</Radio.Button>
            <Radio.Button value={650}>650</Radio.Button>
            <Radio.Button value={600}>600</Radio.Button>
          </Radio.Group>
        </Col>
        <Divider></Divider>
        <Col xs={24}>
          <Flex justify="space-between">
            <Title level={5} type="secondary">
              Total unitario
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              ${unitaryTotal} CLP
            </Title>
          </Flex>
          <Flex justify="space-between">
            <Title level={4}>Total</Title>
            <Title style={{ marginTop: 0 }} level={4}>
              ${total} CLP
            </Title>
          </Flex>
        </Col>
      </Row>
    </Modal>
  )
}

export default ModalUpload
