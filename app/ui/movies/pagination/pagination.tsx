'use client'

import { Pagination as MantinePagination, PaginationProps } from "@mantine/core"
import cls from './pagination.module.scss'
import { usePathname, useSearchParams, useRouter } from "next/navigation"

export function Pagination(props: PaginationProps) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const changePage = (value: number) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set('page', value.toString())

        replace(`${pathname}?${newSearchParams.toString()}`)
    }

    return (
        <MantinePagination
            style={{
                alignSelf: 'flex-end'
            }}
            className={cls.pagination}
            onChange={changePage}
            {...props}
        />
    )
}