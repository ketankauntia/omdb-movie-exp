import { api } from './api';
import { Movie, MovieDetail } from '@/types/movie';

export async function searchMovies(query: string, page: number = 1): Promise<Movie[]> {
  try {
    const response = await api.get<Movie[]>('/search', {
      params: {
        query: encodeURIComponent(query),
        page,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error('Search error:', error);
    throw new Error('Failed to search movies');
  }
}

export async function getMovie(id: string): Promise<MovieDetail> {
  try {
    const response = await api.get<MovieDetail>(`/movie/${id}`);
    return response.data;
  } catch (error) {
    console.error('Movie detail error:', error);
    throw new Error('Failed to fetch movie details');
  }
}

