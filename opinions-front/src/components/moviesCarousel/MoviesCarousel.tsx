import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./MoviesCarousel.css";
import { register } from "swiper/element/bundle";

register()

interface CarouselProps<T> {
  itemsData: T[];
  renderCard: (item: T, index: number) => React.ReactNode;
  title?: string;
}

const MoviesCarousel = <T,>({ itemsData, renderCard, title }: CarouselProps<T>) => {
  const [SlidePerView, setSlidePerView] = useState(0);

  useEffect(() => {
    function handleResize(){
      if (window.innerWidth < 2100){
        setSlidePerView(6);

      }
      else if (window.innerWidth < 1900){
        setSlidePerView(4);
      }
      else if (window.innerWidth > 1700){
        setSlidePerView(3);
      }
      else if (window.innerWidth > 1100){
        setSlidePerView(1);
      }
      else {
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
        {title && <h1>{title}</h1>}
        <Swiper className="carousel-cards" 
        slidesPerView={SlidePerView} 
        navigation
        >
          {itemsData.map((item, index) => (
              <SwiperSlide key={index} className="carousel-card">
                {renderCard(item, index)}
              </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default MoviesCarousel;