import { Col, Card, Statistic } from 'antd'
import CountUp from 'react-countup'

const StoreStats = ({ totalStock, totalForSell, totalSold, loading }) => {
  const formatter = (value) => <CountUp end={value} separator="," />
  return (
    <>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic
            title="Total por vender"
            prefix="$"
            value={totalForSell}
            formatter={formatter}
            loading={loading}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic title="Total vendido" value={totalSold} formatter={formatter} loading={loading} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic
            title="Cartas en coleccion"
            value={totalStock}
            formatter={formatter}
            loading={loading}
          />
        </Card>
      </Col>
    </>
  )
}

export default StoreStats
