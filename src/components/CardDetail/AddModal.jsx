import { Col, Modal, Row, Typography, Button, Divider, Flex, Switch, InputNumber, Result } from "antd"
import { useContext, useState } from "react"
import { StoreContext } from "../../context/StoreContext"
import { UserContext } from "../../context/UserContext"
import { formattedClp } from "../../utils/utils"
import QuantitySelector from "../QuantitySelector/QuantitySelector"
import { addDoc, collection, writeBatch } from "firebase/firestore"
import { db } from "../../firebase/config"
import { ThemeContext } from "../../context/ThemeContext"
import { useNavigate } from "react-router-dom"

const { Title, Text} = Typography

const AddModal = ({open, item, foil, price, handleOk, handleCancel}) => {

  const { store } = useContext(StoreContext)
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)

  const [manual, setManual] = useState(false)
  const [customPrice, setCustomPrice] = useState()
  const [cardId, setCardId] = useState(null)
  const [stock, setStock] = useState(1)
  const unitaryTotal = price * store.dollar

  const cardPrice = customPrice ? customPrice : unitaryTotal
  const total = cardPrice * stock

  const navigate = useNavigate()

  const onChange = () => {
    setManual(!manual)
    setCustomPrice(null)
  }

  const priceChange = (value) => {
    setCustomPrice(value)
  }

  const addCard = async () => {
    const card = {
      name: item.name,
      foil: foil,
      date: new Date(),
      stock: stock,
      image: item.image_uris?.normal,
      price: unitaryTotal,
      set: item.set,
      set_name: item.set_name,
      seller: store,
      customPrice: customPrice ? customPrice : null,
      scryId: item.id,
    }
  
    const batch = writeBatch(db)
    const cardsRef = collection(db, 'cards')
  
    batch.commit()
    .then(() => {
      addDoc(cardsRef, card).then((doc) => {
        setCardId(doc.id)
      })
    })
    .catch((error) => {
      console.error('Error adding card:', error)
      openMessage('error', 'Error al agregar la carta')
    })
    .finally(() => {
      handleCancel()
      setStock(1)
      openMessage('success', 'Carta agregada con exito')
    })
  }

  if(!user.logged) {
    return (
      <Modal
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Result 
          status='info' 
          title='¿Quieres vender esta carta?' 
          subTitle='Inicia sesión y comienza a vender tus cartas'  
          extra={[
            <Button size="large" type='primary' key='1' onClick={() => navigate('/login')}>Ingresar ahora</Button>
          ]}
        />
      </Modal>
    )
  }

  return (
    <Modal
      title={<Title level={4}>Agregando {item.name}</Title>}
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button size="large" key="cancel" onClick={handleCancel}>
          Cancelar
        </Button>,
        <Button size="large" key="send" type="primary" onClick={addCard} disabled={!unitaryTotal || unitaryTotal === 0}>
          Agregar
        </Button>,
      ]}
    >
      <Row>
        <Col xs={24}>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Row>
            <Col xs={16} md={18}>
              <Title style={{ margin: 0 }} level={5}>Valor referencia dólar</Title>
              <Text type='secondary'>Este es el valor del dólar que configuraste.</Text>
            </Col>
            <Col xs={8} md={6} style={{ textAlign: 'right'}}>
              <Title style={{ margin: 0 }} level={4}>${store.dollar}</Title>
            </Col>
          </Row>
        </Col>
        <Col xs={24}>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Flex justify='space-between'>
            <Title style={{ margin: 0 }} level={5}>Cantidad</Title>
            <QuantitySelector stock={stock} setStock={setStock}></QuantitySelector>
          </Flex>
        </Col>
        <Col xs={24}>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
          <Flex justify='space-between'>
            <Title style={{ margin: 0 }} level={5}>Precio manual</Title>
            <Switch checked={manual} onChange={onChange} />
          </Flex>
            {manual && (
              <InputNumber 
                size='large' 
                defaultValue={customPrice}
                type='number' 
                placeholder=''
                onChange={priceChange}
                style={{ width: '100%', marginTop: '1rem'}}
                prefix='$'
              />
            )}   
        </Col>
        <Col xs={24}>
          <Divider></Divider>
          <Flex justify="space-between">
            <Title level={5}>
              Precio carta
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              {formattedClp(customPrice ? customPrice: unitaryTotal)}  <Text type="secondary">CLP</Text>
            </Title>
          </Flex>
          <Flex justify="space-between">
            <Title level={5}>
              Precio total
            </Title>
            <Title style={{ marginTop: 0 }} level={5} type="secondary">
              {formattedClp(total)}  <Text type="secondary">CLP</Text>
            </Title>
          </Flex>
          <Divider style={{ marginTop: '0.5rem' }}></Divider>
        </Col>
      </Row>
    </Modal>
  )
}

export default AddModal