import { Flex, Title } from "@mantine/core";
import { MoviesForm } from "./ui/movies/form";
import cls from './movies.module.scss'
import { MoviesList } from "./ui/movies/movies-list";
import { NoMoviesResult } from "./ui/movies/no-movies/no-movies";
import { Pagination } from "./ui/movies/pagination";
import { fetchGenres, getMovies } from "./lib/actions";

export default async function Home({
  searchParams
}: {
  searchParams: {
    genre: Genre['name'],
    year: number,
    sort: string,
    ratingFrom: number,
    ratingTo: number,
    page: number
  }
}) {
  const movies = await getMovies({
    ...searchParams
  });

  const genres: Genre[] = (await fetchGenres()).genres;

  return (
    <Flex
      direction="column"
      className={cls.wrapper}
      bg='var(--grey-200)'
    >
      <Title
        order={1}
        className={cls.moviesTitle}
      >
        Movies
      </Title>
      <MoviesForm genres={genres} />
      {movies && movies.results.length > 0 ?
        <Flex direction='column'>
          <MoviesList movies={movies.results} genres={genres} />
          <Pagination
            total={movies.total_pages}
          />
        </Flex>
        : <NoMoviesResult />
      }
    </Flex >
  );
}
