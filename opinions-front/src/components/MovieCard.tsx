import { Streaming } from '../interface/Streaming';
import { FaStar} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const imageUrl = import.meta.env.VITE_IMG;

interface MovieCardProps {
    streaming: Streaming;
    key: string;
    showLink: boolean;
  }
  
  const MovieCard = ({ streaming , key , showLink = true}: MovieCardProps) => {
  return (
    <div className='movie-card' id={key}>
        <img src={imageUrl + streaming.poster_path} alt={streaming.title} />
        <div className='card-title'>
            <h2>{streaming.title}</h2>
            <p><FaStar /> {streaming.vote_average.toFixed(1)}</p>
        </div>
        {showLink && (
        <Link to={`/${streaming.media_type}/${streaming.id}`}>
            Details
        </Link>
        )}
    </div>
  )
}

export default MovieCard