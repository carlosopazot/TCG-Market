import { Card, Col, Typography, Row, Flex, Button, Image, Modal, message, Divider, Radio, Switch, Tag } from 'antd'
import { useState, useContext} from 'react'
import QuantitySelector from './QuantitySelector'
import SetIcon from './SetIcon'
import { UserContext } from '../../context/UserContext'
import { db } from '../../firebase/config'
import {
  collection,
  addDoc,
  writeBatch,
  query,
  where,
  documentId,
  getDocs,
} from 'firebase/firestore'

const { Title } = Typography

const UploadItem = ({ edition }) => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stock, setStock] = useState(1)
  const [isFoil, setIsFoil] = useState(false)
  const [dollarValue, setDollarValue] = useState(850);
  const [cardId, setCardId] = useState(null)
  const [state, setState ] = useState('NM')
  
  const { user } = useContext(UserContext)
  const [values, setValues] = useState({
    name: user.name || '',
    email: user.email || '',
    uid: user.uid,
    avatar : user.avatar
  })

  const calculateTotal = () => {
    const unitaryTotal = (edition.prices?.usd * Number(dollarValue)).toFixed(0);
    const total = (edition.prices?.usd * Number(dollarValue) * stock).toFixed(0);
    return { unitaryTotal, total };
  };

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {

    const card = {
      name: edition.name,
      date: new Date(),
      stock: stock,
      image: edition.image_uris?.normal,
      price: (edition.prices?.usd * 850).toFixed(0),
      total: (edition.prices?.usd * Number(dollarValue) * stock).toFixed(0),
      foil: edition.foil,
      state: state, 
      set: edition.set,
      set_name: edition.set_name,
      dollarValue : dollarValue,
      sold: false,
      seller: values
    }

    const batch = writeBatch(db)
    const cardsRef = collection(db,'cards')

    batch.commit().then(() => {
      addDoc(cardsRef, card).then((doc) => {
        setCardId(doc.id)
        console.log(doc.id)
      })
    })

    setIsModalOpen(false);
    setStock(1)
    message.success('Carta agregada con exito')

  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Col xs={24} key={`${edition.set_name}-${edition.name}`}>
      <Card>
        <Row justify='center' gutter={[24,24]}>
          <Col xs={12} sm={4}>
            <Image
              src={edition.image_uris?.normal}
              alt={`${edition.name} - ${edition.set}`}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Title style={{ marginBottom: '0.5rem' }} level={4}>{edition.name}</Title>
            <Flex gap={4} align='center'>
              <SetIcon setCode={edition.set}></SetIcon>
              <Title type='secondary' style={{ marginBottom: '0' }} level={5}>{edition.set_name}</Title>
            </Flex>
            {edition.foil ? <Tag color='gold' bordered={false}>Foil</Tag> : null }
            <Title style={{ marginTop: '1rem' }} type='secondary' level={5}>USD {edition.prices?.usd || '-'}</Title>
            <Title style={{ margin: 0 }} level={4}>${(edition.prices?.usd * 850).toFixed(0) } CLP</Title>
          </Col>
          <Col xs={24} sm={8}>
            <Flex justify="end" align="center">
              <Button onClick={showModal} block size="large">
                Agregar a tienda
              </Button>
              <Modal
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                title={`Agregando ${edition.name}`}
                footer={[
                  <Button size='large' key="cancel" onClick={handleCancel}>
                    Cancelar
                  </Button>,
                  <Button size='large' key="send" type="primary" onClick={handleOk}>
                    Agregar
                  </Button>
                ]}
              >
                <Divider></Divider>
                <Row gutter={[16,32]}>
                  <Col xs={24}>
                    <Title level={5}>Cantidad</Title>
                    <QuantitySelector stock={stock} setStock={setStock}></QuantitySelector>
                  </Col>
                  <Col xs={24}>
                    <Row gutter={32}>
                      <Col xs={12}>
                        <Title level={5}>Estado</Title>
                        <Radio.Group value={state} onChange={(e) => setState(e.target.value)} buttonStyle="solid">
                          <Radio.Button value="NM">NM</Radio.Button>
                          <Radio.Button value="PLD">PLD</Radio.Button>
                          <Radio.Button value="HP">HP</Radio.Button>
                        </Radio.Group>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={24}>
                    <Title level={5}>Valor dólar</Title>
                    <Radio.Group value={dollarValue} buttonStyle="solid" onChange={(e) => setDollarValue(e.target.value)}>
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
                    <Flex justify='space-between'>
                      <Title level={5} type='secondary'>Total unitario</Title>
                      <Title style={{ marginTop: 0 }} level={5} type='secondary'>${calculateTotal().unitaryTotal} CLP</Title>
                    </Flex>
                    <Flex justify='space-between'>
                      <Title level={4}>Total</Title>
                      <Title style={{ marginTop: 0 }} level={4}>${calculateTotal().total} CLP</Title>
                    </Flex>
                  </Col>
                </Row>
              </Modal>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default UploadItem
