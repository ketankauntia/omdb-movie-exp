import { Search, Film } from 'lucide-react';

interface EmptyStateProps {
  type?: 'search' | 'favorites';
  searchQuery?: string;
}

export function EmptyState({ type = 'search', searchQuery }: EmptyStateProps) {
  if (type === 'favorites') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-purple-50 p-4 rounded-full mb-4">
          <Film className="w-12 h-12 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          No favorites yet
        </h3>
        <p className="text-gray-600 text-center max-w-md">
          Start exploring and add movies to your favorites by clicking the heart icon.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="bg-gray-50 p-4 rounded-full mb-4">
        <Search className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        No results found
      </h3>
      <p className="text-gray-600 text-center max-w-md">
        {searchQuery 
          ? `We could not find any movies matching "${searchQuery}". Try a different search term.`
          : 'Try searching for your favorite movies, series, or episodes.'}
      </p>
    </div>
  );
}

