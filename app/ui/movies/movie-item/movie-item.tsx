'use client'

import { Card, Flex, useMantineTheme } from '@mantine/core';
import cls from './movie-item.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { RateButton } from '../rate-button';
// import useWindowSize from '@/app/lib/hooks/use-window-size';
import { useWindowWidth } from '@react-hook/window-size';

type MovieItemProps = {
    movie: Movie;
    genres: Genre[];
}

export function MovieItem({ movie, genres }: MovieItemProps) {
    const theme = useMantineTheme();
    const width = useWindowWidth();

    console.log(movie.genre_ids.map(genreId => genres.find(({ id }) => genreId === Number(id))?.name));

    return (
        <li className={cls.MovieItem}>
            <Card className={cls.MovieItemCard}>
                <Flex
                    justify='space-between'

                >
                    <Flex
                        gap={16}
                        direction={width <= 500
                            ? 'column'
                            : 'row'
                        }
                        align='center'
                    >
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}` || '/no-poster.svg'}
                            alt={movie.title}
                            width={119}
                            height={170}
                        />
                        <Flex direction='column' justify='space-between' style={{ minHeight: '170px', maxWidth: '263px' }} >
                            <Flex direction='column' gap={8}>
                                {width < 1250 && width > 980 || width <= 700
                                    ? <Flex align='center' justify='space-between'>
                                        <Link
                                            className={cls.movieTitle}
                                            style={{
                                                color: theme.colors.appPurple[4],
                                                maxWidth: '70%'
                                            }}
                                            href={`/movies/${movie.id}`}
                                        >
                                            {movie.original_title}
                                        </Link>
                                        <RateButton movie={movie} />
                                    </Flex>

                                    : <Link
                                        className={cls.movieTitle}
                                        style={{ color: theme.colors.appPurple[4] }}
                                        href={`/movies/${movie.id}`}
                                    >
                                        {movie.original_title}
                                    </Link>
                                }
                                <p
                                    className={cls.releaseDate}
                                    style={{ color: theme.colors.appGrey[4] }}
                                >
                                    {movie.release_date.split('-')[0]}
                                </p>
                                <Flex align='center' gap={8}>
                                    <Flex align='center' gap={4}>
                                        <Image
                                            src='/yellow-star.svg'
                                            alt='star'
                                            width={28}
                                            height={28}
                                        />
                                        <p className={cls.ratingVoteAverage}>{movie.vote_average.toFixed(1)}</p>
                                    </Flex>

                                    <p className={cls.ratingVoteCount} style={{ color: theme.colors.appGrey[4] }}>
                                        ({movie.vote_count > 1000000 ? `${(movie.vote_count / 1000000).toFixed(1)}M`
                                            : movie.vote_count > 1000
                                                ? `${(movie.vote_count / 1000).toFixed(1)}K`
                                                : movie.vote_count})
                                    </p>
                                </Flex>
                            </Flex>
                            <Flex gap={8}>
                                <p
                                    className={cls.genresTitle}
                                    style={{ color: theme.colors.appGrey[4] }}
                                >
                                    Genres
                                </p>
                                <p className={cls.genresList}>{movie.genre_ids.map(genreId =>
                                    genres
                                        .find(({ id }) => genreId === Number(id))
                                        ?.name
                                )
                                    .join(', ')}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                    {(width >= 1250 || width <= 980 && width > 700) &&
                        <RateButton
                            movie={movie}
                            className={cls.rateButton}
                        />
                    }
                </Flex>
            </Card>
        </li >
    )
}