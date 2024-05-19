import { Button, Flex, NativeSelect, NumberInput, Title, px, useMantineTheme } from "@mantine/core";
import cls from './form.module.scss'
import { IconChevronDown } from "@tabler/icons-react";

export function MoviesForm() {
    const theme = useMantineTheme()

    return (
        <form
            className={cls.form}
        >
            <Flex direction='column' gap={24}>
                <Flex align='center' w='100%' gap={16}>
                    <NativeSelect
                        rightSection={<IconChevronDown style={{ width: px(25), height: px(24) }} />}
                        label="Genres"
                        className={cls.genreInput}
                    >
                        <option className={cls.defaultOption}>
                            Select genre
                        </option>
                    </NativeSelect>
                    <NativeSelect
                        rightSection={<IconChevronDown style={{ width: px(25), height: px(24) }} />}
                        label="Release year"
                        aria-placeholder="Select release year"
                        className={cls.yearInput}
                    >
                        <option className={cls.defaultOption}>
                            Release year
                        </option>
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
                            />
                            <NumberInput
                                className={cls.ratingsInput}
                                placeholder="To"
                            />
                        </Flex>
                    </Flex>
                    <Button
                        className={cls.resetInputsButton}
                        style={{ color: theme.colors.appGrey[4] }}
                    >
                        Reset filters
                    </Button>
                </Flex>
                <NativeSelect
                    label='Sort by'
                    aria-placeholder='Most popular'
                    className={cls.mostPopularInput}
                />
            </Flex>
        </form >
    )
}