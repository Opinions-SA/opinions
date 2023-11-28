import { useEffect, useState } from "react";
import Carousel from "../components/carousel/Carousel";
import Header from "../components/header/Header";

import { Streaming } from "../interface/Streaming";

const moviesApiURL: string = import.meta.env.VITE_API;

const Home = () => {
  const [trendingStreaming, setTrendingStreaming] = useState<Streaming[]>([]);

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
    <div className="home-container">
        <div className="header-container">
          <Header streaming={trendingStreaming}/>
        </div>
        <div className="movies-container">
            {trendingStreaming.length === 0 ? <p>Carregando...</p> : (
              <Carousel gridData={trendingStreaming} />
            )}
        </div>
    </div>
  );
};

export default Home;
