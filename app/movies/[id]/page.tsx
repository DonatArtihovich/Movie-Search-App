'use client'
import cls from './movie-page.module.scss'
import { getMovie } from "@/app/lib/actions";
import { getMoneyString, getTimeString, months } from '@/app/lib/const';
import { Flex, Breadcrumbs, Card, Title, useMantineTheme, Button, Table, Loader, Grid } from "@mantine/core";
import Image from 'next/image';
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function MoviePage({
    params
}: {
    params: {
        id: string;
    }
}) {
    const theme = useMantineTheme();
    const [movie, setMovie] = useState<MovieType | null>();

    const items = useMemo(() => ([
        { title: 'Movies', href: '/' },
        { title: movie?.original_title, href: '#' }
    ]
        .map(item => (
            <Link
                href={item.href}
                className={cls.breadcrumbsLink}
                key={`${item.title}${item.href}`}
            >
                {item.title}
            </Link>
        ))), [movie])

    useEffect(() => {
        new Promise(async () => {
            const movie = await getMovie(params.id);

            console.log(movie);
            if (!movie) {
                notFound();
            }

            setMovie(movie);
        })

    }, [])

    if (!movie) {
        return <Loader />;
    }

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
        <>
            {movie &&
                <Flex
                    direction='column'
                    style={{
                        padding: '40px 180px'
                    }}
                    className={cls.moviePage}
                    gap={20}
                >
                    <Breadcrumbs className={cls.breadcrumbs}>
                        {items}
                    </Breadcrumbs>
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
                                    {/* <Flex gap={8}>
                                        <Flex direction='column' gap={12}>
                                            {additionalData
                                                .map(i =>
                                                    <Title
                                                        order={6}
                                                        className={cls.additionalDataTitle}
                                                    >{i.header}</Title>
                                                )
                                            }
                                        </Flex>
                                        <Flex direction='column' gap={12}>
                                            {additionalData
                                                .map(i => <p className={cls.additionalDataText}>{i.data}</p>)
                                            }
                                        </Flex>
                                    </Flex> */}
                                    {/* <Table className={cls.additionalDataTable}>
                                        {additionalData.map(item =>
                                            <Table.Tr key={item.header}>
                                                <Table.Td className={cls.additionalDataTitle}>{item.header}</Table.Td>
                                                <Table.Td className={cls.additionalDataText}>{item.data}</Table.Td>
                                            </Table.Tr>
                                        )
                                        }
                                    </Table> */}
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
                </Flex>
            }
        </>
    )
}