'use client'

import { Button, Flex, NativeSelect, NumberInput, Title, useMantineTheme } from "@mantine/core";
import { MoviesForm } from "./ui/movies/form";
import cls from './movies.module.scss'

export default function Home() {
  const theme = useMantineTheme()

  return (
    <Flex
      direction="column"
      className={cls.wrapper}
      bg={theme.colors.gray[2]}
    >
      <Title
        order={1}
        className={cls.moviesTitle}
      >
        Movies
      </Title>
      <MoviesForm />
    </Flex >
  );
}
