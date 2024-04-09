import {
  Card,
  Col,
  Typography,
  Row,
  Flex,
  Button,
  Image,
  message,
  Tag,
} from 'antd'
import { useState, useContext } from 'react'
import SetIcon from './SetIcon'
import { UserContext } from '../../context/UserContext'
import { db } from '../../firebase/config'
import { collection, addDoc, writeBatch } from 'firebase/firestore'
import ModalUpload from './ModalUpload'

const { Title } = Typography

const UploadItem = ({ edition, dollarPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [stock, setStock] = useState(1)
  const [dollarValue, setDollarValue] = useState(850)
  const [cardId, setCardId] = useState(null)
  const [state, setState] = useState('NM')

  const { user } = useContext(UserContext)
  
  const [values, setValues] = useState({
    name: user.name || '',
    email: user.email || '',
    uid: user.uid,
    avatar: user.avatar,
    phone: user.phone,
  })



  const editionPrices =
    edition.prices?.usd ||
    edition.prices?.usd_foil ||
    edition.prices?.usd_etched
  const priceClp = Number(editionPrices * dollarPrice).toFixed(0)

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
      price: calculateTotal().unitaryTotal,
      total: calculateTotal().total,
      foil: edition.foil,
      state: state,
      set: edition.set,
      set_name: edition.set_name,
      dollarValue: dollarValue,
      sold: false,
      seller: values,
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
    message.success('Carta agregada con exito')
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  return (
    <Col xs={24} key={`${edition.cardmarket_id}`}>
      <Card>
        <Row justify="center" gutter={[24, 24]}>
          <Col xs={12} sm={4}>
            <Image
              src={edition.image_uris?.normal}
              alt={`${edition.name} - ${edition.set}`}
            />
          </Col>
          <Col xs={24} sm={12}>
            <Title style={{ marginBottom: '0.5rem' }} level={4}>
              {edition.name}
            </Title>
            <Flex gap={4} align="center">
              <SetIcon setCode={edition.set}></SetIcon>
              <Title type="secondary" style={{ marginBottom: '0' }} level={5}>
                {edition.set_name}
              </Title>
            </Flex>
            {edition.foil ? <Tag color="gold">Foil</Tag> : <Tag>Non Foil</Tag>}
            <Title style={{ marginTop: '1rem' }} type="secondary" level={5}>
              $ {editionPrices} USD
            </Title>
            <Title style={{ margin: 0 }} level={4}>
              ${priceClp} CLP
            </Title>
          </Col>
          <Col xs={24} sm={8}>
            <Flex justify="end" align="center">
              <Button onClick={showModal} block size="large">
                Agregar a tienda
              </Button>
              <ModalUpload
                edition={edition}
                handleCancel={handleCancel}
                handleOk={handleOk}
                isModalOpen={isModalOpen}
                stock={stock}
                setStock={setStock}
                state={state}
                setState={setState}
                dollarValue={dollarValue}
                setDollarValue={setDollarValue}
                unitaryTotal={calculateTotal().unitaryTotal}
                total={calculateTotal().total}
                dollar={dollarPrice}
              ></ModalUpload>
            </Flex>
          </Col>
        </Row>
      </Card>
    </Col>
  )
}

export default UploadItem
