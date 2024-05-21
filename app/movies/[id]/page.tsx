'use client'
import cls from './movie-page.module.scss'
import { getMovie } from "@/app/lib/actions";
import { getMoneyString, getTimeString, months } from '@/app/lib/const';
import { MainMovieInfoCard } from '@/app/ui/movie/main-info-card';
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
                    <MainMovieInfoCard movie={movie} />
                </Flex>
            }
        </>
    )
}