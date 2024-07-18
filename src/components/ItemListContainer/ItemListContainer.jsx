import { useState, useEffect, useContext } from 'react'
import ItemList from '../ItemList/ItemList'
import { Empty, Flex, Card, Button, Col, Alert } from 'antd'
import Loader from '../Loader/Loader'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { StoreContext } from '../../context/StoreContext'
import { UserContext } from '../../context/UserContext'
import { useNavigate } from 'react-router-dom'
import Hero from '../Hero/Hero'
import HelmetMeta from '../HelmetMeta/HelmetMeta'

const ItemListContainer = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { store } = useContext(StoreContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  const { stateId } = useParams()

  useEffect(() => {
    setLoading(true)

    const productosRef = collection(db, 'cards')
    const docsRef = stateId
      ? query(productosRef, where('state', '==', stateId))
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
  }, [stateId])

  // const recentCards = cards.sort((a, b) => b.date - a.date)
  const cardsInLocation = cards.filter(card => card.seller.location === store.location)
  // const cardsFoil = recentCards.filter(card => card.foil)

  const cardsObject = [
    {
      title: 'Recientes',
      cards: cards.sort((a, b) => b.date - a.date),
      key: 'recent',
      onClick: () => navigate('/cartas/')
    },
    {
      title: 'Todo foil',
      cards: cards.filter(card => card.foil),
      key: 'foil'
    },
  ]

  return (
    <>
      <HelmetMeta title='Inicio' />
      {loading ? (
        <Loader tip='Cargando' />
      ) : (
        <Flex gap={24} vertical>
          {user.logged && user.phone === null ? (
            <Col xs={24}>
              <Alert
                style={{ border : 0, marginBottom: '2rem'}}
                message="Todavia no verificas tu número"
                description="Para usar tu tienda, debes verificar tu número de teléfono."
                type="warning"
                showIcon
                action={
                  <Button type="primary" onClick={() => navigate('/verificar-numero')}>
                    Verificar
                  </Button>
                }
              />
              </Col>) : (null)
          }
          <Hero />
          {cards.length > 0 ? (
            <Flex style={{ marginBottom: '2rem'}} gap={24} vertical>
              {user && user.logged && store.location ? (
                <ItemList cards={cardsInLocation} title='Ultimas cartas en tu ubicación' />
              ) : (
                null
              )}
              {cardsObject.map((object) => (
                <ItemList loading={loading} onClick={object.onClick} cards={object.cards} title={object.title} key={object.key} />
              ))}
            </Flex>
          ) : (
            <Card>
              <Empty description='No hay cartas' />
            </Card>
          )}
        </Flex>
      )}
    </>
  )
}

export default ItemListContainer
