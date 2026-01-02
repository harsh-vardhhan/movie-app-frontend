import { apiClient } from './client';
import type { MovieList, Movie, ActorDetail, DirectorDetail, Genre } from '../types';

export const fetchMovies = async (page = 1, genre?: string, search?: string) => {
    const params: any = { page };
    if (genre) params.genre = genre;
    if (search) params.search = search;

    const response = await apiClient.get<MovieList[]>('/movies/', { params });
    return response.data;
};

export const fetchMovieById = async (id: string | number) => {
    const response = await apiClient.get<Movie>(`/movies/${id}`);
    return response.data;
};

export const fetchActorById = async (id: string | number) => {
    const response = await apiClient.get<ActorDetail>(`/actors/${id}`);
    return response.data;
};

export const fetchDirectorById = async (id: string | number) => {
    const response = await apiClient.get<DirectorDetail>(`/directors/${id}`);
    return response.data;
};

export const fetchGenres = async () => {
    const response = await apiClient.get<Genre[]>('/genres/');
    return response.data;
};
