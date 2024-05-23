'use client'

import { Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getMoviesRatings } from "../lib/rating";
import { MoviesList } from "@/app/ui/movies/movies-list";
import { Pagination } from "@/app/ui/movies/pagination";
import cls from './rated.module.scss'

export default function Rated() {
    const [movies, setMovies] = useState<RatedMovie[]>([]);
    const [page, setPage] = useState<number>(1);

    const moviesOnPage = 4;

    useEffect(() => {
        const movies = getMoviesRatings();
        if (movies) setMovies(movies);
    }, []);

    return (
        <Flex direction='column' gap={40} className={cls.wrapper}>
            <Flex>
                <Title order={1}>Rated movies</Title>
                <></>
            </Flex>
            <MoviesList movies={movies.slice(moviesOnPage * (page - 1), moviesOnPage * page)} />
            <Pagination
                total={Math.ceil(movies.length / 4)}
                value={page}
                onChange={setPage}
                style={{ alignSelf: 'center' }}
            />
        </Flex>
    )
}