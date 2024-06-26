'use client'

import cls from './rate-button.module.scss'
import { Button, Flex, Title } from "@mantine/core";
import Image from "next/image";
import { useState } from 'react';
import { RateModal } from '../rate-modal';
import { getMoviesRatings } from '@/app/lib/rating';
import { classNames } from '@/app/lib/class-names';

type RateButtonProps = {
    movie: Movie | { id: number };
    readOnly?: boolean;
    className?: string
}

export function RateButton({ movie, readOnly, className }: RateButtonProps) {
    const [modalOpened, setModalOpened] = useState<boolean>(false);

    const movieRating = getMoviesRatings()?.find(m => m.id === movie.id)?.rating ?? 0;

    return (
        <>
            <Button
                className={classNames(cls.rateButton, className)}
                onClick={() => !readOnly && setModalOpened(!modalOpened)}
                disabled={readOnly}
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
            {!readOnly &&
                <RateModal
                    opened={modalOpened}
                    onClose={() => setModalOpened(false)}
                    movie={movie as Movie}
                />
            }
        </>
    )
}