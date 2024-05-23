'use client'

import { Button, Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getMoviesRatings } from "@/app/lib/rating";
import { MoviesList } from "@/app/ui/movies/movies-list";
import { Pagination } from "@/app/ui/movies/pagination";
import cls from './rated.module.scss'
import { Searchbar } from "@/app/ui/rated/searchbar";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default function Rated() {
    const [movies, setMovies] = useState<RatedMovie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [searchString, setSearchString] = useState<string>('');

    const moviesOnPage = 4;

    useEffect(() => {
        const movies = getMoviesRatings();
        if (movies) setMovies(movies);
    }, []);

    const searchMovies = () => {
        if (!searchString) {
            const moviesRatings = getMoviesRatings();
            console.log(moviesRatings);
            if (moviesRatings) setMovies(moviesRatings);

            return;
        }

        setMovies(
            movies
                .filter(m =>
                    m.original_title
                        .toLowerCase()
                        .includes(
                            searchString
                                .toLowerCase()
                        )
                )
        )
    }

    return (
        <Flex
            direction='column'
            gap={40}
            className={cls.wrapper}
            align={!movies.length ? 'center' : 'normal'}
            justify={!movies.length ? 'center' : 'normal'}
        >
            {movies.length ?
                <>
                    <Flex
                        align='center'
                        justify='space-between'
                    >
                        <Title order={1}>
                            Rated movies
                        </Title>
                        <Searchbar
                            value={searchString}
                            setValue={setSearchString}
                            onButtonClick={searchMovies}
                        />
                    </Flex>
                    <MoviesList
                        movies={movies.slice(moviesOnPage * (page - 1), moviesOnPage * page)}
                    />
                    <Pagination
                        total={Math.ceil(movies.length / 4)}
                        value={page}
                        onChange={setPage}
                        style={{ alignSelf: 'center' }}
                    />
                </>
                : <Flex
                    direction='column'
                    align='center'
                    gap={16}
                >
                    <Image
                        src='/no-rated-movies.svg'
                        alt='No rated movies found'
                        width={400}
                        height={300}
                    />
                    <Title className={cls.notFoundTitle}>
                        You haven't rated any films yet
                    </Title>
                    <Button
                        component={Link}
                        className={cls.notFoundButton}
                        href='/'
                        title='Find movies'
                    >
                        Find movies
                    </Button>
                </Flex>
            }
        </Flex>
    )
}