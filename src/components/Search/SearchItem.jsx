import { Link } from "react-router-dom";
import { Card, Row, Col, Typography, Flex } from "antd";
import SearchItemTags from "./SearchItemTags";

const { Title } = Typography;

const SearchItem = ({ edition, foil }) => {
  return (
    <Link to={`/buscador/${edition.name}`} state={{ edition, foil }} key={edition.id}>
      <Card hoverable>
        <Row gutter={16}>
          <Col xs={6} md={8} lg={4}>
            <img src={edition.image_uris.normal} alt={edition.name} style={{ width: '100%', borderRadius: '8px' }} />
          </Col>
          <Col xs={18} md={16} lg={20}>
            <Row gutter={[16, 16]}>
              <Col xs={24}>
                <Flex vertical gap={16}>
                  <Flex gap={4} vertical>
                    <Title style={{ margin: 0 }} level={4}>{edition.name}</Title>
                    <Title style={{ margin: 0 }} level={5} type="secondary">{edition.set_name}</Title>
                  </Flex>
                  <SearchItemTags edition={edition} foil={foil} />
                  <Title level={4}>$ {foil ? edition.prices.usd_foil : edition.prices.usd || edition.prices.usd_etched }</Title>
                </Flex>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Link>
  )
}

export default SearchItem;