import { Streaming } from '../../interface/Streaming';
import MovieCard from '../movieCard/MovieCard';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './MoviesGrid.css';

interface MoviesGridProps {
  gridData: Streaming[];
}

const MoviesGrid = ({ gridData }: MoviesGridProps) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1.5,
    responsive: [
      {
        breakpoint: 1700,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="movies-grid-container">
      <h1>Top Realeases</h1>
      <Slider {...settings}>
        {gridData.map((film) => (
          <div key={film.id.toString()}>
            <MovieCard streaming={film} showLink={true} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default MoviesGrid;