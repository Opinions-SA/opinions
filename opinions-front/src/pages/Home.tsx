import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";

import { Movie } from "../interface/Movie";

import "../styles/MoviesGrid.css";

const moviesApiURL: string = import.meta.env.VITE_API;
const apiKey: string = import.meta.env.VITE_API_BEARER_KEY;

interface ApiResponse {
  results: Movie[];
}

const Home = () => {
  const [topMovies, setTopMovies] = useState<Movie[]>([]);

  const getTopRatedMovies = async (url: RequestInfo) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
    const res = await fetch(url, options);
    const data: ApiResponse = await res.json();
    setTopMovies(data.results);
  };

  useEffect(() => {
    const topRatedUrl: string = `${moviesApiURL}movie/top_rated?language=en-US&page=1`;
    getTopRatedMovies(topRatedUrl);
  }, []);

  return (
    <div className="container">
        <div className="title"> 
            <h2>Best movies:</h2>
        </div>
        <div className="movies-container">
            {topMovies.length === 0 ? <p>Carregando...</p> : (
                topMovies.map((movie) => <MovieCard key={movie.id.toString()} movie={movie} showLink={true} />)
            )}
        </div>
    </div>
  );
};

export default Home;
