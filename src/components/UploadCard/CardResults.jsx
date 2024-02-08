import UploadItem from './UploadItem'
import { Row, Col, Button, Typography } from 'antd'

const { Title } = Typography

const CardResults = ({ cardDetails, editions, clearSearch }) => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24}>
        <Title level={4}>Resultados para {cardDetails.name}:</Title>
      </Col>
      {editions.map((edition) => {
        return <UploadItem edition={edition} key={edition.set} />
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
