import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Header from "../components/Header";

import { Streaming } from "../interface/Streaming";

import "../styles/MoviesGrid.css";

const moviesApiURL: string = import.meta.env.VITE_API;

const Home = () => {
  const [trendingStreaming, setTrendingStreaming] = useState<Streaming[]>([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const getTrendingStreaming = async (url: RequestInfo) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    const res = await fetch(url, options);
    const data: Streaming[] = await res.json();
    setTrendingStreaming(data);
  };

  useEffect(() => {
    const topRatedUrl: string = `${moviesApiURL}/streaming/trending/all`;
    getTrendingStreaming(topRatedUrl);
  }, []);

  const handleNextFilm = () => {
    if (currentMovieIndex < trendingStreaming.length - 1) {
      setCurrentMovieIndex(currentMovieIndex + 1);
    }
  };

  const handlePreviousFilm = () => {
    if (currentMovieIndex > 0) {
      setCurrentMovieIndex(currentMovieIndex - 1);
    }
  };

  return (
    <div className="container">
        <div className="header-container">
          <Header
              streaming={trendingStreaming[currentMovieIndex]}
              onPreviousFilm={handlePreviousFilm}
              onNextFilm={handleNextFilm}
            />
        </div>
        <div className="movies-container">
            {trendingStreaming.length === 0 ? <p>Carregando...</p> : (
                trendingStreaming.map((streaming) => <MovieCard key={streaming.id.toString()} streaming={streaming} showLink={true} />)
            )}
        </div>
    </div>
  );
};

export default Home;
