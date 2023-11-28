import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import { TvSerie } from "../interface/TvSerie";

import UserReview from "../components/userReview/UserReview";

import "../styles/TvSerie.css";

const seriesApiURL: string = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;

const TvSeriePage = () => {
  const { id } = useParams();
  const [tvSerie, setTvSerie] = useState<TvSerie | null>(null);
  const [showUserReview, setShowUserReview] = useState(false);

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
    const tvSerieUrl: string = `${seriesApiURL}/streaming/tv/${id}`;
    getTvSerie(tvSerieUrl);
  }, [id]);

  const toggleUserReview = () => {
    setShowUserReview(!showUserReview);
    const isReviewOpen = !showUserReview;
    document.body.classList.toggle("blur-background", isReviewOpen);
  };

  return (
    <div className="tvSerie-page">
      {tvSerie && (
        <>
        <div className="card-container-movies">
          <div className="card-content-movies">
          <div className="poster-content-movie">
          {tvSerie.poster_path && (
            <img
              className="poster-serie-image"
              src={imageUrl + tvSerie.poster_path}
              alt="serie.title"
              style={{ width: "100%", maxHeight: "100%" }}
            />
          )}
          </div>
          <div className="info-serie-container">
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
                <BsWallet2 /> Networks
              </h3>
              <div className="genres-series">
                {tvSerie.networks.map((network) => (
                  <p className="genre">
                    {" "}
                    <img className="network-image" src={imageUrl + network.logo_path} />
                  </p>
                ))}
              </div>
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
          <div className="info-description">
            <h3>
              <BsFillFileEarmarkTextFill /> Description
            </h3>
            <p>{tvSerie.overview}</p>
          </div>
          <button className="open-review-button" onClick={toggleUserReview}>
            Abrir Avaliação
          </button>
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

export default TvSeriePage;
