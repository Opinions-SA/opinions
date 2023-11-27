export interface Movie {
    id: BigInteger;
    title: string;
    overview: string;
    release_date: Date;
    tagline: string;
    budget: number;
    revenue: number;
    runtime: number;
    genre_ids: Array<BigInteger>;
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    backdrop_path: string;
    media_type: string;
    trailer: string;
}