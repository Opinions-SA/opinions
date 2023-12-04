import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

register();

import "../styles/Movies.css";
import UserReview from "../components/userReview/UserReview";
import { Movie } from "../interface/Movie";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { Review } from "../interface/Review";
import ListReview from "../components/userReview/ListReview";

const moviesApiURL: string = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;

const MoviePage = () => {
  const [SlidePerView, setSlidePerView] = useState(1);

  const auth = useContext(AuthContext);

  const { id } = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showUserReview, setShowUserReview] = useState(false);
  const [review, setReview] = useState<Review | null>(null);
  const [view, setView] = useState(false);

  const [userToken, setUserToken] = useState<string>("");

  const reviewUrl: string = `${moviesApiURL}/review/streaming?streamingId=${id}&streamingType=${"movie"}`;

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
    const fetchToken = async () => {
      try {
        const response = await auth.tokenGetter();
        setUserToken(response ? response.toString() : "");
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const movieUrl: string = `${moviesApiURL}/streaming/movie/${id}`;
    getMovie(movieUrl);
    if (userToken && id) {
      const getReview = async () => {
        try {
          const reviewResponse = await auth.reviewGet(
            userToken,
            parseInt(id, 10),
            "movie"
          );
          if (reviewResponse) {
            setReview(reviewResponse);
            return;
          }
          setView(true);
        } catch (error) {
          console.error("Error fetching review:", error);
        }
      };
      getReview();
    }
  }, [id, userToken]);

  const toggleUserReview = () => {
    setShowUserReview(!showUserReview);
    const isReviewOpen = !showUserReview;
    document.body.classList.toggle("blur-background", isReviewOpen);
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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
                      {movie.production_companies
                        .slice(0, 2)
                        .map((companie) => (
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
              </div>
            </div>
          </div>
          {/* Review Card */}
          {id && view && (
            <>
              <div className="review-button-container">
                <button
                  className="open-review-button"
                  onClick={toggleUserReview}
                >
                  Create a New Review
                </button>
              </div>
              {showUserReview && (
                <div className="review-overlay">
                  <UserReview
                    onClose={toggleUserReview}
                    data={{ id: id, type: "movie" }}
                  />
                </div>
              )}
            </>
          )}

          {/* List of movies reviews */}
          <div className="list-movies-container">
            <h1 className="list-movies-title">Recent Communit Reviews</h1>
            <Swiper
              className="list-review-cards"
              slidesPerView={SlidePerView}
              navigation
            >
              <div className="list-review-item">
                <SwiperSlide className="carousel-review-list">
                  {id && <ListReview url={reviewUrl} />}
                </SwiperSlide>
              </div>
            </Swiper>
          </div>

          {/* Trailer */}
          <div className="trailer-container">
          {movie && movie.trailer && (
        <button className="open-review-button" onClick={handleButtonClick}>
          Assistir Trailer
        </button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <iframe title="Trailer" width="800" height="475" src={movie.trailer} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      
      )}
      </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
