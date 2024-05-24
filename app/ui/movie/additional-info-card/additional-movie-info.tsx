'use client';

import { Card, Divider, Flex, List, ListItemProps, Title } from '@mantine/core';
import cls from './additional-movie-info.module.scss'
import Image from 'next/image';

type AdditionalMovieInfoCardProps = {
    movie: MovieType;
}

export function AdditionalMovieInfoCard({ movie }: AdditionalMovieInfoCardProps) {
    return (
        <Card className={cls.movieCard}>
            <Flex direction='column'>
                {movie.video &&
                    <>
                        <Flex direction='column' gap={16}>
                            <Title order={2} className={cls.sectionHeader}>Trailer</Title>
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/HXgFH0jOY-w?si=BAtU9Ll7byFLMSap"
                                title="YouTube video player"
                                frameBorder={0}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                        </Flex>
                        <Divider my='lg' />
                    </>
                }
                {movie.overview &&
                    <>
                        <Flex direction='column' gap={16}>
                            <Title order={2} className={cls.sectionHeader}>Description</Title>
                            <p className={cls.movieOverview}>{movie.overview}</p>
                        </Flex>
                        <Divider my='lg' />
                    </>
                }
                <Flex direction='column' gap={16}>
                    <Title order={2} className={cls.sectionHeader}>Production</Title>
                    <List className={cls.companiesList}>
                        {movie.production_companies.map(i => (
                            <List.Item className={cls.companiesListItem} key={i.id}>
                                <Flex align='center' gap={8}>
                                    <div className={cls.imageWrapper}>
                                        <Image
                                            src={i.logo_path ? `https://image.tmdb.org/t/p/original${i.logo_path}` : '/clapperboard.svg'}
                                            alt={i.name}
                                            width={40}
                                            className={cls.companyLogoImage}
                                            height={40}
                                        />
                                    </div>

                                    <Title order={6}>{i.name}</Title>
                                </Flex>
                            </List.Item>
                        ))
                        }
                    </List>
                </Flex>
            </Flex>
        </Card>
    )
}