import { Card, Button, Typography, Row, Col, Divider , Flex, Skeleton } from 'antd'
import SearchItemTags from '../Search/SearchItemTags'
import DollarTag from '../DollarTag/DollarTag'
import { formattedClp } from '../../utils/utils'
import { PlusOutlined } from '@ant-design/icons'

const { Title, Text } = Typography

const CardInfo = ({edition, foil, price, priceClp, showModal, dollar, loading}) => {

  const actions = [
      <Button onClick={showModal} icon={<PlusOutlined/>} size="large" key='1' type="text" >Agregar a tienda</Button>
  ]

  const toTCG = () => {
    window.open(edition.purchase_uris.tcgplayer, '_blank')
  }

  const toCardMarket = () => {
    window.open(edition.purchase_uris.cardmarket, '_blank')
  }


  return (
    <Card
      style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}} 
      actions={actions}
    >
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Flex gap={16} vertical>
            <Flex gap={4} vertical>
              <Title style={{ margin: 0 }} level={4}>{edition.name}</Title>
              <Title style={{ margin: 0 }} level={5} type="secondary">{edition.set_name}</Title>
            </Flex>
            <SearchItemTags edition={edition} foil={foil} />
            {edition.oracle_text ? <Text type="secondary">{`"${edition.oracle_text}"`}</Text> : null}
            {!loading ? 
              <Flex align="center" gap={8} style={{ flexWrap: 'wrap'}} >
                <Title key='1' type="secondary" style={{ margin: 0 }} level={4}>${price} <Text type="secondary">USD</Text></Title>
                <Divider type="vertical" />
                <Title key='2' style={{ margin: 0 }} level={4}>{formattedClp(priceClp)} <Text>CLP</Text></Title>
                <DollarTag price={dollar} />
              </Flex> : 
              <Skeleton loading={loading} active paragraph={{ rows: 0 }} /> 
            }
            <Flex gap={8}>
              <Button onClick={toTCG}>Ver en TCG Player</Button>
              <Button onClick={toCardMarket}>Ver en Card Market</Button>
            </Flex>
          </Flex>
        </Col>
      </Row>
    </Card>
  )
}

export default CardInfo