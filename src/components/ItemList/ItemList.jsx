import ItemCard from '../ItemCard/ItemCard'
import { Empty, Typography, Card, Button, Flex } from 'antd'
import Slider from "react-slick";
import './styles.css'
import { useRef } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

const { Title, Text } = Typography

const ItemList = ({ cards, title }) => {

  const slider = useRef(null);
  
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 2,
    initialSlide: 0,
    arrows: false,
    lazyLoad: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <section>
      <Flex justify='space-between'>
        <Title level={4}>{title || 'Cartas'}</Title>
      </Flex>
      {cards.length > 0 ? (
        <div className="slider">
          <Slider ref={slider} {...settings}>
            {cards.slice(0, 10).map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </Slider>
          <Button className='slider-nav slider-prev' onClick={() => slider?.current?.slickPrev()} icon={<LeftOutlined/>} shape='circle'></Button>
          <Button className='slider-nav slider-next' onClick={() => slider?.current?.slickNext()} icon={<RightOutlined/>} shape='circle'></Button>
        </div>
      ) : (
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
      )}
    </section>
  )
}

export default ItemList
