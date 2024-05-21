import cls from './no-movies.module.scss'
import { Flex, Image, Title } from "@mantine/core";

export function NoMoviesResult() {
    return (
        <Flex direction='column' align='center' gap={16} style={{
            marginTop: '24px'
        }}>
            <Image
                src='/no-movies.svg'
                width={'312px'}
                height={'253px'}
                alt='No movies found'
                className={cls.image}
            />
            <Title className={cls.title}>We don't have such movies, look for another one</Title>
        </Flex>
    )
}