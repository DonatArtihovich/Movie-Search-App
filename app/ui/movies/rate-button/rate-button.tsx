'use client'

import cls from './rate-button.module.scss'
import { Button, Flex, Title } from "@mantine/core";
import Image from "next/image";
import { useState } from 'react';
import { RateModal } from '../rate-modal';
import { getMoviesRatings } from '@/app/lib/rating';

type RateButtonProps = {
    rating: null | number;
    movieName: string;
    movieId: number;
}

export function RateButton({ rating, movieName, movieId }: RateButtonProps) {
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const movieRating = getMoviesRatings()?.find(m => m.id === movieId)?.rating ?? 0;

    return (
        <>
            <Button
                className={cls.rateButton}
                onClick={() => setModalOpened(!modalOpened)}
            >
                {movieRating > 0
                    ?
                    <Flex gap={4} align='center'>
                        <Image src={'/purple-star.svg'} alt='star' width={28} height={28} />
                        <Title order={6} className={cls.movieRating}>{movieRating}</Title>
                    </Flex>
                    :
                    <Image src={'/grey-star.svg'} alt='star' width={28} height={28} />

                }
            </Button>
            <RateModal
                opened={modalOpened}
                onClose={() => setModalOpened(false)}
                movieName={movieName}
                movieRating={rating || 0}
                movieId={movieId}
            />
        </>
    )
}