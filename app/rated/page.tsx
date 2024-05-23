'use client'

import { Flex, Title } from "@mantine/core";
import { useEffect, useState } from "react";
import { getMoviesRatings } from "../lib/rating";
import { MoviesList } from "../ui/movies/movies-list";

export default function Rated() {
    const [movies, setMovies] = useState<RatedMovie[]>([]);

    useEffect(() => {
        const movies = getMoviesRatings();
        if (movies) setMovies(movies);
    }, []);

    return (
        <Flex direction='column'>
            <Flex>
                <Title order={1}>Rated movies</Title>

            </Flex>
            <MoviesList movies={movies} />
        </Flex>
    )
}