import { Streaming } from "../../interface/Streaming";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

import "./MovieCard.css";

const imageUrl = import.meta.env.VITE_IMG;

interface MovieCardProps {
  streaming: Streaming;
  showLink: boolean;
}

const MovieCard = ({ streaming, showLink }: MovieCardProps) => {
  return (
      <div className="film-grid-container">
        <div className="grid-inner">
          <div className={`grid-film-item`}>
            {showLink ? (
              <Link to={streaming ? `/${streaming.media_type}/${streaming.id}` : "#"}>
                {streaming.poster_path && (
                  <img className="film-grid-image" src={imageUrl + streaming.poster_path} alt={streaming.title} />
                )}
              </Link>
            ) : (
              streaming.poster_path && (
                <img className="film-grid-image" src={imageUrl + streaming.poster_path} alt={streaming.title} />
              )
            )}
          </div>
          <div className="card-grid-title">
            <h2>{streaming.title}</h2>
            <p>
              <FaStar /> {streaming.vote_average.toFixed(1)}
            </p>
          </div>
        </div>
      </div>
  );
};

export default MovieCard;