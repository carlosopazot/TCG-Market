import ItemCard from "../ItemCard/ItemCard";
import { CardSlider } from '../CardSlider/CardSlider'
import { Empty, Typography } from "antd";

import './styles.css'

const { Title, Text } = Typography

const ItemList = ({cards, title }) => {

  return (
    <section>
      <Title level={4}>{title}</Title>
      { cards.length > 0
        ? 
          <CardSlider>
            {cards.map((item) => <ItemCard key={item.id} item={item}/>)}
          </CardSlider> 
        : 
          <Empty 
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            description={
              <Text type="secondary">
                No hay cartas para mostrar
              </Text>
            }
          />
      }
    </section>
  );
};

export default ItemList;


