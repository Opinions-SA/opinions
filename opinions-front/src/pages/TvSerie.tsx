import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import {
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

register();

import { TvSerie } from "../interface/TvSerie";

import UserReview from "../components/userReview/UserReview";
import ListReview from "../components/userReview/ListReview";

import "../styles/TvSerie.css";
import { AuthContext } from "../contexts/Auth/AuthContext";
import { Review } from "../interface/Review";

const seriesApiURL: string = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;

const TvSeriePage = () => {
  const [SlidePerView, setSlidePerView] = useState(1)

  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [tvSerie, setTvSerie] = useState<TvSerie | null>(null);
  const [showUserReview, setShowUserReview] = useState(false);
  const [review, setReview] = useState<Review | null>(null);
  const [view, setView] = useState(false);

  const [userToken, setUserToken] = useState<string>(""); 

  const reviewUrl: string = `${seriesApiURL}/review/streaming?streamingId=${id}&streamingType=${"tv"}`;

  const getTvSerie = async (url: RequestInfo | URL) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const res = await fetch(url, options);
    const data: TvSerie = await res.json();
    setTvSerie(data);
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await auth.tokenGetter();
        setUserToken(response ? response.toString() : "");
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
    fetchToken();
  }, []);

  useEffect(() => {
    const tvSerieUrl: string = `${seriesApiURL}/streaming/tv/${id}`;
    getTvSerie(tvSerieUrl);
    if (userToken && id) {
      const getReview = async () => {
        try {
          const reviewResponse = await auth.reviewGet(userToken, parseInt(id, 10), "tv");
          if (reviewResponse) { setReview(reviewResponse); return;}
          setView(true)
        } catch (error) {
          console.error('Error fetching review:', error);
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
    <div className="tvSerie-page">
      {tvSerie && (
        <>
          <div className="card-container-series">
            <div className="card-content-series">
              <div className="poster-content-serie">
                {tvSerie.poster_path && (
                  <img
                    className="poster-serie-image"
                    src={imageUrl + tvSerie.poster_path}
                    alt="serie.title"
                    style={{ width: "100%", maxHeight: "100%" }}
                  />
                )}
              </div>
              <div className="info-series-container">
                <h1 className="serie-title">{tvSerie.name}</h1>
                <p className="serie-tag">{tvSerie.tagline}</p>
                <div className="info-series">
                  <div className="info-card">
                    <h3>
                      <BsWallet2 /> Genres
                    </h3>
                    <div className="genres">
                      {tvSerie.genres.map((genre) => (
                        <p className="genre"> {genre.name}</p>
                      ))}
                    </div>
                  </div>
                  <div className="info-card">
                    <h3>
                      <BsHourglassSplit /> First air date
                    </h3>
                    <p>{formatDate(tvSerie.first_air_date)}</p>
                  </div>
                  <div className="info-card">
                    <h3>
                      <BsHourglassSplit /> Last air date
                    </h3>
                    <p>{formatDate(tvSerie.last_air_date)}</p>
                  </div>
                  <div className="info-card">
                    <h3>
                      <BsHourglassSplit />{" "}
                      {tvSerie.in_production ? "In production" : "Ended"}
                    </h3>
                  </div>
                  <div className="info-card">
                    <h3>
                      <BsHourglassSplit /> Season number
                    </h3>
                    <p>{tvSerie.number_of_seasons}</p>
                  </div>
                  <div className="info-card">
                    <h3>
                      <BsHourglassSplit /> Episode number
                    </h3>
                    <p>{tvSerie.number_of_episodes}</p>
                  </div>
                </div>
                <div className="info-card-network">
                    <h3>
                      <BsWallet2 /> Networks
                    </h3>
                    <div className="network-serie-container">
                      {tvSerie.networks.slice(0, 3).map((network) => (
                          <img
                            className="network-image"
                            src={imageUrl + network.logo_path}
                          />
                      ))}
                    </div>
                  </div>
                <div className="info-description">
                  <h3>
                    <BsFillFileEarmarkTextFill /> Description
                  </h3>
                  <p>{tvSerie.overview}</p>
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
                        New Review
                      </button>
                    </div>
                    {showUserReview && (
                      <div className="review-overlay">
                        <UserReview onClose={toggleUserReview} data={{ id: id, type: "tv" }}/>
                      </div>
                    )}
                  </>
                )}

          {/* List of series reviews */}
          <div className="list-movies-container">
          <h1 className="list-movies-title">Recent Communit Reviews</h1>
          <Swiper className='list-review-cards' slidesPerView={SlidePerView} navigation>
          <div className="list-review-item"> 
            <SwiperSlide className="carousel-review-list">
            {id && (
              <ListReview url={reviewUrl} />
            )}
            </SwiperSlide>
          </div> 
          </Swiper>
          </div>
          
            {/* Trailer */}
          <div className="trailer-container">
          {tvSerie && tvSerie.trailer && (
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
            <iframe title="Trailer" width="800" height="475" src={tvSerie.trailer} frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>
      
      )}
      </div>
        </>
      )}
    </div>
  );
};

export default TvSeriePage;
