import ItemCard from "../ItemCard";
import { Flex } from "antd";


const ItemList = ({cards}) => {

  return (
    <section>
      <h2>Cartas</h2>
      <Flex gap={16}>
          {cards.map((item) => <ItemCard key={item.id} item={item}/>)}
      </Flex>
    </section>
  );
};

export default ItemList;