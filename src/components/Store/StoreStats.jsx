import { Col, Card, Statistic } from 'antd'
import CountUp from 'react-countup'

const StoreStats = ({ totalStock, totalForSell, totalSold, loading }) => {
  
  const formatter = (value) => <CountUp end={value} separator="." />

  const statistics = [
    { title: 'Total por vender', value: totalForSell, prefix: '$'},
    { title: 'Total vendido', value: totalSold, prefix: '$'},
    { title: 'Cartas en coleccion', value: totalStock }
  ]

  return (
    <>
      {statistics.map((stat, index) => (
        <Col key={index} xs={24} md={8}>
          <Card>
            <Statistic
              title={stat.title}
              value={stat.value}
              prefix={stat.prefix}
              formatter={formatter}
              loading={loading}
            />
          </Card>
        </Col>
      ))}
    </>
  )
}

export default StoreStats
