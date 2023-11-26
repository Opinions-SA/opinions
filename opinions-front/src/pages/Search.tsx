import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/movieCard/MovieCard";

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
    <div className="container">
      <h2>Results to: <span className="query-text">{query}</span></h2>
      <div className="movies-container">
        {streamings.length === 0 ? <p>Loading...</p> : (
          streamings.map((streaming) => <MovieCard key={streaming.id.toString()} streaming={streaming} showLink={true} />)
        )}
      </div>
    </div>
  );
}

export default Search;
