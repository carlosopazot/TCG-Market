import { message, Row, Col, Typography, Spin, Card, Statistic } from 'antd'
import axios from 'axios'
import { useState, useEffect } from 'react'
import CardSearch from './CardSearch'
import CardResults from './CardResults'
import BackButton from '../BackButton/BackButton'

const { Title } = Typography

const UploadCard = () => {
  const [searchResults, setSearchResults] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState(null)
  const [editions, setEditions] = useState([])
  const [dollar, setDollar] = useState(null)

  useEffect(() => {
    // Función para llamar a la API
    const fetchDollarValue = async () => {
      try {
        const response = await fetch(
          'https://api.cmfchile.cl/api-sbifv3/recursos_api/dolar?apikey=02f2e2e7a7dcc80cd3987fd612866f56dd7a04ef&formato=json'
        )
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        // Suponiendo que el valor del dólar se encuentra en data.Dolares[0].Valor
        const dollarValue = parseFloat(data.Dolares[0].Valor)
        setDollar(dollarValue)
        console.log(data.Dolares[0].Valor)
      } catch (error) {
        console.error('Error fetching dollar value:', error)
      }
    }

    // Llamar a la función para obtener el valor del dólar al cargar el componente
    fetchDollarValue()
  }, [])

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
    <main className="main">
      <Row justify="center" gutter={[16, 24]}>
        <Col xs={24} md={16}>
          <BackButton></BackButton>
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
                {dollar ? (
                  <Statistic title="Valor dolar actual" value={`$ ${dollar}`} />
                ) : (
                  <Spin />
                )}
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={16} style={{ position: 'sticky', top: '80px' }}>
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
              dollarPrice={dollar}
            />
          </Col>
        )}
      </Row>
    </main>
  )
}

export default UploadCard
