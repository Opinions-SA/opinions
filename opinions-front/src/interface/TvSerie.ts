export interface SeasonDto {
    id: BigInteger;
    name: string;
    overview: string;
    air_date: Date;
    poster_path: string;
    season_number: string;
    episode_count: number;
    vote_average: number;
}

export interface ProductionCountrieDto {
    iso_3166_1: string;
    name: string;
}

export interface ProductionCompanieDto {
    id: BigInteger;
    name: string;
    logo_path: string;
    origin_country: string;
}

export interface NetworkDto {
    id: BigInteger;
    name: string;
    logo_path: string;
    origin_country: string;
}

export interface GenreDto {
    id: BigInteger;
    name: string;
}

export interface EpisodeToAirDto {
    id: BigInteger;
    name: string;
    overview: string;
    vote_average: number;
    vote_count: number;
    air_date: Date;
    episode_number: number;
    episode_type: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string;
}

export interface CreatedByDto {
    id: BigInteger;
    name: string;
    profile_path: string;
    gender: number;
    credit_id: string;
}

export interface CastDto {
    adult: boolean;
    gender: number;
    id: BigInteger;
    knownForDepartment: string;
    name: string;
    originalName: string;
    popularity: number;
    profilePath: string;
    castId: number;
    character: string;
    creditId: string;
    order: number;
}

export interface TvSerie {
    id: BigInteger;
    name: string;
    seasons: SeasonDto[];
    overview: string;
    homepage: string;
    first_air_date: Date;
    tagline: string;
    episode_run_time: number[];
    number_of_episodes: number;
    number_of_seasons: number;
    production_companies: ProductionCompanieDto[];
    production_countries: ProductionCountrieDto[];
    status: string;
    type: string;
    last_air_date: Date;
    last_episode_to_air: EpisodeToAirDto;
    next_episode_to_air: EpisodeToAirDto;
    in_production: boolean;
    genres: GenreDto[];
    popularity: number;
    vote_average: number;
    vote_count: number;
    poster_path: string;
    backdrop_path: string;
    networks: NetworkDto[];
    created_by: CreatedByDto[];
    media_type: string;
    cast: CastDto[]
    trailer: string;
}

export default TvSerie;
