import UploadItem from './UploadItem'
import { Row, Col, Button, Typography } from 'antd'

const { Title } = Typography

const CardResults = ({ cardDetails, editions, clearSearch, dollarPrice }) => {

  const filteredEditions = editions.filter(edition => edition.prices.usd || edition.prices.usd_foil || edition.prices.usd_etched)
  console.log('filteredEditions:', filteredEditions)
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={4}>Resultados para {cardDetails.name}:</Title>
      </Col>
      {filteredEditions.map((edition) => {
        return (
          <UploadItem
            edition={edition}
            key={edition.set + edition.collector_number}
            dollarPrice={dollarPrice}
          />
        )
      })}
      <Col md={16}>
        <Button size="large" onClick={clearSearch}>
          Limpiar búsqueda
        </Button>
      </Col>
    </Row>
  )
}

export default CardResults
