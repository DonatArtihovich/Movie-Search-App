'use client';

import { classNames } from '@/app/lib/class-names';
import cls from './navbar.module.scss'
import { Flex, Menu, Text, Title, useMantineTheme } from "@mantine/core";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import useWindowSize from '@/app/lib/hooks/use-window-size';

interface MenuItem {
    label: string;
    key: string;
    href: Url;
}

const menuItems: MenuItem[] = [
    { label: 'Movies', key: 'movies', href: '/' },
    { label: 'Rated Movies', key: 'rated', href: '/rated' }
]

export function Navbar() {
    const pathname = usePathname();
    const { width } = useWindowSize();
    const [selected, setSelected] = useState<MenuItem['key']>(
        pathname
            .endsWith('rated')
            ? menuItems[1].key
            : menuItems[0].key
    );
    const theme = useMantineTheme();

    return (
        <nav
            className={cls.navbar}
        >
            <Flex
                className={cls.navbarWrapper}
                direction='column'
                bg={theme.colors.appPurple[0]}
                align='start'
                style={{
                    width: width < 800 ? '30vw' : ''
                }}
            // w={width < 800}
            >
                <Flex
                    gap={12}
                    className={cls.logoWrapper}
                >
                    <Image
                        src='/logo.svg'
                        width={32}
                        height={32}
                        alt='Logo'
                    />
                    <Title
                        order={2}
                        className={cls.logoTitle}
                        component='h2'
                        c={theme.colors.appPurple[4]}
                        style={{
                            fontSize: width < 800 ? '20px' : ''
                        }}
                    >
                        ArrowFlicks
                    </Title>
                </Flex>

                <ul
                    className={cls.buttonsMenu}
                >
                    <Menu>
                        {menuItems.map(item => (
                            <Menu.Item
                                key={item.key}
                                defaultChecked={item.key === 'movies'}
                                className={classNames(cls.menuLinkWrapper, selected === item.key && cls.checked)}
                                bg={selected === item.key ? theme.colors.appPurple[1] : 'transparent'}
                                onClick={() => setSelected(item.key)}
                                component={Link}
                                href={item.href}
                            >
                                <Text
                                    className={cls.menuLink}
                                    style={{ color: selected === item.key ? theme.colors.appPurple[4] : 'black' }}
                                >{item.label}</Text>
                            </Menu.Item>
                        ))}
                    </Menu>
                </ul>
                {/* <Flex>
                    <Button>Movies</Button>
                    <Button>Rated Movies</Button>
                </Flex> */}
            </Flex>
        </nav >
    )
}