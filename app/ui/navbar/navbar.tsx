'use client';

import { classNames } from '@/app/lib/class-names';
import cls from './navbar.module.scss'
import { Flex, Menu, Text, useMantineTheme } from "@mantine/core";
import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { Logo } from '../logo';
import { useWindowWidth } from '@react-hook/window-size';

interface MenuItem {
    label: string;
    key: string;
    href: Url;
}

const menuItems: MenuItem[] = [
    { label: 'Movies', key: 'movies', href: '/' },
    { label: 'Rated Movies', key: 'rated', href: '/rated' }
]

type NavbarProps = {
    opened: boolean;
}

export function Navbar({ opened }: NavbarProps) {
    const pathname = usePathname();
    const [selected, setSelected] = useState<MenuItem['key']>(
        pathname
            .endsWith('rated')
            ? menuItems[1].key
            : menuItems[0].key
    );
    const theme = useMantineTheme();
    const width = useWindowWidth();

    return (
        <nav
            className={classNames(cls.navbar, opened && cls.navbarOpened)}
        >
            <Flex
                className={cls.navbarWrapper}
                direction='column'
                bg={theme.colors.appPurple[0]}
            >
                <Logo />
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
                                w={width > 88 ? 232 : undefined}
                            >
                                <Text
                                    className={cls.menuLink}
                                    style={{ color: selected === item.key ? theme.colors.appPurple[4] : 'black' }}
                                >{item.label}</Text>
                            </Menu.Item>
                        ))}
                    </Menu>
                </ul>
            </Flex>
        </nav >
    )
}