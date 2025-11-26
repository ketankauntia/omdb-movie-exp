'use client';

import { useQuery } from '@tanstack/react-query';
import { useParams, useRouter } from 'next/navigation';
import { getMovie } from '@/lib/movies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { FavoriteButton } from '@/components/FavoriteButton';
import { MovieDetailLoader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import { QUERY_KEYS, CACHE_TIME } from '@/lib/constants';
import { ArrowLeft, Calendar, Clock, Star } from 'lucide-react';
import Image from 'next/image';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const movieId = params.id as string;

  const { data: movie, isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.MOVIE, movieId],
    queryFn: () => getMovie(movieId),
    enabled: !!movieId,
    staleTime: CACHE_TIME.MOVIE,
  });

  if (isLoading) {
    return <MovieDetailLoader />;
  }

  if (isError || !movie) {
    return (
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <ErrorState 
          message="Failed to load movie details. Please try again." 
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-screen-xl px-4 py-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </Button>

        <div className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-8">
          <div className="relative">
            <Card className="overflow-hidden sticky top-24">
              <div className="relative aspect-2/3 bg-linear-to-br from-purple-100 to-purple-50">
                {movie.poster ? (
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 400px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <div className="text-center p-4">
                      <p className="text-lg font-medium">No Poster</p>
                      <p className="text-sm mt-1">Available</p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                  {movie.title}
                </h1>
                <FavoriteButton 
                  movie={{ 
                    id: movie.id, 
                    title: movie.title, 
                    year: movie.year, 
                    type: 'movie', 
                    poster: movie.poster 
                  }} 
                />
              </div>
              
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{movie.year}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{movie.runtime}</span>
                </div>
                <Badge variant="outline">{movie.rated}</Badge>
                <span className="text-sm">{movie.released}</span>
              </div>
            </div>

            {movie.genres.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-2">Genres</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {movie.imdbRating && movie.imdbRating !== 'N/A' && (
              <Card className="bg-linear-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-yellow-500 p-2 rounded-lg">
                      <Star className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {movie.imdbRating}<span className="text-base text-gray-600">/10</span>
                      </p>
                      <p className="text-sm text-gray-600">IMDb Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Plot</h3>
              <p className="text-gray-700 leading-relaxed">{movie.plot}</p>
            </div>

            {movie.director && movie.director !== 'N/A' && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Director</h3>
                <p className="text-gray-700">{movie.director}</p>
              </div>
            )}

            {movie.actors.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cast</h3>
                <div className="flex flex-wrap gap-2">
                  {movie.actors.map((actor) => (
                    <Badge key={actor} variant="outline" className="text-sm">
                      {actor}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {movie.ratings.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ratings</h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {movie.ratings.map((rating) => (
                    <Card key={rating.Source}>
                      <CardContent className="p-4">
                        <p className="text-xs text-gray-600 mb-1">{rating.Source}</p>
                        <p className="text-lg font-bold text-gray-900">{rating.Value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

