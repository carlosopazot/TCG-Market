import { Row, Typography, Col, Card, Image, Empty, Button } from "antd"
import { useContext, useEffect, useState } from "react"                
import { SearchContext } from "../../context/SearchContext"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Loader from "../Loader/Loader"
import TagsState from "../TagsState/TagsState"
import { useNavigate } from "react-router-dom"

const { Title, Text } = Typography

const Search = () => {
  const { searchValue } = useContext(SearchContext)
  const [loading, setLoading] = useState(true)
  const [cards, setCards] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'cards'),
        where('name', '==', searchValue)
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
  }, [searchValue])
  
  if (cards.length === 0 && !loading) {
    return (
      <main className="main">
        <Row>
          <Col xs={24}>
            <Empty description='No se encontraron coincidencias en Card Market'>
              <Button type="primary" onClick={() => navigate('/')}>Volver a inicio</Button>
            </Empty>
          </Col>
        </Row>
      </main>
    )
  }

  return (
    <main className="main">
      <Row justify='center'>
        {loading ? (
          <Col xs={24}>
            <Loader tip='Buscando en Card Market' />
          </Col>
        ) : (
          <Col xs={24} md={12}>
            <Title level={4}>Resultados de busqueda para: {searchValue}</Title>
            {cards.map((card) => (
              <Card key={card.id} style={{ marginBottom: '1rem' }}>
                <Row gutter={16}>
                  <Col xs={4}>
                    <Image src={card.image} preview={false}></Image>
                  </Col>
                  <Col xs={8}>
                    <Title level={5}>{card.name}</Title>
                    <Text>{card.set_name}</Text>
                    <TagsState item={card}></TagsState>
                    <Title style={{ margin : 0 }} level={4}>{card.price}</Title>
                  </Col>
                  <Col xs={12}>
                    <Text>Vendido por</Text>
                    <Title level={5}>{card.seller.name}</Title>
                  </Col>
                </Row>
              </Card>
            ))}
          </Col>
        )}
      </Row>
    </main>
  )
}

export default Search