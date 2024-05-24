'use client'

import { getMoneyString, getTimeString, months } from '@/app/lib/const';
import cls from './main-movie-info.module.scss'
import { Card, Flex, Title, useMantineTheme } from "@mantine/core";
import Image from "next/image";
import { AdditionalDataItem } from '../additional-data-item';
import { RateButton } from '../../movies/rate-button';
import useWindowSize from '@/app/lib/hooks/use-window-size';

type MainMovieInfoCard = {
    movie: MovieType;
}

export function MainMovieInfoCard({ movie }: MainMovieInfoCard) {
    const theme = useMantineTheme();
    const { width } = useWindowSize();

    const additionalData = [
        { header: 'Duration', data: getTimeString(movie.runtime) },
        { header: 'Premiere', data: movie.runtime && `${months[Number(movie.release_date.split('-')[1]) - 1]} ${Number(movie.release_date.split('-')[2])}, ${movie.release_date.split('-')[0]}` },
        {
            header: 'Budget',
            data: `${getMoneyString(movie.budget)}`
        },
        { header: 'Gross worldwide', data: `${getMoneyString(movie.revenue)}` },
        { header: 'Genres', data: movie.genres.map(g => g.name).join(', ') }
    ]
        .filter(({ data }) => Boolean(data)) as Record<'header' | 'data', string>[];

    return (
        <Card className={cls.movieCard}>
            <Flex justify={width > 900 ? 'space-between' : 'center'} className={cls.mainWrapper}>
                <Flex
                    gap={16}
                    direction={width < 900
                        ? 'column'
                        : 'row'}
                    align='center'
                >
                    <Image
                        src={movie ? `https://image.tmdb.org/t/p/original${movie.poster_path}` : '/no-poster.svg'}
                        alt='Movie Poster'
                        width={width > 500 ? 250 : 200}
                        height={352}
                        className={cls.image}
                    />
                    <Flex
                        direction='column'
                        justify='space-between'
                        style={{
                            maxWidth: '442px',
                        }}
                    >
                        <Flex direction='column'>
                            <Flex direction='column' gap={8}>
                                {width < 1200
                                    ? <Flex justify='space-between'>
                                        <Title
                                            className={cls.movieTitle}
                                            style={{ color: theme.colors.appPurple[4] }}
                                        >
                                            {movie.original_title}
                                        </Title>
                                        <RateButton
                                            movie={{ id: movie.id }}
                                            readOnly
                                        />
                                    </Flex>
                                    : <Title
                                        className={cls.movieTitle}
                                        style={{ color: theme.colors.appPurple[4] }}
                                    >
                                        {movie.original_title}
                                    </Title>
                                }
                                <p
                                    className={cls.releaseDate}
                                    style={{ color: theme.colors.appGrey[4] }}
                                >{movie.release_date.split('-')[0]}</p>
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
                        </Flex>

                        <div className={cls.additionalDataGrid}>
                            {additionalData
                                .map(item =>
                                    <AdditionalDataItem key={item.header} {...item} />
                                )}
                        </div>
                    </Flex>
                </Flex>
                {width > 1200 && <RateButton
                    movie={{ id: movie.id }}
                    readOnly
                />}
            </Flex>
        </Card>
    )
}