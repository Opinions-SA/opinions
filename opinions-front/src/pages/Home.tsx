import { useEffect, useState } from "react";
import MoviesCarousel from "../components/moviesCarousel/MoviesCarousel";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";

import { Streaming } from "../interface/Streaming";
import MovieCard from "../components/movieCard/MovieCard";

const moviesApiURL: string = import.meta.env.VITE_API;

const Home = () => {
  const [trendingStreaming, setTrendingStreaming] = useState<Streaming[]>([]);

  const getTrendingStreaming = async (url: RequestInfo) => {
    const options: RequestInit = {
      method: "GET",
      headers: {
        accept: "application/json",
      },
    };
    const res = await fetch(url, options);
    const data: Streaming[] = await res.json();
    setTrendingStreaming(data);
  };

  useEffect(() => {
    const topRatedUrl: string = `${moviesApiURL}/streaming/trending/all`;
    getTrendingStreaming(topRatedUrl);
  }, []);

  const moviesData = trendingStreaming.filter(
    (item) => item.media_type === "movie"
  );

  const seriesData = trendingStreaming.filter(
    (item) => item.media_type === "tv"
  );

  return (
    <div className="home-container">
      <div className="header-container">
        <Header streaming={trendingStreaming} />
      </div>
      <div className="movies-container">
        {trendingStreaming.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <MoviesCarousel
            itemsData={trendingStreaming}
            renderCard={(item, index) => (
              <MovieCard key={index} streaming={item} showLink={true} />
            )}
            title="Top Releases"
          />
        )}

        {moviesData.length === 0 ? (
          <p> </p>
        ) : (
          <MoviesCarousel
            itemsData={moviesData}
            renderCard={(item, index) => (
              <MovieCard key={index} streaming={item} showLink={true} />
            )}
            title="Top Movies Releases"
          />
        )}

        {seriesData.length === 0 ? (
          <p> </p>
        ) : (
          <MoviesCarousel
            itemsData={seriesData}
            renderCard={(item, index) => (
              <MovieCard key={index} streaming={item} showLink={true} />
            )}
            title="Top Tv Series Releases"
          />
        )}
      </div>
      {trendingStreaming.length === 0 ? (
          <p> </p>
        ) : (
      <Footer />
      )}
    </div>
  );
};

export default Home;
