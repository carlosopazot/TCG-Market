import { Helmet } from "react-helmet-async"
import { Col, Divider, Row, Typography, Card, Empty, Flex } from "antd"
import BackButton from "../BackButton/BackButton"
import { useEffect, useState } from "react"
import { collection, getDocs, query, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import Loader from "../Loader/Loader"
import { formattedClp } from "../../utils/utils"
import AvatarProfile from "../AvatarProfile/AvatarProfile"
import CoverImage from "../CoverImage/CoverImage"
import StoreTags from "../Store/StoreTags"

const { Title, Text } = Typography


const SellerDetail = ({ seller }) => {
  const [cards, setCards] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true)
      const q = query(
        collection(db, 'cards'),
        where('seller.id', '==', seller.id)
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
  }, [seller.id])

  return (
    <>
      <Helmet>
        <title>Tienda de {seller.name} - Card Market</title>
        <meta name="description" content="Card Market - Compra y vende cartas de Magic: The Gathering" />
      </Helmet>
      <Row gutter={[16, 16]} justify='space-between'>
        <Col xs={24}>
          <Flex gap={8} align="center">
            <AvatarProfile src={seller.avatar} name={seller.name} size={48}></AvatarProfile>
            <Flex vertical>
              <Title style={{ margin: 0}} level={3}>Tienda de {seller.name}</Title>
              <StoreTags item={seller} />
            </Flex>
          </Flex>
        </Col>
        <Col xs={24}>
          <Divider orientation='left'>
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
                      <Col xs={12} sm={12} md={6} xl={5} key={item.id}>
                        <Card
                          hoverable
                          cover={<CoverImage item={item} />}
                        >
                          <Title level={5}>{formattedClp(item.price)} </Title>
                        </Card>
                      </Col>
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

export default SellerDetail