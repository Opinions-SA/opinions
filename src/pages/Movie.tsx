import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill,
} from "react-icons/bs";

import { Streaming } from "../interface/Streaming";

import MovieCard from "../components/movieCard/MovieCard";

import "../styles/Movies.css";

const moviesApiURL: string = import.meta.env.VITE_API;

const MoviePage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState<Streaming | null>(null);

  const getMovie = async (url: RequestInfo | URL) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const res = await fetch(url, options);
    const data: Streaming = await res.json();
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

  return (
    <div className="movie-page">
      {movie && (
        <>
          <div className="card-container">
            <MovieCard
              streaming={movie}
              key={movie.id.toString()}
              showLink={false}
            />
          </div>
          <div className="infos-container">
            <p className="tagline">{movie.tagline}</p>
            <div className="infos">
              <div className="info">
                <h3>
                  <BsWallet2 /> Budget
                </h3>
                <p>{formatCurrency(movie.budget)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsGraphUp /> Revenue
                </h3>
                <p>{formatCurrency(movie.revenue)}</p>
              </div>
              <div className="info">
                <h3>
                  <BsHourglassSplit /> Runtime
                </h3>
                <p>{movie.runtime} minutes</p>
              </div>
            </div>
            <div className="info description">
              <h3>
                <BsFillFileEarmarkTextFill /> Description
              </h3>
              <p>{movie.overview}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MoviePage;
