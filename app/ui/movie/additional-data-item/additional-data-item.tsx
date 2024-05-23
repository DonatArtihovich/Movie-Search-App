import cls from './additional-data-item.module.scss'

type AdditionalDataItemProps = {
    header: string;
    data: string;
}

export function AdditionalDataItem({ header, data }: AdditionalDataItemProps) {
    return (
        <>
            <div key={header} className={cls.additionalDataTitle}>{header}</div>
            <div key={data} className={cls.additionalDataText}>{data}</div>
        </>
    )
}