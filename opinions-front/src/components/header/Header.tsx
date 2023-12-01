import { useState } from "react";
import { Streaming } from "../../interface/Streaming";

import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

register();

import "./Header.css";
import BackCard from "../backDropCard/BackCard";

interface HeaderProps {
  streaming: Streaming[];
}

const Header = ({ streaming }: HeaderProps) => {
  const [SlidePerView] = useState(1);

  return (
    <div className="header-content">
      <Swiper className="stream-container"
      autoplay={{ delay: 7000, disableOnInteraction: false }}
      slidesPerView={SlidePerView}
      navigation
      pagination={{clickable: true}}
      > 
          {streaming.map((film, index) => (
            <SwiperSlide 
            key={film.id.toString() + index}>
              <BackCard streaming={film} showLink={true} />
            </SwiperSlide>
          ))}   
      </Swiper>
      </div>
    
  );
};

export default Header;
