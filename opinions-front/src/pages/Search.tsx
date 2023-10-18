import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

import { Movie } from "../interface/Movie";

const searchURL: string = import.meta.env.VITE_SEARCH;
const apiKey: string = import.meta.env.VITE_API_BEARER_KEY;

interface ApiResponse {
  results: Movie[]; 
}

const Search = () => {
  const [searchParams] = useSearchParams();

  const [movies, setMovies] = useState<Movie[]>([]);
  const query = searchParams.get("q");

  const getTopRatedMovies = async (url: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${apiKey}`
      }
    };
    const res = await fetch(url, options);
    const data: ApiResponse = await res.json();
    setMovies(data.results);
  };

  useEffect(() => {
    if (query) {
      const searchWithQueryUrl: string = `${searchURL}?query=${query}`;
      getTopRatedMovies(searchWithQueryUrl);
    }
  }, [query]);

  return (
    <div className="container">
      <h2>Results to: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {movies.length === 0 ? <p>Loading...</p> : (
          movies.map((movie) => <MovieCard key={movie.id.toString()} movie={movie} showLink={true} />)
        )}
      </div>
    </div>
  );
}

export default Search;
