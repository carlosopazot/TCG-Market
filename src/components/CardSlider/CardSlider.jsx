import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import { settings } from "./Settings";

export const CardSlider = ({ children }) => {
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  )
}