import ItemCard from "../ItemCard/ItemCard";
import { Button } from "antd";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './styles.css'

const Arrow = ({ onClick, style, icon, className }) => {
  return (
    <Button 
      style={{ ...style}} 
      className={`slick-btn-nav-custom ${className}`}
      shape="circle" 
      onClick={onClick} 
      icon={icon}
      type="default"
    >
    </Button>
  )
}

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 4,
  initialSlide: 0,
  lazyLoad: true,
  prevArrow: <Arrow icon={<LeftOutlined />} />,
  nextArrow: <Arrow icon={<RightOutlined />} />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1.2,
        slidesToScroll: 1
      }
    }
  ]
};

const ItemList = ({cards, title }) => {

  return (
    <section>
      <h2>{title}</h2>
      <Slider {...settings} 
      >
        {cards.map((item) => <ItemCard key={item.id} item={item}/>)}
      </Slider>
    </section>
  );
};

export default ItemList;