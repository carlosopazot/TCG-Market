import { message, Row, Col, Typography, Card, Statistic} from 'antd'
import axios from 'axios'
import { useState, useContext, useEffect } from 'react'
import CardSearch from './CardSearch'
import CardResults from './CardResults'
import { StoreContext } from '../../context/StoreContext'

const { Title } = Typography

const UploadCard = () => {
  const [searchResults, setSearchResults] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState(null)
  const [editions, setEditions] = useState([])
  const { dollarUSD, setDollarUSD } = useContext(StoreContext)

  useEffect(() => {
    const fetchDollarValue = async () => {
      if (dollarUSD === null) {
        try {
          const response = await axios.get('https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=02f2e2e7a7dcc80cd3987fd612866f56dd7a04ef&formato=json');
          const data = response.data;
          const dollarValue = parseFloat(data.Dolares[0].Valor);
          setDollarUSD(dollarValue);
        } catch (error) {
          console.error('Error fetching dollar value:', error);
        }
      }
    };
  
    fetchDollarValue();
  }, [dollarUSD, setDollarUSD]);

  const handleSearch = async (value) => {
    try {
      // Habilita el indicador de carga
      setLoading(true)

      const response = await axios.get(
        `https://api.scryfall.com/cards/autocomplete?q=${encodeURIComponent(value)}`
      )
      const fetchedResults = response.data.data

      // Actualiza el estado con los resultados de búsqueda
      setSearchResults(fetchedResults)

      if (fetchedResults.length === 1) {
        // Si solo hay una coincidencia, obtén los detalles de la carta
        await getCardDetails(fetchedResults[0])
      }
    } catch (error) {
      console.error('Error al buscar coincidencias', error)

      // Muestra un mensaje de error
      message.error(
        'Error al buscar coincidencias. Por favor, inténtalo de nuevo.'
      )
    } finally {
      // Deshabilita el indicador de carga después de que la búsqueda se haya completado
      setLoading(false)
    }
  }

  const fetchEditions = async (printsSearchUri) => {
    try {
      const response = await axios.get(printsSearchUri)
      return response.data.data
    } catch (error) {
      console.error('Error al obtener ediciones relacionadas', error)
      return []
    }
  }

  const getCardDetails = async (cardName) => {
    clearSearch()
    try {
      const response = await axios.get(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
      )
      const cardData = response.data

      // Actualiza el estado con los detalles de la carta
      setCardDetails(cardData)
      setEditions(
        cardData.prints_search_uri
          ? await fetchEditions(cardData.prints_search_uri)
          : []
      )
      console.log('Detalles de la carta:', cardData)
    } catch (error) {
      console.error('Error al obtener detalles de la carta', error)
    }
  }

  const handleSelectChange = async (value) => {
    setSelectedCard(value)

    try {
      await getCardDetails(value)
    } catch (error) {
      console.error('Error al obtener detalles de la carta', error)
    }
  }

  const clearSearch = () => {
    setSearchResults([])
    setSelectedCard(null)
    setCardDetails(null)
  }

  return (
    <>
      <Row gutter={[16, 24]}>
        <Col xs={24} md={16}>
          <Row justify="space-between">
            <Col xs={24} md={14}>
              <Title level={3}>Vende tus cartas</Title>
              <Title style={{ marginTop: 0 }} level={5} type="secondary">
                Ingresa el nombre de tu carta, completa la información y súbela a
                tu tienda.
              </Title>
            </Col>
            <Col xs={24} md={8}>
              <Card>
                <Statistic title="Valor dolar actual" value={`$${dollarUSD}`} loading={!dollarUSD} />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={16}>
          <CardSearch
            onSearch={handleSearch}
            onSelect={handleSelectChange}
            searchResults={searchResults}
            loading={loading}
            selectedCard={selectedCard}
          ></CardSearch>
        </Col>
        {cardDetails && (
          <Col xs={24} md={16}>
            <CardResults
              cardDetails={cardDetails}
              editions={editions}
              clearSearch={clearSearch}
            />
          </Col>
        )}
      </Row>
    </>
  )
}

export default UploadCard
