import { Streaming } from "../../interface/Streaming";
import { Link } from "react-router-dom";

import "./BackCard.css";

const baseUrl = import.meta.env.VITE_IMG;

interface BackCardProps {
  streaming: Streaming;
  showLink: boolean;
}

const BackCard = ({ streaming, showLink }: BackCardProps) => {
  return (
    <div className="back-card">
      <div className={`back-item`}>
        {showLink ? (
          <Link
            to={streaming ? `/${streaming.media_type}/${streaming.id}` : "#"}
          >
            {streaming.backdrop_path && (
              <img
                src={baseUrl + streaming.backdrop_path}
                alt={streaming.title}
                style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
                className="backdrop-image"
              />
            )}
          </Link>
        ) : (
          streaming.backdrop_path && (
            <img
              src={baseUrl + streaming.backdrop_path}
              alt={streaming.title}
              style={{ width: "100%", maxHeight: "100%", objectFit: "cover" }}
              className="backdrop-image"
            />
          )
        )}
      </div>
      <div className="backcard-title">
        <h1>{streaming.title}</h1>
        <p>{streaming.overview}</p>
      </div>
    </div>
  );
};

export default BackCard;
