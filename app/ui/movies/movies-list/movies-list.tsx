import { MovieItem } from '@/app/ui/movies/movie-item';
import cls from './movies-list.module.scss'
import { Flex, Pagination } from '@mantine/core';

type MoviesListProps = {
    movies: Movie[] | RatedMovie[];
    genres: Genre[];
}

export function MoviesList({ movies, genres }: MoviesListProps) {

    return (
        <ul className={cls.moviesList}>
            <Flex wrap={'wrap'} gap={16} justify='center'>
                {movies.map(movie => (
                    <MovieItem key={movie.id} movie={movie} genres={genres} />
                ))}
            </Flex>
        </ul>
    )
}