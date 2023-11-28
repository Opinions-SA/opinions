import { Streaming } from "../../interface/Streaming";

import { useState, useEffect } from "react";
import { register } from "swiper/element/bundle";
import { Swiper, SwiperSlide } from "swiper/react";

register();
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import MovieCard from "../movieCard/MovieCard";

import "./Carousel.css";

interface CarouselProps {
  gridData: Streaming[];
}

const Carousel = ({ gridData }: CarouselProps) => {
  const [SlidePerView, setSlidePerView] = useState(2)

  useEffect(() => {
    function handleResize(){
      if(window.innerWidth < 1700) {
        setSlidePerView(4);
      }else {
        setSlidePerView(6);
      } 
    }
    handleResize();

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])
 
  return (
    <div className="carousel-grid-container">
      <div className="carousel-container">
        <h1>Top Releases</h1>
        <Swiper className="carousel-cards"
        slidesPerView={6}
        pagination={{clickable: true}}
        navigation
        >
          {gridData.map((film, index) => (
            <SwiperSlide key={film.id.toString() + index} className="carousel-card">
              <MovieCard streaming={film} showLink={true} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;
