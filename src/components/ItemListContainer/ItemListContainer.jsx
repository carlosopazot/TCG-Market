import { useState, useEffect, useContext } from 'react'
import ItemList from '../ItemList/ItemList'
import { Empty, Spin, Flex, Card, Button, Col, Alert } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { StoreContext } from '../../context/StoreContext'
import { UserContext } from '../../context/UserContext'
import { Helmet } from 'react-helmet-async'
import { useNavigate } from 'react-router-dom'


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
        setCards(docs.filter(card => card.sold === false))
      })
      .finally(() => setLoading(false))
  }, [stateId])

  return (
    <>
      <Helmet>
        <title>Inicio - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      {loading ? (
        <Spin
          tip="Cargando"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
          <div className="content" />
        </Spin>
      ) : (
        <>
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
          {cards.length > 0 ? (
            <Flex style={{ marginBottom: '2rem'}} gap={24} vertical>
              {user && user.logged && store.location ? (
                <ItemList cards={cards.filter(card => card.seller.location === store.location )} title={`Últimas cartas en ${store.location}`} />
              ) : (
                null
              )}
              <ItemList cards={cards} title='Recientes' />
              <ItemList cards={cards.filter(card => card.foil )} title='✨ Todo foil' />
            </Flex>
          ) : (
            <Card>
              <Empty description='No hay cartas' />
            </Card>
          )}
        </>
      )}
    </>
  )
}

export default ItemListContainer
