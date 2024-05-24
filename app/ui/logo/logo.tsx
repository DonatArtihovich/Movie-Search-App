'use client';

import { Flex, Title, useMantineTheme } from '@mantine/core'
import cls from './logo.module.scss'
import Image from 'next/image'
// import useWindowSize from '@/app/lib/hooks/use-window-size';
import { useWindowWidth } from '@react-hook/window-size';

export function Logo() {
    const width = useWindowWidth();
    const theme = useMantineTheme();

    return (
        <Flex
            gap={12}
            className={cls.logoWrapper}
        >
            {width > 700 &&
                <Image
                    src='/logo.svg'
                    width={32}
                    height={32}
                    alt='Logo'
                />
            }
            <Title
                order={2}
                className={cls.logoTitle}
                component='h2'
                c={theme.colors.appPurple[4]}
            >
                ArrowFlicks
            </Title>
        </Flex>
    )
}