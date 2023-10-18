import { Movie } from '../interface/Movie';
import { FaStar} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const imageUrl = import.meta.env.VITE_IMG;

interface MovieCardProps {
    movie: Movie;
    key: string;
    showLink: boolean;
  }
  
  const MovieCard = ({ movie , key , showLink = true}: MovieCardProps) => {
  return (
    <div className='movie-card' id={key}>
        <img src={imageUrl + movie.poster_path} alt={movie.title} />
        <div className='card-title'>
            <h2>{movie.title}</h2>
            <p><FaStar /> {movie.vote_average.toFixed(1)}</p>
        </div>
        {showLink && <Link to={`/movie/${movie.id}`}>Details</Link>}
    </div>
  )
}

export default MovieCard