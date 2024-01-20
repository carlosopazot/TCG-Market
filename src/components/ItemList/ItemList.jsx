import ItemCard from "../ItemCard/ItemCard";
import { Empty, Typography, Row, Card } from "antd";

const { Title, Text } = Typography

const ItemList = ({cards, title }) => {

  return (
    <section>
      <Title level={4}>{title}</Title>
      { cards.length > 0
        ? 
          <Row gutter={16} wrap>
            {cards.map((item) => <ItemCard key={item.id} item={item}/>)}
          </Row>
        : 
          <Card>
            <Empty 
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={
              <Text level={3} type="secondary">
                No hay cartas para mostrar
              </Text>
            }
          />
          </Card>
      }
    </section>
  );
};

export default ItemList;


