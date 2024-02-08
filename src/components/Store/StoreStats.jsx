import { Col, Card, Statistic } from 'antd'
import CountUp from 'react-countup'

const StoreStats = ({ totalStock }) => {
  const formatter = (value) => <CountUp end={value} separator="," />
  return (
    <>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic
            title="Total por vender"
            prefix="$"
            value={0}
            formatter={formatter}
          />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic title="Total vendido" value={0} formatter={formatter} />
        </Card>
      </Col>
      <Col xs={24} sm={8}>
        <Card bordered={false}>
          <Statistic
            title="Cartas en coleccion"
            value={totalStock}
            formatter={formatter}
          />
        </Card>
      </Col>
    </>
  )
}

export default StoreStats
