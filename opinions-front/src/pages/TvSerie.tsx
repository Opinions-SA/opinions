import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BsGraphUp, BsWallet2, BsHourglassSplit, BsFillFileEarmarkTextFill } from "react-icons/bs";

import { TvSerie } from "../interface/TvSerie";

import TvSerieCard from "../components/TvSerieCard";

import "../styles/Movies.css"

const seriesApiURL: string = import.meta.env.VITE_API;

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

    const formatCurrency = (number: number) => {
        return number.toLocaleString("en-US", {
            style: "currency",
            currency: "USD"
        })
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
