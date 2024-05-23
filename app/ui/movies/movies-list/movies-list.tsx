import { MovieItem } from '@/app/ui/movies/movie-item';
import cls from './movies-list.module.scss'
import { Flex, Pagination } from '@mantine/core';

type MoviesListProps = {
    movies: Movie[] | RatedMovie[];
}

export function MoviesList({ movies }: MoviesListProps) {

    return (
        <ul className={cls.moviesList}>
            <Flex wrap={'wrap'} gap={16}>
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} />
                ))}
            </Flex>
        </ul>
    )
}