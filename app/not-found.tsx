'use client';

import { Button, Flex, Text } from "@mantine/core";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import cls from './movies.module.scss'

export default function NotFound() {
    const { replace } = useRouter()

    useEffect(() => {
        replace('not-found');
    }, [])

    return (
        <Flex
            direction='column'
            align='center'
            justify='center'
            style={{
                minHeight: '100vh'
            }}
        >
            <Flex
                direction='column'
                align='center'
                gap={48}
            >
                <Image
                    src='/not-found.png'
                    alt='Page not found'
                    width={656}
                    height={195}
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
        </Flex>
    )
}