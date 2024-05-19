'use client'

import { Flex, Title } from "@mantine/core";
import { MoviesForm } from "./ui/movies/form";
import cls from './movies.module.scss'
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([])

  useEffect(() => {
    console.log(movies)
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
      <MoviesForm setMovies={setMovies} />
    </Flex >
  );
}
