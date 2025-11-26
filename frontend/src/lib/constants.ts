export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:5000/api';

export const STORAGE_KEYS = {
  FAVORITES: 'omdb_favs_v1',
} as const;

export const QUERY_KEYS = {
  SEARCH: 'search',
  MOVIE: 'movie',
} as const;

export const CACHE_TIME = {
  SEARCH: 5 * 60 * 1000,
  MOVIE: 10 * 60 * 1000,
} as const;

