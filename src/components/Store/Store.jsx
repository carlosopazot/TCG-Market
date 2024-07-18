import { Row, Col, Card, Empty, Tabs, Segmented } from 'antd'
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
import StoreStats from './StoreStats'
import Loader from '../Loader/Loader'
import { Helmet } from 'react-helmet-async'
import { BarsOutlined, AppstoreOutlined } from '@ant-design/icons'
import StoreList from './StoreList'

const Store = () => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)
  const { store, setStore } = useContext(StoreContext)
  const [ isStoreUpdated, setIsStoreUpdated ] = useState()
  const { openMessage  } = useContext(ThemeContext)
  const [list, setList] = useState('list')

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
      openMessage('success','Carta eliminada con éxito')
      console.log(id)
    } catch (error) {
      console.error('Error al eliminar la carta:', error)
      openMessage('error', 'Error al eliminar la carta')
    }
  }

  const handleSold = async (id) => {
    try {
      const docRef = doc(db, 'cards', id) 
      await updateDoc(docRef, {
        stock: 0,
      })
      setCards(cards.filter((card) => card.id !== id))
      openMessage('success', 'Carta marcada como vendida')
    } catch (error) {
      console.error('Error al marcar la carta como vendida:', error)
      openMessage('error', 'Error al marcar la carta como vendida')
    }
  }



  const onSaleCards = cards.filter((item) => item.stock !== 0)
  const soldCards = cards.filter((item) => item.stock === 0)

  const totalStock = useMemo(() => {
    return onSaleCards.reduce(
      (accumulator, currentCard) => accumulator + currentCard.stock,
      0
    )
  }, [onSaleCards])

  const totalForSell = useMemo(() => {
    return onSaleCards.reduce((total, item) => total + Number(item.price) * item.stock, 0)
  }, [onSaleCards])

  const totalSold = useMemo(() => {
    return soldCards.reduce((total, item) => total + Number(item.price) * item.stock, 0)
  }, [soldCards])

  const tabsItems = [
    {
      key: '1',
      label: 'Activas',
      children: (
        <StoreList
          list={list}
          handleDelete={handleDelete}
          handleSold={handleSold}
          user={user}
          cards={onSaleCards}
        />
      )
    },
    {
      key: '2',
      label: 'Vendidas',
      children: (
        <StoreList
          list={list}
          handleDelete={handleDelete}
          handleSold={handleSold}
          user={user}
          cards={soldCards}
        />
      )
    }
  ]

  const options = [
    {
      label: 'Lista',
      value: 'list',
      icon: <BarsOutlined />,
    },
    {
      label: 'Galería',
      value: 'galery',
      icon: <AppstoreOutlined />,
    }
  ]

  const toggleList = (value) => {
    setList(value)
    console.log(value)
  }

  const listToggle =  <Segmented options={options} defaultValue={list} onChange={toggleList}/>

  return (
    <>
      <Helmet>
        <title>Mi tienda - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={[16, 16]} justify='space-between'>
        <StoreHeader/>
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
                  <Tabs tabBarExtraContent={listToggle} defaultActiveKey="1" items={tabsItems} destroyInactiveTabPane  />
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
