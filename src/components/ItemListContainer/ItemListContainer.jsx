import { useState, useEffect, useContext } from 'react'
import ItemList from '../ItemList/ItemList'
import { Alert, Empty, Spin, Flex, Button } from 'antd'
import { LoadingOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { StoreContext } from '../../context/StoreContext'
import { UserContext } from '../../context/UserContext'


const ItemListContainer = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { store } = useContext(StoreContext)
  const { user } = useContext(UserContext)

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
        setCards(docs)
      })
      .finally(() => setLoading(false))
  }, [stateId])

  return (
    <>
      {loading ? (
        <Spin
          tip="Cargando"
          indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
        >
          <div className="content" />
        </Spin>
      ) : (
        <main className='main'>
          {cards.length > 0 ? (
            <Flex style={{ marginBottom: '2rem'}} gap={24} vertical>
              {user && user.logged ? (
                <ItemList cards={cards.filter(card => card.seller.location === store.location )} title={`Últimas cartas en ${store.location}`} />
              ) : (
                <Alert 
                description='Ingresa ahora para ver las cartas más recientes en tu ubicación'
                message='Aún no has iniciado sesión'
                type="warning"
                showIcon
                closable
                action={
      
                    <Button type="primary">
                      Ingresar
                    </Button>
                }/>
              )}
              <ItemList cards={cards} title='Recientes' />
              <ItemList cards={cards.filter(card => card.foil )} title='✨ Todo foil' />
            </Flex>
          ) : (
            <Empty description='No hay cartas' />
          )}
        </main>
      )}
    </>
  )
}

export default ItemListContainer
