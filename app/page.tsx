'use client'

import { Flex, Pagination, Title } from "@mantine/core";
import { MoviesForm } from "./ui/movies/form";
import cls from './movies.module.scss'
import { useEffect, useState } from "react";
import { MoviesList } from "./ui/movies/movies-list";
import { NoMoviesResult } from "./ui/movies/no-movies/no-movies";

export default function Home() {
  const [movies, setMovies] = useState<null | MovieResults>(null);
  const [activePage, setActivePage] = useState<number>(1)

  useEffect(() => {
    console.log(movies);
  }, [movies])

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
      <MoviesForm
        setMovies={setMovies}
        page={activePage}
        setPage={setActivePage}
      />
      {movies && movies.results.length > 0 ?
        <Flex direction='column'>
          <MoviesList movies={movies.results} />
          <Pagination
            total={movies.total_pages}
            style={{
              alignSelf: 'flex-end'
            }}
            value={activePage}
            onChange={setActivePage}
            className={cls.pagination}
          />
        </Flex>
        : <NoMoviesResult />
      }
    </Flex >
  );
}
