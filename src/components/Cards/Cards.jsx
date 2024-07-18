import { Row, Typography, Col, Card, Switch, Flex } from "antd";
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState } from "react";
import ItemCard from "../ItemCard/ItemCard";
import Loader from "../Loader/Loader";

const { Title, Text } = Typography;

const Cards = () => {

  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(collection(db, 'cards'));
        const cardsData = [];
        querySnapshot.forEach((doc) => {
          cardsData.push({ id: doc.id, ...doc.data() });
        });
        setCards(cardsData);
      } catch (error) {
        console.error('Error fetching cards:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchCards();
  }, []);

  const foilChange = (checked) => {
    if (checked) {
      const foilCards = cards.filter(card => card.foil);
      setCards(foilCards);
    } else {
      setCards(cards)
    }
  }

  return (
    <>
      <Title level={2}>Todas las cartas</Title>
      <Row gutter={[16  ]}>
        {loading ? ( 
          <Col xs={24}>
            <Loader tip='Cargando' />
          </Col>
        ) : (
          <>
            <Col lg={18}>
              <Row gutter={[0,8]}>
                {cards.map((card) => (
                  <Col xs={24} md={12} lg={6} key={card.id}>
                    <ItemCard item={card} />
                  </Col>
                ))}
              </Row>
            </Col>
            <Col lg={6}>
              <Card title='Filtros'>
                <Flex align="center" justify="space-between">
                  <Text>Foil</Text>
                  <Switch size="small" defaultChecked={false} onChange={foilChange}  />
                </Flex>
              </Card>
            </Col>
          </>
        )}
      </Row>
    </>
  )
}

export default Cards;