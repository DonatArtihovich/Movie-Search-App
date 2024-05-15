'use client'

import { AppShell, Button, Flex, Menu, MenuItemProps, Title, useMantineTheme } from "@mantine/core";
import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";
import Link from "next/link";

interface MenuItem {
    label: string;
    key: string;
    href: Url;
}

export function Navbar() {
    const theme = useMantineTheme();

    const menuItems: MenuItem[] = [
        { label: 'Movies', key: 'movies', href: '/' },
        { label: 'Reted Movies', key: 'rated', href: '/rated' }
    ]

    return (
        <nav
            className="w-280"
        >
            <Flex
                className='h-screen p-6'
                w={280}
                direction='column'
                bg={theme.colors.appPurple[0]}
                align='start'
            >
                <Flex
                    gap={12}
                >
                    <Image
                        src='/logo.svg'
                        width={32}
                        height={32}
                        alt='Logo'
                    />
                    <Title
                        order={2}
                        className='font-bold text-2xl tracking-tighter'
                        component='h2'
                        c={theme.colors.appPurple[4]}
                    >
                        ArrowFlicks
                    </Title>
                </Flex>

                <Menu>
                    {menuItems.map(item => (
                        <Menu.Item
                            key={item.key}
                            defaultChecked={item.key === 'movies'}
                        >
                            <Link
                                href={item.href}
                            >{item.label}</Link>
                        </Menu.Item>
                    ))}
                </Menu>
                {/* <Flex>
                    <Button>Movies</Button>
                    <Button>Rated Movies</Button>
                </Flex> */}
            </Flex>
        </nav >
    )
}