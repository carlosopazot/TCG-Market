import { useLocation, useParams, useNavigate } from "react-router-dom"
import { Card, Typography, Row, Col, Image, Empty, Button } from "antd"
import { useEffect, useState, useContext } from "react"
import { collection, query, where, getDocs } from "firebase/firestore"
import { db } from "../../firebase/config"
import { UserContext } from "../../context/UserContext"
import { ThemeContext } from "../../context/ThemeContext"
import Loader from "../Loader/Loader"
import SliderCard from "../SliderCard/SliderCard"
import { Helmet } from "react-helmet-async"
import axios from "axios"
import AddModal from "./AddModal"
import CardInfo from "./CardInfo"

const { Title } = Typography

const CardDetail = () => {

  const location = useLocation()
  const { name } = useParams()
  const { user } = useContext(UserContext)
  const { openMessage } = useContext(ThemeContext)
  const { edition, foil } = location.state 

  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentDollar, setCurrentDollar] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)

  const dollar = currentDollar.toFixed(0)
  const price = foil ? edition.prices.usd_foil : edition.prices.usd
  const priceClp = price * currentDollar
  const navigate = useNavigate()

  const showModal = () => {
    setModalOpen(true)
  }

  const handleOk = () => {
    setModalOpen(false)
  }

  const handleCancel = () => {
    setModalOpen(false)
  }

  const getDollarPrice = async () => {
    try {
      const response = await axios.get('https://mindicador.cl/api')
      setCurrentDollar(response.data.dolar.valor)
    } catch (error) {
      openMessage('error', 'Error al obtener el valor del dólar')
    }
  }

  useEffect(() => {
    setLoading(true)
    const productosRef = collection(db, 'cards')
    const docsRef = edition.name
      ? query(productosRef, where('name', '==', edition.name))
      : productosRef

    getDocs(docsRef)
      .then((querySnapshot) => {
        const docs = querySnapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          }
        })
        setCards(docs.filter(card => card.stock !== 0))
      })
      .finally(() => setLoading(false))
  }, [edition.name, user])

  useEffect(() => {
    getDollarPrice()
  }, [])


  return (
    <>
      <Helmet>
        <title>{edition.name} - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row>
        <Col xs={24}>
          <Row gutter={[16,16]}>
            <Col xs={24} md={8} lg={6}>
              <Card style={{ height: '100%' }}>
                <Row justify='center'>
                  <Col xs={16} md={24} lg={24}>
                    <Image src={edition.image_uris.normal} alt={edition.name} style={{ width: '100%', borderRadius: '12px' }} />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col xs={24} md={16} lg={18}>
              <CardInfo 
                edition={edition} 
                price={price} 
                priceClp={priceClp} 
                dollar={dollar} 
                showModal={showModal} 
                user={user} 
                foil={foil} 
              />
            </Col>
            <Col xs={24} style={{ marginTop: '1rem' }}>
              {loading ? 
                <Loader top='2rem' tip='Cargando' /> :
                <Row gutter={[16,16]}>
                  <Col xs={24}>
                    {cards.length === 0 ? 
                      <Card>
                        <Empty description='No hay cartas disponibles en el marketplace'>
                          <Button disabled size="large" type="primary" onClick={() => navigate('/publicar-carta')}>Agregar a lista de deseados</Button>
                        </Empty>
                      </Card> : 
                      <>
                        <Title level={4}>Publicadas en Marketplace</Title>
                        <SliderCard slides={6} cards={cards}></SliderCard>
                      </>
                    }
                  </Col>
                </Row>  
              }
            </Col>
          </Row>
        </Col>
      </Row>
      <AddModal 
        open={modalOpen} 
        item={edition}
        price={price} 
        handleOk={handleOk} 
        handleCancel={handleCancel}
        foil={foil}
      />
    </>
  )
}

export default CardDetail