import { Row, Typography, Col, Card, Image, Empty, Button, Flex } from "antd"
import { useContext, useEffect, useState } from "react"                
import { SearchContext } from "../../context/SearchContext"
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase/config'
import Loader from "../Loader/Loader"
import TagsState from "../TagsState/TagsState"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import CoverImage from "../CoverImage/CoverImage"

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
      <Row>
        <Col xs={24}>
          <Empty description='No se encontraron coincidencias en Card Market'>
            <Button type="primary" onClick={() => navigate('/')}>Volver a inicio</Button>
          </Empty>
        </Col>
      </Row>
    )
  }

  return (
      <Row justify='center'>
        {loading ? (
          <Col xs={24}>
            <Loader tip='Buscando en Card Market' />
          </Col>
        ) : (
          <Col xs={24} md={12}>
            <Title level={4}>Resultados de busqueda para: {searchValue}</Title>
            {cards.map((card) => (
              <Link to={`/item/${card.id}`} key={card.id}>
                <Card hoverable style={{ marginBottom: '1rem' }}>
                  <Row gutter={16}>
                    <Col xs={8} md={8} lg={4}>
                      <CoverImage noTag={true} item={card}></CoverImage>
                    </Col>
                    <Col xs={14} lg={20}>
                      <Row gutter={[16,16]}>
                        <Col xs={24} lg={16}>
                          <Flex vertical gap={16}>
                            <div>
                              <Title style={{ marginBottom: 0 }} level={4}>{card.name}</Title>
                              <Text type="secondary">{card.set_name}</Text>
                            </div>
                            <TagsState item={card}></TagsState>
                          </Flex>
                        </Col>
                        <Col xs={24} lg={8}>
                          <Flex>
                            <Title style={{ margin : 0 }} level={3}>${card.price}</Title>
                          </Flex>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card>
              </Link>
            ))}
          </Col>
        )}
      </Row>
  )
}

export default Search