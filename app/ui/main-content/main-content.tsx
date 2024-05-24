'use client'
import cls from './main-content.module.scss'
import { Burger, Flex } from "@mantine/core";
import { Navbar } from "../navbar";
import { useState } from 'react';
import useWindowSize from '@/app/lib/hooks/use-window-size';
import { classNames } from '@/app/lib/class-names';

type MainContentProps = {
    className: string;
    children: React.ReactNode;
}

export function MainContent({ className, children }: MainContentProps) {
    const { width } = useWindowSize()
    const [menuOpened, setMenuOpened] = useState<boolean>(width > 700);

    return (
        <Flex max-w={'100vw'} min-h={'100vh'} justify='center'>
            {width < 700 &&
                <div className={cls.burgerWrapper}>
                    <Burger
                        opened={menuOpened}
                        onClick={() => setMenuOpened(!menuOpened)}
                        aria-label='Toggle navigation'
                    />
                </div>}
            <Navbar opened={menuOpened} />
            <div
                className={classNames(menuOpened && width < 700 && cls.layer)}
                onClick={() => setMenuOpened(false)}
            />
            <main
                className={className}
                style={{
                    width: '100%',
                    backgroundColor: 'var(--grey-200)'
                }}
            >
                {children}
            </main>
        </Flex>
    )
}