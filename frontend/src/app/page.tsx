'use client';

import { useState, useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '@/lib/movies';
import { SearchBar } from '@/components/SearchBar';
import { ResultsGrid } from '@/components/ResultsGrid';
import { Loader } from '@/components/Loader';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { useFavorites } from '@/hooks/useFavorites';
import { MovieCard } from '@/components/MovieCard';
import { QUERY_KEYS, CACHE_TIME } from '@/lib/constants';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [page] = useState(1);
  const { favorites, isLoaded } = useFavorites();

  const { data: movies = [], isLoading, isError, refetch } = useQuery({
    queryKey: [QUERY_KEYS.SEARCH, searchQuery, page],
    queryFn: () => searchMovies(searchQuery, page),
    enabled: searchQuery.length > 0,
    staleTime: CACHE_TIME.SEARCH,
  });

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <section className="bg-linear-to-br from-purple-50 via-white to-purple-50 py-16 px-4">
          <div className="container mx-auto max-w-screen-xl">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                Discover Your Next
                <span className="bg-linear-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                  {' '}Favorite Movie
                </span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Search through millions of movies, series, and episodes. Save your favorites and explore detailed information.
              </p>
            </div>
            <SearchBar onSearch={handleSearch} initialQuery={searchQuery} />
          </div>
        </section>

        <section className="container mx-auto max-w-screen-xl px-4 py-8">
          {isLoading && <Loader />}
          
          {isError && (
            <ErrorState 
              message="Failed to search movies. Please try again." 
              onRetry={() => refetch()}
            />
          )}
          
          {!isLoading && !isError && searchQuery && movies.length === 0 && (
            <EmptyState searchQuery={searchQuery} />
          )}
          
          {!isLoading && !isError && movies.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Search Results for &quot;{searchQuery}&quot;
              </h2>
              <ResultsGrid movies={movies} />
            </div>
          )}

          {!searchQuery && isLoaded && favorites.length > 0 && (
            <div id="favorites" className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Your Favorites
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            </div>
          )}

          {!searchQuery && isLoaded && favorites.length === 0 && (
            <EmptyState type="favorites" />
          )}
        </section>
      </main>
    </div>
  );
}
