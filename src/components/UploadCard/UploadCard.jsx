import {
  message,
  Button,
  Select,
  Row,
  Col,
  Typography,
  Spin
} from 'antd'
import axios from 'axios'
import { useState } from 'react'
import UploadItem from './UploadItem'
import { useNavigate } from 'react-router-dom'
import { LeftOutlined, SearchOutlined } from '@ant-design/icons'

const { Title } = Typography


const UploadCard = () => {
  const [searchResults, setSearchResults] = useState([])
  const [selectedCard, setSelectedCard] = useState(null)
  const [loading, setLoading] = useState(false)
  const [cardDetails, setCardDetails] = useState(null)
  const [editions, setEditions] = useState([])
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }


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
    try {
      const response = await axios.get(
        `https://api.scryfall.com/cards/named?exact=${encodeURIComponent(cardName)}`
      )
      const cardData = response.data

      // console.log('Detalles de la carta:', cardData)

      // Actualiza el estado con los detalles de la carta
      setCardDetails(cardData)
      setEditions(
        cardData.prints_search_uri
          ? await fetchEditions(cardData.prints_search_uri)
          : []
      )
    } catch (error) {
      console.error('Error al obtener detalles de la carta', error)
    }
  }

  const handleSelectChange = async (value) => {
    
    clearSearch()
    setSelectedCard(value)

    try {
      await getCardDetails(value)
    } catch (error) {
      console.error('Error al obtener detalles de la carta', error)
    }
  }

  const clearSearch = () => {
    // Limpia el estado de los resultados de búsqueda, la carta seleccionada y los detalles de la carta
    setSearchResults([])
    setSelectedCard(null)
    setCardDetails(null)
  }

  return (
    <Row justify='center' gutter={[16, 24]}>
      <Col xs={24} md={16}>
        <Button type='link' icon={<LeftOutlined/>} onClick={handleBack} size='large' style={{ marginBottom: '1rem', paddingLeft: 0 }}>Volver a mi tienda</Button>
        <Title level={3}>Vende tus cartas</Title>
        <Title style={{ marginTop : 0 }} level={5} type="secondary">
         Ingresa el nombre de tu carta, completa la información y súbela a tu tienda.
        </Title>
      </Col>
      <Col xs={24} md={16} style={{ position: 'sticky', top: '80px'}}>
        <Select
          allowClear
          showSearch
          placeholder="Ej: Counterspell"
          optionLabelProp="label"
          filterOption={false}
          onSearch={handleSearch}
          defaultOpen={false}
          onChange={handleSelectChange}
          value={selectedCard}
          style={{ width: '100%' }}
          suffixIcon={<SearchOutlined/>}
          options={(searchResults || []).map((d) => ({
            value: d,
            label: d,
          }))}
          loading={loading}
          size="large"
        />
      </Col>
      {cardDetails && (
        <>
          <Col xs={24} md={16}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Title level={4}>Resultados para {cardDetails.name}:</Title>
              </Col>
              {editions.map((edition, index) => {
                console.log(`Detalles de la edición ${index + 1}:`, edition);
                return <UploadItem edition={edition} key={edition.set} />;
              })}
            </Row>
          </Col>
          <Col md={16}>
            <Button type="primary" onClick={clearSearch}>
              Limpiar búsqueda
            </Button>
          </Col>
        </>
      )}
    </Row>
  )
}

export default UploadCard
