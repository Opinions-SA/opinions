import { Streaming } from '../../interface/Streaming';
import MovieCard from '../movieCard/MovieCard';
import './MoviesGrid.css'; 

interface MoviesGridProps {
  gridData: Streaming[];
}

const MoviesGrid = ({ gridData }: MoviesGridProps) => {
  return (
    <div className="movies-grid-container">
      <div className="grid-container">
        {gridData.map((film) => (
          <MovieCard key={film.id.toString()} streamingList={[film]} showLink={true} />
        ))}
      </div>
    </div>
  );
};

export default MoviesGrid;