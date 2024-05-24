import { Flex, Loader } from "@mantine/core";

export default function Loading() {
    return (
        <Flex
            style={{
                minWidth: '100%',
                minHeight: '100vh'
            }}

            align='center'
            justify='center'
        >
            <Loader
                color='purple'
            />
        </Flex>
    )
}