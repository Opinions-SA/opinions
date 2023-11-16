import { useEffect, useState } from "react";
import MovieCard from "../components/movieCard/MovieCard";
import Header from "../components/header/Header";

import { Streaming } from "../interface/Streaming";

import "../styles/MoviesGrid.css";

const moviesApiURL: string = import.meta.env.VITE_API;

const Home = () => {
  const [trendingStreaming, setTrendingStreaming] = useState<Streaming[]>([]);
  const [currentMovieIndex] = useState(0);

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

  return (
    <div className="container">
        <div className="header-container">
          <Header
              films={trendingStreaming}
              streaming={trendingStreaming[currentMovieIndex]}
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
