'use client'

import { Button, Card, Flex, Title, useMantineTheme } from '@mantine/core';
import cls from './movie-item.module.scss'
import Image from 'next/image';
import Link from 'next/link';
import { RateButton } from '../rate-button';

type MovieItemProps = {
    movie: Movie;
}

export function MovieItem({ movie }: MovieItemProps) {
    const theme = useMantineTheme();

    return (
        <li className={cls.MovieItem}>
            <Card className={cls.MovieItemCard}>
                <Flex justify='space-between'>
                    <Flex gap={16}>
                        <Image
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}` || '/no-poster.svg'}
                            alt={movie.title}
                            width={119}
                            height={170}
                        />
                        <Flex direction='column' justify='space-between' style={{ minHeight: '170px', maxWidth: '263px' }} >
                            <Flex direction='column' gap={8}>
                                <Link
                                    className={cls.movieTitle}
                                    style={{ color: theme.colors.appPurple[4] }}
                                    href={`/movies/${movie.id}`}
                                >
                                    {movie.original_title}
                                </Link>
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
                                <p className={cls.genresList}>{movie.genre_ids.join(', ')}</p>
                            </Flex>
                        </Flex>
                    </Flex>
                    <RateButton
                        rating={movie.rating}
                        movieName={movie.original_title}
                        movieId={movie.id}
                    />
                </Flex>
            </Card>
        </li>
    )
}