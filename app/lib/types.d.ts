type Genre = {
    id: string;
    name: string;
}

type Movie = {
    id: number;
    adult: boolean;
    backdrop_path: null;
    genre_ids: number[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: null | string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}


type MovieResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
