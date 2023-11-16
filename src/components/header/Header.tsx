import { Streaming } from "../../interface/Streaming";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaArrowLeft, FaArrowRight} from 'react-icons/fa';

import "../styles/Header.css";

const imageUrl = import.meta.env.VITE_IMG;

interface HeaderProps {
  streaming: Streaming;
  films: Streaming[]; 
}

const Header = ({ films }: HeaderProps) => {
   const [currentIndex, setCurrentIndex] = useState(0);

   const nextFilm = () => {
     setCurrentIndex((currentIndex + 1) % films.length);
   };

   const previousFilm = () => {
     setCurrentIndex((currentIndex - 1 + films.length) % films.length);
   };

  return (
    <div className='stream-container'>
      <div className='film-carousel'>
        <div className='carousel-inner' style={{ transform: `translateX(-${currentIndex * 210}px)` }}>
          {films.map((film, index) => (
             <div 
               className={`film-item ${index === currentIndex ? 'active' : ''}`}
             >
              <Link to={film ? `/${film.media_type}/${film.id}` : '#'}>
                {film && film.poster_path && (
                  <img src={imageUrl + film.poster_path} alt={film.title}/>
                )}
              </Link>
            </div>
          ))}
        </div>
        <div className="overlay">
          <button onClick={previousFilm} className="carousel-button left"><FaArrowLeft/></button>
          <button onClick={nextFilm} className="carousel-button right"><FaArrowRight/></button>
        </div>
      </div>
    </div>
  );
};

export default Header;
