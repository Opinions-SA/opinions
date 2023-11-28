import { useState } from "react";
import { Streaming } from "../../interface/Streaming";
import MovieCard from "../movieCard/MovieCard";

import "./Carousel.css";

interface CarouselProps {
  gridData: Streaming[];
}

const Carousel = ({ gridData }: CarouselProps) => {
  const [currentIndex] = useState(0);

  return (
    <div className="carousel-grid-container">
      <div className="carousel-container">
        <h1>Top Releases</h1>
        <div className="carousel-wrapper">
          <div
            className="carousel-cards" >
            {gridData.map((film, index) => (
              <div
                key={film.id.toString()}
                className={`carousel-card ${
                  index === currentIndex ? "active" : ""
                }`}
              >
                <MovieCard streaming={film} showLink={true} />
              </div>
            ))}
          </div>
      </div>
    </div>
    </div>
  );
};

export default Carousel;

