'use client'

import { getMoneyString, getTimeString, months } from '@/app/lib/const';
import cls from './main-movie-info.module.scss'
import { Button, Card, Flex, Title, useMantineTheme } from "@mantine/core";
import Image from "next/image";

type MainMovieInfoCard = {
    movie: MovieType;
}

export function MainMovieInfoCard({ movie }: MainMovieInfoCard) {
    const theme = useMantineTheme();

    const additionalData = [
        { header: 'Duration', data: getTimeString(movie.runtime) },
        { header: 'Premiere', data: `${months[Number(movie.release_date.split('-')[1]) - 1]} ${Number(movie.release_date.split('-')[2])}, ${movie.release_date.split('-')[0]}` },
        {
            header: 'Budget',
            data: `${getMoneyString(movie.budget)}`
        },
        { header: 'Gross worldwide', data: `${getMoneyString(movie.revenue)}` },
        { header: 'Genres', data: movie.genres.map(g => g.name).join(', ') }
    ]
        .filter(({ data }) => data);

    return (
        <Card className={cls.movieCard}>
            <Flex justify='space-between'>
                <Flex gap={16}>
                    <Image
                        src={movie ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no-poster.svg'}
                        alt='Movie Poster'
                        width={250}
                        height={352}
                    />
                    <Flex direction='column' justify='space-between' style={{
                        maxWidth: '442px'
                    }}>
                        <Flex direction='column'>
                            <Flex direction='column' gap={8}>
                                <Title
                                    className={cls.movieTitle}
                                    style={{ color: theme.colors.appPurple[4] }}
                                >
                                    {movie.original_title}
                                </Title>
                                <p
                                    className={cls.releaseDate}
                                    style={{ color: theme.colors.appGrey[4] }}
                                >{movie.release_date.split('-')[0]}</p>
                                <Flex align='center' gap={8}>
                                    <Flex align='center' gap={4}>
                                        <Image
                                            src='/rating-star-yellow.svg'
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
                        </Flex>

                        <div className={cls.additionalDataGrid}>
                            {additionalData.map(item =>
                                <>
                                    <div key={item.header} className={cls.additionalDataTitle}>{item.header}</div>
                                    <div key={item.data} className={cls.additionalDataText}>{item.data}</div>
                                </>
                            )
                            }
                        </div>
                    </Flex>
                </Flex>
                <Button className={cls.starButton}>
                    <Image src='/grey-star.svg' alt='star' width={28} height={28} />
                </Button>
            </Flex>
        </Card>
    )
}