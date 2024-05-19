import {
  Card,
  Col,
  Typography,
  Row,
  Flex,
  Button,
  Image,
  Tag,
} from 'antd'
import { useState, useContext } from 'react'
import SetIcon from './SetIcon'
import { StoreContext } from '../../context/StoreContext'
import { ThemeContext } from '../../context/ThemeContext'
import { db } from '../../firebase/config'
import { collection, addDoc, writeBatch } from 'firebase/firestore'
import ModalUpload from './ModalUpload'
import { formattedClp } from '../../utils/utils'

const { Title, Text } = Typography

const UploadItem = ({ edition, dollarPrice, foil }) => {
  const { store, dollarUSD } = useContext(StoreContext)
  const { openMessage } = useContext(ThemeContext)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stock, setStock] = useState(1)
  const [dollarValue, setDollarValue] = useState(store.dollar)
  const [cardId, setCardId] = useState(null)

  const editionPrices = foil ? edition.prices?.usd_foil : edition.prices?.usd || edition.prices?.usd_etched
  const priceClp = (value) => Number(editionPrices * (value)).toFixed(0)
  const isFoil = foil ? true : false

  const calculateTotal = () => {
    const unitaryTotal = (editionPrices * Number(dollarValue)).toFixed(0)
    const total = (unitaryTotal * stock).toFixed(0)
    return { unitaryTotal, total }
  }

  const showModal = () => {
    setIsModalOpen(true)
  }

  const handleOk = async () => {
    const card = {
      name: edition.name,
      date: new Date(),
      stock: stock,
      image: edition.image_uris?.normal,
      price: editionPrices,
      foil: isFoil,
      set: edition.set,
      set_name: edition.set_name,
      dollarValue: dollarValue,
      sold: false,
      seller: store,
    }

    const batch = writeBatch(db)
    const cardsRef = collection(db, 'cards')

    batch.commit().then(() => {
      addDoc(cardsRef, card).then((doc) => {
        setCardId(doc.id)
        console.log(doc.id)
      })
    })

    setIsModalOpen(false)
    setStock(1)
    openMessage('success', 'Carta agregada con exito')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Col xs={24} key={`${edition.cardmarket_id}`}>
      <Card style={{ marginBottom: '1rem'}}>
        <Row gutter={[24, 24]}>
          <Col xs={12} sm={6}>
            <Image
              src={edition.image_uris?.normal}
              alt={`${edition.name} - ${edition.set}`}
            />
          </Col>
          <Col xs={24} sm={18}>
            <Row>
              <Col xs={24}>
                <Title style={{ marginBottom: '0.5rem' }} level={4}>
                  {edition.name}
                </Title>
                <Flex gap={4} align="center">
                  <SetIcon setCode={edition.set}></SetIcon>
                  <Title type="secondary" style={{ marginBottom: '0' }} level={5}>
                    {edition.set_name}
                  </Title>
                  {foil? <Tag color="gold">Foil</Tag> : <Tag>Non Foil</Tag>}
                </Flex>
              </Col>
              <Col xs={24}>
                {foil ? (
                  <Title style={{ marginTop: '1rem' }} type="secondary" level={5}>
                    $ {edition.prices?.usd_foil} <Text type="secondary">USD</Text>
                  </Title>
                ) : (
                  <Title style={{ marginTop: '1rem' }} type="secondary" level={5}>
                    $ {edition.prices?.usd} <Text type="secondary">USD</Text>
                  </Title>
                )}
                <Title style={{ margin: 0 }} level={4}>
                  {formattedClp(priceClp(dollarUSD))} <Text>CLP</Text>
                </Title>
              </Col>
              <Col xs={24}>
                <Flex justify="end" align="center">
                  <Button onClick={showModal} size="large">
                    Agregar a tienda
                  </Button>
                  <ModalUpload
                    edition={edition}
                    handleCancel={handleCancel}
                    handleOk={handleOk}
                    isModalOpen={isModalOpen}
                    stock={stock}
                    setStock={setStock}
                    dollarValue={store.dollar}
                    setDollarValue={setDollarValue}
                    unitaryTotal={calculateTotal().unitaryTotal}
                    total={calculateTotal().total}
                    dollar={dollarPrice}
                    item={store.id}
                  ></ModalUpload>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default UploadItem
