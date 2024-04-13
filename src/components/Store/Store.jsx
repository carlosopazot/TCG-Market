import { Row, Col, Typography, Card, Empty, message, Alert, Button } from 'antd'
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
import StoreHeader from './StoreHeader'
import StoreItem from './StoreItem'
import StoreStats from './StoreStats'
import Loader from '../Loader/Loader'
import { useNavigate } from 'react-router-dom'
import BackButton from '../BackButton/BackButton'
import { set } from 'lodash'

const { Title, Text } = Typography

const Store = ({ item }) => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()
  const matchStore = item.id === user.uid

  useEffect(() => {

    if(user.phone) {
      const setStoreNumber = async () => {
        try {
          const storeRef = doc(db, 'stores', item.id)
          await updateDoc(storeRef, {
            phone: user.phone
          })
        } catch (error) {
          console.error('Error al actualizar el número de la tienda:', error)
          message.error('Error al actualizar el número de la tienda')
        }
      }
      setStoreNumber()
    }

    const fetchCards = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'cards'),
        where('seller.id', '==', item.id)
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
  }, [item.id, user.phone]);

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
    <main className='main'>
      <Row>
        <BackButton></BackButton>
      </Row>
      <Row gutter={[16, 24]} justify='space-between'>
      {user.uid === item.id && user.phone === null ? (
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
        <StoreHeader item={item} matchStore={matchStore}></StoreHeader>
        <Col xs={24}>
          {loading ? (
            <Loader></Loader>
          ) : (
            <Row gutter={[16, 16]}>
              {matchStore ? (
              <StoreStats
                totalStock={totalStock}
                totalForSell={totalForSell}
              />) : null }
              {cards.length > 0 ? (
                <Col xs={24}>
                  {matchStore ? (
                    <Row>
                      <Col xs={24}>
                        <Title level={3}>Carpeta</Title>
                      </Col>
                    </Row>
                  ) : null}
                  <Row gutter={[16, 16]}>
                    {cards.map((item) => (
                      <StoreItem
                        key={item.id}
                        item={item}
                        onDelete={handleDelete}
                        onSold={handleSold}
                        user={user.uid}
                      />
                    ))}
                    {/* <Col xs={24}>
                      <Table columns={columns} dataSource={cards}></Table>
                    </Col> */}
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
    </main>
  )
}

export default Store
