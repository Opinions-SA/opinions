import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/movieCard/MovieCard";

import '../styles/Search.css'

import { Streaming } from "../interface/Streaming";

const searchURL: string = import.meta.env.VITE_API;

const Search = () => {
  const [searchParams] = useSearchParams();

  const [streamings, setStreamings] = useState<Streaming[]>([]);
  const query = searchParams.get("q");

  const getStreamings = async (url: string) => {
    const options: RequestInit = {
      method: 'GET',
      headers: {
        accept: 'application/json',
      }
    };
    const res = await fetch(url, options);
    const data: Streaming[] = await res.json();
    setStreamings(data);
  };

  useEffect(() => {
    if (query) {
      const searchWithQueryUrl: string = `${searchURL}/streaming/search/movie/${query}`;
      getStreamings(searchWithQueryUrl);
    }
  }, [query]);

  return (
    <div className="search-container">
      <h2>Resultados para: <span className="query-text">{query}</span></h2>
      <div className="search-content-grid">
        {streamings.length === 0 ? <p>Carregando...</p> : (
          streamings.map((streaming) => (
            <div key={streaming.id.toString()} className="movie-card-grid">
              <MovieCard streaming={streaming} showLink={true} />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Search;