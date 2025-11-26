'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Movie } from '@/types/movie';
import { FavoriteButton } from './FavoriteButton';
import Link from 'next/link';
import Image from 'next/image';

interface MovieCardProps {
  movie: Movie;
}

export function MovieCard({ movie }: MovieCardProps) {
  return (
    <Link href={`/movie/${movie.id}`}>
      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full cursor-pointer border-gray-200">
        <div className="relative aspect-2/3 overflow-hidden bg-linear-to-br from-purple-100 to-purple-50">
          {movie.poster ? (
            <Image
              src={movie.poster}
              alt={movie.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <div className="text-center p-4">
                <p className="text-sm font-medium">No Poster</p>
                <p className="text-xs mt-1">Available</p>
              </div>
            </div>
          )}
          
          <div className="absolute top-2 right-2 z-10">
            <FavoriteButton movie={movie} size="sm" />
          </div>
        </div>
        
        <CardContent className="p-4">
          <h3 className="font-semibold text-base line-clamp-2 group-hover:text-purple-600 transition-colors min-h-12">
            {movie.title}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-600">{movie.year}</p>
            <Badge variant="secondary" className="text-xs capitalize">
              {movie.type}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

