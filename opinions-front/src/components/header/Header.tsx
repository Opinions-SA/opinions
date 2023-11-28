import { useState } from "react";
import { Streaming } from "../../interface/Streaming";
import { Link } from "react-router-dom";

import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import "./Header.css";
import BackCard from "../backDropCard/BackCard";

interface HeaderProps {
  streaming: Streaming[];
}

const Header = ({ streaming }: HeaderProps) => {
  const [SlidePerView] = useState(1);

  return (
    <div>
      <Swiper className="stream-container"
      slidesPerView={SlidePerView}
      navigation
      > 
          {streaming.map((film, index) => (
            <SwiperSlide key={film.id.toString() + index} className="carousel-card">
              <BackCard streaming={film} showLink={true} />
            </SwiperSlide>
          ))}   
      </Swiper>
      </div>
    
  );
};

export default Header;
