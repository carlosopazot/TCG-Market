import { PlusOutlined, SettingOutlined, LoadingOutlined } from '@ant-design/icons'
import { Row, Col, Typography, Button, Flex, Card, Empty, Spin, Statistic, Divider, message, Tabs } from 'antd'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useEffect, useState, useContext, useMemo } from 'react'
import { UserContext } from '../../context/UserContext'
import StoreItem from './StoreItem'
import './styles.css'
import { Link } from 'react-router-dom'
import CountUp from 'react-countup';
import { doc, deleteDoc } from "firebase/firestore";

const { Title } = Typography

const Store = () => {
  const [cards, setCards] = useState([])
  const { user } = useContext(UserContext)
  const [loading, setLoading] = useState(true)
  const formatter = (value) => <CountUp end={value} separator="," />;

  useEffect(() => {
    
    const fetchCards = async () => {
      setLoading(true)
      const q = query(collection(db, 'cards'), where('seller.uid', '==', user.uid))
      const querySnapshot = await getDocs(q)

      const cardsData = []
      querySnapshot.forEach((doc) => {
        cardsData.push({ id: doc.id, ...doc.data() })
      })

      setCards(cardsData)
      setLoading(false)
    }

    fetchCards()
  }, [user.email])

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'cards', id));
      setCards(cards.filter((card) => card.id !== id));
      message.success('Carta eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la carta:', error);
      message.error('Error al eliminar la carta');
    }
  }

  const totalStock = useMemo(() => {
    return cards.reduce((accumulator, currentCard) => accumulator + currentCard.stock, 0);
  }, [cards])

  return (
    <>
      <Row gutter={[16,24]}>
        <Col xs={12} md={12}>
          <Title level={2}>Mi tienda</Title>
        </Col>
        <Col xs={12} md={12}>
          <Flex gap={8} justify="end">
            <Button icon={<SettingOutlined />} disabled size="large">
              <span className="hide-mobile">Configurar</span>
            </Button>
            <Link to="/agregar-carta">
              <Button
                type="primary"
                icon={<PlusOutlined />}
                size="large"
              >
                Agregar carta
              </Button>
            </Link>
          </Flex>
        </Col>
        {loading ? (
          <Col xs={24}>
            <Spin
              tip="Cargando tus cartas"
              indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
            >
              <div className="content" />
            </Spin>
          </Col>
        ): (
          <Col xs={24}>
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic title="Total por vender" prefix='$' value={0} formatter={formatter} />
                  </Card>
              </Col>
              <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic title="Total vendido" value={0} formatter={formatter} />
                  </Card>
              </Col>
              <Col xs={24} sm={8}>
                  <Card bordered={false}>
                    <Statistic title="Cartas en coleccion" value={totalStock} formatter={formatter} />
                  </Card>
              </Col>
              {cards.length > 0 ? (
                <Col xs={24}>
                  <Row>
                    <Col xs={24}>
                      <Title level={3}>Mis cartas</Title>
                    </Col>
                  </Row>
                  <Row gutter={[16, 16]}>
                    {cards.map((item) => (
                      <StoreItem key={item.id} item={item} onDelete={handleDelete} />
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
          </Col>
        )}
      </Row>
    </>
  )
}

export default Store
