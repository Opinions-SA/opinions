export interface Movie {
    id: BigInteger;
    name: string;
    overview: string;
    first_air_date: Date;
    genre_ids: Array<BigInteger>;
    popularity: Float32Array;
    vote_average: Float32Array;
    vote_count: Float32Array;
    poster_path: string;
    backdrop_path: string;
    media_type: string;
    trailer: string;
}