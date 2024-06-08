import { Modal, Button, Divider, Row, Col, Flex, Typography, Switch, Input, InputNumber } from 'antd'
import QuantitySelector from './QuantitySelector'
import { useNavigate } from 'react-router-dom'
import { formattedClp } from '../../utils/utils'
import { ExportOutlined } from '@ant-design/icons'
import { useState } from 'react'

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
  priceChange,
  manual,
  customPrice,
}) => {
  const navigate = useNavigate()
  const [isManual, setIsManual] = useState(manual)

  const onChange = () => {
    setIsManual(!manual);
    console.log(`switch to ${manual}`);
  };
  const handleClose = () => {
    setIsManual(false); // Reset manual state to false
    handleCancel(); // Call the original handleCancel function
  };

  const handleAdd = () => {
    setIsManual(false); // Reset manual state to false
    handleOk(); // Call the original handleOk function
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleAdd}
      onCancel={handleClose}
      title={`Agregando ${edition.name}`}
      footer={[
        <Button size="large" key="cancel" onClick={handleClose}>
          Cancelar
        </Button>,
        <Button size="large" key="send" type="primary" onClick={handleAdd} disabled={!unitaryTotal || unitaryTotal === 0}>
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
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Flex justify='space-between'>
            <Title style={{ margin: 0 }} level={5}>Precio manual</Title>
            <Switch checked={manual} onChange={onChange} />
          </Flex>
            {isManual && (
              <InputNumber 
                size='large' 
                defaultValue={customPrice}
                type='number' 
                placeholder='Ingresa un valor'
                onChange={priceChange}
                style={{ width: '100%', marginTop: '1rem'}}
                prefix='$'
              />
            )}   
        </Col>
        <Col xs={24}>
          <Divider></Divider>
          <Flex justify="space-between">
            <Title level={5} type="secondary">
              Precio
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              {formattedClp(customPrice ? customPrice: unitaryTotal)}  <Text type="secondary">CLP</Text>
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
