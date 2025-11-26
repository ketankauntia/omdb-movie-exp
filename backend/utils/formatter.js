exports.formatSearchList = (raw) => {
  if (!raw || !raw.Search) return [];
  return raw.Search.map(item => ({
    id: item.imdbID,
    title: item.Title,
    year: item.Year,
    type: item.Type,
    poster: item.Poster !== 'N/A' ? item.Poster : null
  }));
};

exports.formatMovie = (raw) => ({
  id: raw.imdbID,
  title: raw.Title,
  year: raw.Year,
  rated: raw.Rated,
  released: raw.Released,
  runtime: raw.Runtime,
  genres: raw.Genre ? raw.Genre.split(',').map(x => x.trim()) : [],
  director: raw.Director,
  actors: raw.Actors ? raw.Actors.split(',').map(x => x.trim()) : [],
  plot: raw.Plot,
  poster: raw.Poster !== 'N/A' ? raw.Poster : null,
  ratings: raw.Ratings || [],
  imdbRating: raw.imdbRating
});

