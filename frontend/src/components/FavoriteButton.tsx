'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Movie } from '@/types/movie';
import { useFavorites } from '@/hooks/useFavorites';

interface FavoriteButtonProps {
  movie: Movie;
  size?: 'sm' | 'default' | 'lg';
}

export function FavoriteButton({ movie, size = 'default' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite, isLoaded } = useFavorites();
  
  if (!isLoaded) return null;

  const favorite = isFavorite(movie.id);

  return (
    <Button
      variant="ghost"
      size={size === 'sm' ? 'sm' : 'icon'}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(movie);
      }}
      className={`transition-all ${
        favorite 
          ? 'text-red-500 hover:text-red-600' 
          : 'text-gray-400 hover:text-red-500'
      }`}
      aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={favorite}
    >
      <Heart 
        className={`w-5 h-5 ${favorite ? 'fill-current' : ''}`}
      />
    </Button>
  );
}

