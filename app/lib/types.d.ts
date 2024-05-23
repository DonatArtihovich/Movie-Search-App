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
    rating: null | number;
}


type MovieResults = {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

type MovieType = 
{
    adult: boolean;
    backdrop_path: string;
    belongs_to_collection: null | string;
    budget: number;
    genres:{ id: number, name: string }[]; 
    homepage: string;
    id: number;
    imdb_id: string;
    origin_country: string[];
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    production_companies: { id: number,logo_path: string | null, name: string, origin_country: string}[];
    production_countries: { iso_3166_1: string,name: string }[];
    release_date: string;
    revenue: number;
    runtime: number;
    spoken_languages: { english_name: string, iso_639_1: string, name: string }[];
    status: string;
    tagline: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    rating: null | number;
}

type MovieRating = {
    id: number;
    rating: number;
}