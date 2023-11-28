import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import "../styles/Movies.css";
import UserReview from "../components/userReview/UserReview";
import { Movie } from "../interface/Movie";

const moviesApiURL: string = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showUserReview, setShowUserReview] = useState(false);

  const getMovie = async (url: RequestInfo | URL) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const res = await fetch(url, options);
    const data: Movie = await res.json();
    setMovie(data);
  };

  const formatCurrency = (number: number) => {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  useEffect(() => {
    const movieUrl: string = `${moviesApiURL}/streaming/movie/${id}`;
    getMovie(movieUrl);
  }, [id]);

  const toggleUserReview = () => {
    setShowUserReview(!showUserReview);
    const isReviewOpen = !showUserReview;
    document.body.classList.toggle("blur-background", isReviewOpen);
  };

  return (
    <div className={`movie-page ${showUserReview ? "blur-background" : ""}`}>
      {movie && (
        <>
          <div className="card-container-movies">
            <div className="card-content-movies">
              <div className="poster-content-movie">
                {movie.poster_path && (
                  <img
                    className="poster-movie-image"
                    src={imageUrl + movie.poster_path}
                    alt="movie.title"
                    style={{ width: "100%", maxHeight: "100%" }}
                  />
                )}
              </div>
              <div className="info-movies-container">
                <h1 className="movie-title">{movie.title}</h1>
                <p className="movie-tag">{movie.tagline}</p>
                <div className="info-movies">
                  <div className="info-card">
                    <h2>
                      <BsWallet2 /> Budget
                    </h2>
                    <p>{formatCurrency(movie.budget)}</p>
                  </div>
                  <div className="info-card">
                    <h2>
                      <BsGraphUp /> Revenue
                    </h2>
                    <p>{formatCurrency(movie.revenue)}</p>
                  </div>
                  <div className="info-card">
                    <h2>
                      <BsHourglassSplit /> Runtime
                    </h2>
                    <p>{movie.runtime} minutes</p>
                  </div>
                  <div className="info-card">
                    <h2>
                      <BsHourglassSplit /> Vote Count
                    </h2>
                    <p>{movie.vote_count} votes</p>
                  </div>
                  <div className="info-card">
                    <h2>
                      <BsWallet2 /> Genres
                    </h2>
                    <div className="genres-movies">
                      {movie.genres.map((genre) => (
                        <p className="genre-movie"> {genre.name}</p>
                      ))}
                    </div>
                  </div>
                  <div className="info-card">
                    <h2>
                      <BsHourglassSplit /> Status
                    </h2>
                    <p>{movie.status}</p>
                  </div>
                  <div className="info-card-companies">
                    <h2>
                      <BsWallet2 /> Production Companies
                    </h2>
                    <div className="companie-movie-container">
                      {movie.production_companies.map((companie) => (
                        <div className="companie-movie">
                          <img
                            className="companie-image"
                            src={imageUrl + companie.logo_path}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="info-description">
                  <h2>
                    <BsFillFileEarmarkTextFill /> Description
                  </h2>
                  <p>{movie.overview}</p>
                </div>
                <div className="review-button-container">
                <button
                  className="open-review-button"
                  onClick={toggleUserReview}
                >
                  New Review
                </button>
                </div>
                {showUserReview && (
                  <div className="review-overlay">
                    <UserReview onClose={toggleUserReview} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
