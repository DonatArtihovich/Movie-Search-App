'use client';

import { Button, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import cls from './movies.module.scss'
import { Logo } from "@/app/ui/logo";

export default function NotFound() {
    const { replace } = useRouter()

    useEffect(() => {
        replace('not-found');
    }, [])

    return (
        <div
            style={{
                minHeight: '100vh',
                padding: 24
            }}
        >
            <Logo />
            <Flex
                direction='column'
                align='center'
                gap={48}
                className={cls.notFoundFlex}
            >
                <Image
                    src='/not-found.png'
                    alt='Page not found'
                    width={656}
                    height={195}
                    className={cls.notFoundImage}
                />
                <Flex
                    direction='column'
                    align='center'
                    gap={16}
                >
                    <Text className={cls.notFoundText}>We can’t find the page you are looking for</Text>
                    <Button className={cls.notFoundButton}>Go Home</Button>
                </Flex>
            </Flex>
        </div>
    )
}