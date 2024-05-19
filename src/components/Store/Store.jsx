import { Row, Col, Typography, Card, Empty, message, Alert, Button, Divider, Tabs, Table } from 'antd'
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  doc,
  deleteDoc,
} from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useEffect, useState, useContext, useMemo } from 'react'
import { UserContext } from '../../context/UserContext'
import { StoreContext } from '../../context/StoreContext'
import { ThemeContext } from '../../context/ThemeContext'
import StoreHeader from './StoreHeader'
import StoreItem from './StoreItem'
import StoreStats from './StoreStats'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const { Title } = Typography

const Store = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)
  const { store, setStore } = useContext(StoreContext)
  const [ isStoreUpdated, setIsStoreUpdated ] = useState()
  const { openMessage  } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const q = query(
          collection(db, 'stores'),
          where('email', '==', user.email)
        )
        const querySnapshot = await getDocs(q)
        const storeData = []
        querySnapshot.forEach((doc) => {
          storeData.push({ id: doc.id, ...doc.data() })
        })
        storeData.forEach((store) => {
          if (!isStoreUpdated) {
            setStore(store);
            setIsStoreUpdated(true);
            localStorage.setItem('store', JSON.stringify(store));
            console.log(store);
          } 
        });

      } catch (error) {
        console.error('Error fetching store:', error)
        openMessage('error','Error al obtener la tienda')
      }
    }

    fetchStore()
  }, [isStoreUpdated, openMessage, setStore, user]);

  useEffect(() => {
    if (store.id) {
      const fetchCards = async () => {
        setLoading(true)
        const q = query(
          collection(db, 'cards'),
          where('seller.id', '==', store.id)
        )
        const querySnapshot = await getDocs(q)

        const cardsData = []
        querySnapshot.forEach((doc) => {
          cardsData.push({ id: doc.id, ...doc.data() })
        })

        setCards(cardsData)
        console.log(cardsData)
        setLoading(false)
      }

      fetchCards()
    }
  }, [store]);

  const handleDelete = async (id) => {
    console.log(id)
    try {
      await deleteDoc(doc(db, 'cards', id))
      setCards(cards.filter((card) => card.id !== id))
      message.success('Carta eliminada con éxito')
      console.log(id)
    } catch (error) {
      console.error('Error al eliminar la carta:', error)
      message.error('Error al eliminar la carta')
    }
  }

  const handleSold = async (id) => {
    try {
      const docRef = doc(db, 'cards', id) 
      await updateDoc(docRef, {
        'sold' : true
      })
      setCards(cards.filter((card) => card.id !== id))
      openMessage('success', 'Carta marcada como vendida')
    } catch (error) {
      console.error('Error al marcar la carta como vendida:', error)
      openMessage('error', 'Error al marcar la carta como vendida')
    }
  }



  const onSaleCards = cards.filter((item) => item.sold === false)
  const soldCards = cards.filter((item) => item.sold === true)

  const totalStock = useMemo(() => {
    return onSaleCards.reduce(
      (accumulator, currentCard) => accumulator + currentCard.stock,
      0
    )
  }, [onSaleCards])

  const totalForSell = useMemo(() => {
    return onSaleCards.reduce((total, item) => total + Number(item.price * item.seller.dollar) * item.stock, 0)
  }, [onSaleCards])

  const totalSold = useMemo(() => {
    return soldCards.reduce((total, item) => total + Number(item.price * item.seller.dollar) * item.stock, 0)
  }, [soldCards])

  const tabsItems = [
    {
      key: '1',
      label: 'Activas',
      children: (
        <Col xs={24}>
          <Row gutter={[8,8]}>
            {onSaleCards
              .map((item) => (
                <StoreItem
                  key={item.id}
                  item={item}
                  onDelete={handleDelete}
                  onSold={handleSold}
                  user={user.uid}
                />
            ))}
            {onSaleCards.length === 0 && (
              <Col xs={24}>
                <Card>
                  <Empty description="No hay cartas para mostrar"></Empty>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      )
    },
    {
      key: '2',
      label: 'Vendidas',
      children: (
        <Col xs={24}>
          <Row gutter={[8,8]}>
            {soldCards
              .map((item) => (
              <StoreItem
                key={item.id}
                item={item}
                onDelete={handleDelete}
                onSold={handleSold}
                user={user.uid}
              />
            ))}
            {soldCards.length === 0 && (
              <Col xs={24}>
                <Card>
                  <Empty description="No hay cartas para mostrar"></Empty>
                </Card>
              </Col>
            )}
          </Row>
        </Col>
      )
    }
  ]

  return (
    <>
      <Helmet>
        <title>Mi tienda - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={[16, 16]} justify='space-between'>
        <StoreHeader item={store} ></StoreHeader>
        <StoreStats
          totalStock={totalStock}
          totalForSell={totalForSell}
          totalSold={totalSold}
          loading={loading}
        />
        <Col xs={24}>
          {loading ? (
            <div style={{ marginTop: '3rem'}}>
              <Loader tip='Cargando cartas'></Loader>
            </div>
          ) : (
            <Row gutter={[16, 16]} style={{ marginBottom: '2rem'}}>
              {cards.length > 0 ? (
                <Col xs={24}>
                  <Tabs defaultActiveKey="1" items={tabsItems} destroyInactiveTabPane />
                </Col>
              ) : (
                <Col xs={24}>
                  <Card>
                    <Empty description="No hay cartas para mostrar"></Empty>
                  </Card>
                </Col>
              )}
            </Row>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Store
