import { TvSerie } from '../../interface/TvSerie';
import { FaStar} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const imageUrl = import.meta.env.VITE_IMG;

interface TvSerieCardProps {
    serie: TvSerie;
    key: string;
    showLink: boolean;
  }
  
  const MovieCard = ({ serie , key , showLink = true}: TvSerieCardProps) => {
  return (
    <div className='movie-card' id={key}>
        <img src={imageUrl + serie.poster_path} alt={serie.name} />
        <div className='card-title'>
            <h2>{serie.name}</h2>
            <p><FaStar /> {serie.vote_average.toFixed(1)}</p>
        </div>
        {showLink && <Link to={`/movie/${serie.id}`}>Details</Link>}
    </div>
  )
}

export default MovieCard