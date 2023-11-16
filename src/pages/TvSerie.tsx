import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from "react-icons/bs";

import { TvSerie } from "../interface/TvSerie";

import TvSerieCard from "../components/tvSerieCard/TvSerieCard";

import "../styles/TvSerie.css"

const seriesApiURL: string = import.meta.env.VITE_API;
const imageUrl = import.meta.env.VITE_IMG;


const TvSeriePage = () => {
    const { id } = useParams();
    const [tvSerie, setTvSerie] = useState<TvSerie | null>(null); 

    const getTvSerie = async (url: RequestInfo | URL) => {
        const options: RequestInit = {
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        const res = await fetch(url, options);
        const data: TvSerie = await res.json();
        setTvSerie(data);
    }

    const formatDate = (date: Date) => {
        return new Date(date).toLocaleDateString();
    }

    useEffect(() => {
        const tvSerieUrl: string = `${seriesApiURL}/streaming/tv/${id}`;
        getTvSerie(tvSerieUrl);
    }, [id]);

    return (
        <div className="tvSerie-page">
            {tvSerie && (
                <>
                    <TvSerieCard serie={tvSerie} key={tvSerie.id.toString()} showLink={false} />
                    <p className="tagline">{tvSerie.tagline}</p>
                    <div className="infos">
                        <div className="info">
                            <h3>
                                <BsWallet2 /> Genres
                            </h3>
                            <div className="genres">{tvSerie.genres.map((genre) => <p className="genre"> {genre.name}</p>)}</div> 
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> First air date
                            </h3>
                            <p>{formatDate(tvSerie.first_air_date)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> Last air date
                            </h3>
                            <p>{formatDate(tvSerie.last_air_date)}</p>
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> {tvSerie.in_production ? "In production" : "Ended"}
                            </h3>
                        </div>
                        <div className="info">
                            <h3>
                                <BsWallet2 /> Networks
                            </h3>
                            <div className="genres">{tvSerie.networks.map((network) => <p className="genre"> <img src={imageUrl + network.logo_path}/></p>)}</div> 
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> Season number
                            </h3>
                            <p>{tvSerie.number_of_seasons}</p>
                        </div>
                        <div className="info">
                            <h3>
                                <BsHourglassSplit /> Episode number
                            </h3>
                            <p>{tvSerie.number_of_episodes}</p>
                        </div>
                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Description
                        </h3>
                        <p>{tvSerie.overview}</p>
                    </div>
                </>
            )}
        </div>
    )
}

export default TvSeriePage;
