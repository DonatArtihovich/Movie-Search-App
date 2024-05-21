'use client'

import { Button, Flex, NativeSelect, NumberInput, Title, px, useMantineTheme } from "@mantine/core";
import cls from './form.module.scss'
import { IconChevronDown } from "@tabler/icons-react";
import { fetchGenres, getMovies } from "@/app/lib/actions";
import { useForm } from "@mantine/form";
import { useEffect, useState } from "react";

type MoviesFormProps = {
    setMovies: (movieResults: MovieResults) => void;
    page: number;
}

export function MoviesForm({ setMovies, page }: MoviesFormProps) {
    const [genres, setGenres] = useState<Genre[]>([])

    useEffect(() => {
        new Promise(async (res) => {
            const genres: Genre[] = (await fetchGenres()).genres;
            setGenres(genres)
        })
    }, [])

    useEffect(() => {
        new Promise(async res => {
            const values = form.getValues();

            const movies = await getMovies({
                ...values as {
                    genre: Genre['name'],
                    year: number,
                    sort: string,
                    ratingFrom: number,
                    ratingTo: number,
                },
                page
            });

            setMovies(movies);
        })

    }, [page])

    const form = useForm({
        mode: 'controlled',
    })

    const handleChange = form.onSubmit(async (values) => {
        const movies = await getMovies({
            ...values as {
                genre: Genre['name'],
                year: number,
                sort: string,
                ratingFrom: number,
                ratingTo: number,
            },
            page
        });

        setMovies(movies);
    })

    return (
        <form className={cls.form} onChange={handleChange}>
            <Flex direction='column' gap={24}>
                <Flex align='center' w='100%' gap={16}>
                    <NativeSelect
                        rightSection={<IconChevronDown style={{ width: px(25), height: px(24) }} />}
                        label="Genres"
                        className={cls.genreInput}
                        key={form.key('genre')}
                        {...form.getInputProps('genre', { type: 'input' })}
                    >
                        <option className={cls.defaultOption}>
                            Select genre
                        </option>

                        {genres.map(genre => (
                            <option value={genre.id} className={cls.option} key={genre.id}>
                                {genre.name}
                            </option>
                        ))}
                    </NativeSelect>
                    <NativeSelect
                        rightSection={<IconChevronDown style={{ width: px(25), height: px(24) }} />}
                        label="Release year"
                        aria-placeholder="Select release year"
                        className={cls.yearInput}
                        key={form.key('year')}
                        {...form.getInputProps('year', { type: 'input' })}
                    >
                        <option className={cls.defaultOption}>
                            Release year
                        </option>

                        {Array.from({ length: 2024 - 1900 + 1 }, (v, i) => 1900 + i).map(year => (
                            <option value={year} className={cls.option} key={year}>
                                {year}
                            </option>
                        ))}
                    </NativeSelect>
                    <Flex
                        direction='column'
                        className={cls.ratingsInputsWrapper}
                    >
                        <Title className={cls.ratingInputsTitle}>Ratings</Title>
                        <Flex gap={8}>
                            <NumberInput
                                className={cls.ratingsInput}
                                placeholder="From"
                                min={0}
                                max={10}
                                key={form.key('ratingFrom')}
                                {...form.getInputProps('from', { type: 'input' })}
                            />
                            <NumberInput
                                className={cls.ratingsInput}
                                placeholder="To"
                                min={0}
                                max={10}
                                key={form.key('ratingTo')}
                                {...form.getInputProps('to', { type: 'input' })}
                            />
                        </Flex>
                    </Flex>
                    <Button
                        className={cls.resetInputsButton}
                        style={{ color: 'var(--grey-500)' }}
                    >
                        Reset filters
                    </Button>
                </Flex>
                <NativeSelect
                    label='Sort by'
                    className={cls.mostPopularInput}
                    key={form.key('sort')}
                    {...form.getInputProps('sort', { type: 'input' })}
                >
                    <option value="popularity.desc">Most popular</option>
                    <option value="original_title.desc">Original Title</option>
                    <option value="primary_release_date.desc">Release date</option>
                    <option value="title.desc">Title</option>
                    <option value="vote_average.desc">Rating</option>
                    <option value="vote_count.desc">Votes count</option>
                </NativeSelect>
            </Flex>
        </form >
    )
}