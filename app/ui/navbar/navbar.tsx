'use client'
import { classNames } from '@/app/lib/class-names';
import cls from './navbar.module.scss'
import { Flex, Menu, Text, Title, useMantineTheme } from "@mantine/core";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { usePathname } from 'next/navigation';

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
    const [selected, setSelected] = useState<MenuItem['key']>(
        pathname
            .endsWith('rated')
            ? menuItems[1].key
            : menuItems[0].key
    );
    const theme = useMantineTheme();

    return (
        <nav className={cls.navbar}>
            <Flex
                className={cls.navbarWrapper}
                w={280}
                direction='column'
                bg={theme.colors.appPurple[0]}
                align='start'
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
                                w={232}
                                h={42}
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