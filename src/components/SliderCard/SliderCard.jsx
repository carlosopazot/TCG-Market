import Slider from "react-slick"
import { useRef } from 'react'
import { Button, Row, Col } from 'antd'
import ItemCard from "../ItemCard/ItemCard";
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

const SliderCard = ({ cards, slides, loading }) => {

  const slider = useRef(null)


  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: slides,
    slidesToScroll: 1,
    initialSlide: 0,
    arrows: false,
    lazyLoad: true,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 6,
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

  if (cards.length <= 3) {
    return (
      <Row>
        {cards.map((item) => (
          <Col key={item.id} xs={12} sm={8} md={6} lg={4} xl={4}>
            <ItemCard loading={loading} item={item}/>
          </Col>
        ))}
      </Row>
    )
  }

  return (
    <div className="slider">
      <Slider {...settings} ref={slider}>
        {cards.slice(0, 10).map((item) => (
          <ItemCard loading={loading} key={item.id} item={item} />
        ))}
      </Slider>
      <Button className='slider-nav slider-prev' onClick={() => slider?.current?.slickPrev()} icon={<LeftOutlined/>} shape='circle'></Button>
      <Button className='slider-nav slider-next' onClick={() => slider?.current?.slickNext()} icon={<RightOutlined/>} shape='circle'></Button>
    </div>
  )
}

export default SliderCard