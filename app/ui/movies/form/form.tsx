'use client'

import { Button, Flex, NativeSelect, NumberInput, Title, px } from "@mantine/core";
import cls from './form.module.scss'
import { IconChevronDown } from "@tabler/icons-react";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";

export function MoviesForm({ genres }: { genres: Genre[] }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const page = searchParams.get('page') || 1;

    useEffect(() => {
        new Promise(async () => {
            const values = form.getValues();

            const newSearchParams = new URLSearchParams(searchParams);

            for (const key in { ...values, page }) {
                newSearchParams.set(key, String({ ...values, page }[key]));
            }

            replace(`${pathname}?${newSearchParams.toString()}`)
        })

    }, [page])

    const form = useForm({
        mode: 'controlled',
    })

    const handleChange = form.onSubmit(async (values) => {
        const newSearchParams = new URLSearchParams(searchParams);

        for (const key in { ...values, page: 1 }) {
            newSearchParams.set(key, String({ ...values, page: 1 }[key]));
        }

        replace(`${pathname}?${newSearchParams.toString()}`)
    })

    return (
        <form className={cls.form} onChange={handleChange}>
            <Flex direction='column' gap={24}>
                <Flex align='center' w='100%' gap={16} className={cls.mainInputsWrapper}>
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