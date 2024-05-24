import { Button, Card, Divider, Flex, Modal, Rating, Title } from "@mantine/core";
import cls from './rate-modal.module.scss'
import { useState } from "react";
import { removeMovieRating, setMovieRating } from "@/app/lib/rating";

type RateModalProps = {
    opened: boolean;
    onClose: () => void;
    movie: Movie;
}

export function RateModal({ opened, onClose, movie }: RateModalProps) {
    const [value, setValue] = useState<number>(movie.rating || 0);

    const saveRating = () => {
        setMovieRating({ ...movie, rating: value });
        onClose();
    }

    const removeRating = () => {
        removeMovieRating(movie.id);
        setValue(0);
        onClose();
    }

    return (
        <Modal
            className={cls.modal}
            opened={opened}
            onClose={onClose}
            title='Your rating'
            size='auto'
            centered
        >
            <Card>
                <Divider w={'100%'} />
                <Flex direction='column' gap={16} className={cls.wrapper}>
                    <Title order={2} className={cls.title}>{movie.original_title}</Title>
                    <Rating
                        defaultValue={0}
                        value={value}
                        count={10}
                        size={29}
                        w={'100%'}
                        onChange={v => setValue(v)}
                        className={cls.ratingInput}
                        emptySymbol={<img
                            src='/grey-star.svg'
                            alt='star'
                        />}
                        fullSymbol={<img
                            src='/yellow-star.svg'
                            alt='star'
                        />}
                    />
                    <Flex align='center' gap={16}>
                        <Button className={cls.saveButton} onClick={saveRating}>Save</Button>
                        <Button className={cls.removeRatingButton} onClick={removeRating}>Remove rating</Button>
                    </Flex>
                </Flex>
            </Card>
        </Modal>
    )
}