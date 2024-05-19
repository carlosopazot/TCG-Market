import UploadItem from './UploadItem'
import { Row, Col, Button, Typography, Tabs, Empty, Card, Select } from 'antd'

const { Title } = Typography

const CardResults = ({ cardDetails, editions, clearSearch, dollarPrice }) => {

  // const filteredEditions = editions.filter(edition => edition.prices.usd || edition.prices.usd_foil || edition.prices.usd_etched)
  const filterNonFoil = editions.filter(edition => edition.prices.usd && edition.nonfoil)
  const filterFoil = editions.filter(edition => edition.prices.usd_foil && edition.foil)

  const emptyResult = <Card><Empty description='No hay resultados' image={Empty.PRESENTED_IMAGE_SIMPLE} /></Card>

  const tabItems = [
    {
      key: 'non-foil',
      label: `No Foil (${filterNonFoil.length})`,
      children: (
        <>
          {filterNonFoil.length > 0 ? filterNonFoil.map((edition) => (
            <UploadItem
              edition={edition}
              key={edition.set + edition.collector_number}
              dollarPrice={dollarPrice}
            />
          )): emptyResult }
        </>
      )
    },
    {
      key: 'foil',
      label: `Foil (${filterFoil.length})`,
      children: (
        <>
          {filterFoil.length  > 0 ? filterFoil.map((edition) => (
            <UploadItem
              edition={edition}
              key={edition.set + edition.collector_number}
              dollarPrice={dollarPrice}
              foil
            />
          )) : emptyResult}
        </>
      )
    },
  ]


  console.log('No foil:', filterNonFoil)
  console.log('Foil:', filterFoil)
  return (
    <Row gutter={[16, 8]}>
      <Col xs={24}>
        <Title level={4}>Resultados para {cardDetails.name}:</Title>
      </Col>
      <Col xs={24}>
        <Tabs defaultActiveKey='non-foil' items={tabItems}/>
      </Col>
      <Col md={24}>
        <Button block size="large" onClick={clearSearch}>
          Limpiar búsqueda
        </Button>
      </Col>
    </Row>
  )
}

export default CardResults
