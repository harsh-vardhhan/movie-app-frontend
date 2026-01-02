export interface Request {
    page?: number;
    size?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    size: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface Actor {
    id: number;
    name: string;
    profile_path?: string;
}

export interface Director {
    id: number;
    name: string;
    profile_path?: string;
}

export interface MovieList {
    id: number;
    title: string;
    release_year: number;
    vote_average?: number;
    poster_path?: string;
    genres: Genre[];
    director?: Director; // Sometimes lists might include director
}

export interface CastMember extends Actor {
    character: string;
}

export interface Movie extends MovieList {
    overview: string;
    runtime: number;
    cast: CastMember[]; // Updated to use CastMember
    director: Director;
}

export interface ActorDetail extends Actor {
    biography?: string;
    birthday?: string;
    place_of_birth?: string;
    filmography: MovieList[];
}

export interface DirectorDetail extends Director {
    biography?: string;
    birthday?: string;
    place_of_birth?: string;
    filmography: MovieList[];
}
