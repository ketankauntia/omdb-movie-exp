export interface Movie {
  id: string;
  title: string;
  year: string;
  type: string;
  poster: string | null;
}

export interface MovieDetail {
  id: string;
  title: string;
  year: string;
  rated: string;
  released: string;
  runtime: string;
  genres: string[];
  director: string;
  actors: string[];
  plot: string;
  poster: string | null;
  ratings: Rating[];
  imdbRating: string;
}

export interface Rating {
  Source: string;
  Value: string;
}

