import { Row, Col, Typography, Card, Empty, message, Alert, Button, Divider } from 'antd'
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
  const { store } = useContext(StoreContext)
  const { openMessage  } = useContext(ThemeContext)
  const navigate = useNavigate()

  useEffect(() => {

    if (!store.phone && user.phone) {
      const setStoreNumber = async () => {
        try {
          const storeRef = doc(db, 'stores', store.id);
          await updateDoc(storeRef, {
            phone: user.phone
          });
        } catch (error) {
          console.error('Error updating store phone number:', error);
          openMessage('error', 'Error updating store phone number');
        }
      };
      setStoreNumber();
    }

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
  }, [openMessage, store.id, store.phone, user.phone]);

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
        'stock' : 0
      })
      setCards(cards.filter((card) => card.stock !== 0))
      message.success('Se archivo la carta como vendida')
    } catch (error) {
      console.error('Error al marcar la carta como vendida:', error)
      message.error('Error al marcar la carta como vendida')
    }
  }

  const totalStock = useMemo(() => {
    return cards.reduce(
      (accumulator, currentCard) => accumulator + currentCard.stock,
      0
    )
  }, [cards])

  const totalForSell = useMemo(() => {
    return cards.reduce((total, item) => total + Number(item.total), 0)
  }, [cards])

  return (
    <>
      <Helmet>
        <title>Mi tienda - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={[16, 16]} justify='space-between'>
      {user.phone === null ? (
        <Col xs={24}>
          <Alert
            style={{ border : 0 }}
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
        <StoreHeader item={store} ></StoreHeader>
        <StoreStats
          totalStock={totalStock}
          totalForSell={totalForSell}
        />
        <Col xs={24}>
          <Divider orientation='left'>
            <Title style={{ margin: 0}} level={4}>Colección</Title>
          </Divider>
        </Col>
        <Col xs={24}>
          {loading ? (
            <Loader tip='Cargando cartas'></Loader>
          ) : (
            <Row gutter={[16, 16]}>
              {cards.length > 0 ? (
                <Col xs={24}>
                  <Row gutter={[8,8]}>
                    {cards.map((item) => (
                      <StoreItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onSold={handleSold}
                        user={user.uid}
                      />
                    ))}
                  </Row>
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
