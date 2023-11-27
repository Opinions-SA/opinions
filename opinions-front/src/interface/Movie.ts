import { CastDto, GenreDto, ProductionCompanieDto, ProductionCountrieDto } from "./TvSerie";

export interface Movie {
    id: BigInteger;
    title: string;
    overview: string;
    release_date: Date;
    status: string;
    production_companies: ProductionCompanieDto[];
    production_countries: ProductionCountrieDto[];
    tagline: string;
    budget: number;
    revenue: number;
    runtime: number;
    genres: Array<GenreDto>;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    backdrop_path: string;
    media_type: string;
    cast: CastDto[]
    trailer: string;
}