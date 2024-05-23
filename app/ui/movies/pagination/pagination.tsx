import { Pagination as MantinePagination, PaginationProps } from "@mantine/core"
import cls from './pagination.module.scss'

export function Pagination(props: PaginationProps) {
    return (
        <MantinePagination
            style={{
                alignSelf: 'flex-end'
            }}
            className={cls.pagination}
            {...props}
        />
    )
}