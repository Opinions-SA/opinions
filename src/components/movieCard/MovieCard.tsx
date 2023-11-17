import { Streaming } from '../../interface/Streaming';
import { Link } from 'react-router-dom';
import './MovieCard.css';

const imageUrl = import.meta.env.VITE_IMG;

interface MovieCardProps {
  streamingList: Streaming[];
  key: string;
}

const MovieCard = ({ streamingList, key }: MovieCardProps) => {
  if (!Array.isArray(streamingList) || streamingList.length === 0) {
    return <p>Nenhum dado de streamingList disponível.</p>;
  }

  return (
    <div className='movie-card'>
      <div className='film-grid'>
        <div className='grid-inner' id={key}>
          {streamingList.map((film, index) => (
            <div
              key={index.toString()}
              className={`film-item`}
            >
              <Link to={film ? `/${film.media_type}/${film.id}` : '#'}>
                {film.poster_path && (
                  <img src={imageUrl + film.poster_path} alt={film.title} />
                )}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieCard;