'use client'

import { Button, Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getMoviesRatings } from "@/app/lib/rating";
import { MoviesList } from "@/app/ui/movies/movies-list";
import { Pagination } from "@/app/ui/movies/pagination";
import cls from './rated.module.scss'
import { Searchbar } from "@/app/ui/rated/searchbar";
import Image from "next/image";
import Link from "next/link";
import { fetchGenres } from "@/app/lib/actions";
import useWindowSize from "../lib/hooks/use-window-size";

export default function Rated() {
    const [movies, setMovies] = useState<RatedMovie[]>([]);
    const [page, setPage] = useState<number>(1);
    const [searchString, setSearchString] = useState<string>('');
    const [genres, setGenres] = useState<Genre[]>([]);
    const [searched, setSearched] = useState<boolean>(false);
    const { width } = useWindowSize();

    const moviesOnPage = 4;

    useEffect(() => {
        const movies = getMoviesRatings();
        if (movies) setMovies(movies);

        new Promise(async () => {
            const { genres } = await fetchGenres();
            setGenres(genres);
        })
    }, []);

    const searchMovies = () => {
        if (!searchString) {
            const moviesRatings = getMoviesRatings();
            console.log(moviesRatings);
            if (moviesRatings) setMovies(moviesRatings);

            return
        }

        setSearched(true);

        setMovies(movies
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
            align={(!movies.length && !searched) ? 'center' : 'normal'}
            justify={(!movies.length && !searched) ? 'center' : 'normal'}
        >
            {movies.length || searched ?
                <>
                    <Flex
                        direction={width < 980 ? 'column' : 'row'}
                        align='center'
                        justify='space-between'
                        gap={10}
                        style={{
                            minWidth: '80%'
                        }}
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
                        genres={genres}
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