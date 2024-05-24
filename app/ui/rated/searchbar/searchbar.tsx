import { Button, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import cls from './searchbar.module.scss'
import { ChangeEvent } from "react";

type SearchbarProps = {
    value: string;
    setValue: (s: string) => void;
    onButtonClick: () => void;
}

export function Searchbar({ value, setValue, onButtonClick }: SearchbarProps) {
    const searchIcon = <IconSearch width={15} height={15} />;

    return (
        <Flex className={cls.wrapper} align='center' justify='space-between'>
            <TextInput
                height={490}
                leftSection={searchIcon}
                className={cls.textInput}
                placeholder="Search movie title"
                value={value}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
            />
            <Button className={cls.searchButton} onClick={onButtonClick}>Search</Button>
        </Flex>

    )
}