'use client';

import { useState, useEffect } from 'react';
import { Movie } from '@/types/movie';
import { STORAGE_KEYS } from '@/lib/constants';

export function useFavorites() {
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(favorites));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }
    }
  }, [favorites, isLoaded]);

  const isFavorite = (id: string): boolean => {
    return favorites.some((movie) => movie.id === id);
  };

  const toggleFavorite = (movie: Movie) => {
    setFavorites((prev) => {
      const exists = prev.some((m) => m.id === movie.id);
      if (exists) {
        return prev.filter((m) => m.id !== movie.id);
      } else {
        return [...prev, movie];
      }
    });
  };

  return {
    favorites,
    isFavorite,
    toggleFavorite,
    isLoaded,
  };
}

