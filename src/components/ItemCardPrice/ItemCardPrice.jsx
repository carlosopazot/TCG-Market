import { formattedClp } from '../../utils/utils';
import { Typography, Skeleton, Tag } from 'antd';
import { useEffect, useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import useFetchVariants from '../../hooks/useFetchVariants';


const { Title, Text } = Typography;

const ItemCardPrice = ({ item, title, storePrice }) => {
  const [cardPrice, setCardPrice] = useState(null);
  const { loading, editions } = useFetchVariants(item.name);
  const { store } = useContext(StoreContext);


  const filterFoil = editions.filter((edition) =>
    item.foil ? edition.prices.usd_foil : edition.prices.usd || edition.prices.usd_etched
  );

  const filterId = filterFoil.filter((edition) => edition.id === item.scryId);

  useEffect(() => {
    if (filterId.length > 0) {
      setCardPrice(item.foil ? filterId[0].prices.usd_foil : filterId[0].prices.usd || filterId[0].prices.usd_etched);
    }
  }, [cardPrice, filterId, item.foil]);

  const handlePrice = storePrice ? cardPrice * store.dollar : cardPrice * item.seller.dollar;

  const realPrice = cardPrice ? formattedClp(handlePrice) : null || formattedClp(item.customPrice) || <Tag
    color='red'>Sin precio</Tag>;

  if (loading) {
    return <Skeleton active paragraph={{ rows: 0 }} />;
  }

  if (title) {
    return <Title level={4}>{realPrice}</Title>;
  }

  return <Text>{realPrice}</Text>;
};

export default ItemCardPrice;
