import { Row, Typography, Col, Card, Empty, Button, Tabs } from "antd";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import Loader from "../Loader/Loader";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchItem from "./SearchItem";
import { Helmet } from "react-helmet-async";

const { Title } = Typography;

const Search = () => {
  const { searchValue } = useContext(SearchContext);
  const [loading, setLoading] = useState(false);
  const [cards, setCards] = useState([]);
  const [editions, setEditions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEditions = async (printsSearchUri) => {
      try {
        const response = await axios.get(printsSearchUri);
        return response.data.data;
      } catch (error) {
        console.error('Error al obtener ediciones relacionadas', error);
        return [];
      }
    };

    const fetchCards = async (name) => {
      try {
        if (name !== '') {
          setLoading(true);
          const response = await axios.get(
            `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(name)}`
          );
          const cardData = response.data;
          setCards([cardData]);
          
          if (cardData.prints_search_uri) {
            const editionsData = await fetchEditions(cardData.prints_search_uri);
            setEditions(editionsData);
          }
          
          console.log('Detalles de la carta:', cardData);
        }
      } catch (error) {
        console.error('Error al obtener detalles de la carta', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards(searchValue);
  }, [searchValue]);

  const filterNonFoil = editions.filter(edition => edition.prices.usd && edition.nonfoil && !edition.finishes.includes('etched'))
  const filterFoil = editions.filter(edition => edition.prices.usd_foil && edition.foil && !edition.finishes.includes('etched'))
  const filterEtched = editions.filter(edition => edition.prices.usd_etched && edition.finishes.includes('etched'))
  console.log('No foil:', filterNonFoil)
  console.log('Foil:', filterFoil)
  console.log(editions)

  const emptyResult = <Card><Empty description='No hay resultados' image={Empty.PRESENTED_IMAGE_SIMPLE} /></Card>;

  if (cards.length === 0 && !loading) {
    return (
      <Row>
        <Col xs={24} md={18}>
          <Card>
            <Row justify='center'>
              <Col xs={24} md={12}>
                <Empty description='Escribe el nombre de tu carta en el buscador para comenzar'>
                  <Button type="primary" onClick={() => navigate('/')}>Volver a inicio</Button>
                </Empty>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    );
  }

  const SearchList = ({ filterCards, foil }) => {
    return (
      <Row gutter={[16,8]}>
        {filterCards.length > 0 ? filterCards.map((edition) => (
          <Col xs={24} key={edition.id}>
            <SearchItem edition={edition} foil={foil} />
          </Col>
        )) : <Col xs={24}>{emptyResult}</Col>}
      </Row>
    );
  }

  const tabItems = [
    {
      key: 'non-foil',
      label: `No Foil (${filterNonFoil.length})`,
      children: (
        <SearchList filterCards={filterNonFoil} foil={false} />
      )
    },
    {
      key: 'foil',
      label: `Foil (${filterFoil.length})`,
      children: (
        <SearchList filterCards={filterFoil} foil={true} />
      )
    },
    {
      key: 'etched',
      label: `Etched (${filterEtched.length})`,
      children: (
        <SearchList filterCards={filterEtched} foil={false} />
      )
    }
  ]

  return (
    <>
      <Helmet>
        <title>Buscador - Card Market</title>
        <meta name="description" content={`Resultados para: ${searchValue} en Card Market`} />
      </Helmet>
      <Row justify='center'>
        {loading ? (
          <Col xs={24}>
            <Loader tip='Buscando en Card Market' />
          </Col>
        ) : (
          <Col xs={24} md={16} lg={12}>
            <Title level={4}>Resultados para: {searchValue}</Title>
            <Row gutter={16}>
              <Col xs={24}>
                <Tabs defaultActiveKey='non-foil' items={tabItems} />
              </Col>
            </Row>
          </Col>
        )}
      </Row>
    </>
  );
};

export default Search;
