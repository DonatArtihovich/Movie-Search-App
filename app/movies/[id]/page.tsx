import cls from './movie-page.module.scss'
import { getMovie } from "@/app/lib/actions";
import { AdditionalMovieInfoCard } from '@/app/ui/movie/additional-info-card';
import { MainMovieInfoCard } from '@/app/ui/movie/main-info-card';
import { Flex, Breadcrumbs, Loader } from "@mantine/core";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function MoviePage({
    params
}: {
    params: {
        id: string;
    }
}) {
    const movie = await getMovie(params.id);

    console.log(movie);
    if (!movie) {
        notFound();
    }

    const items = [
        { title: 'Movies', href: '/' },
        { title: movie?.original_title, href: '#' }
    ]
        .map(item => (
            <Link
                href={item.href}
                className={cls.breadcrumbsLink}
                key={`${item.title}${item.href}`}
            >
                {item.title}
            </Link>
        ))

    if (!movie) {
        return <Loader />;
    }

    return (
        <>
            {movie &&
                <Flex
                    direction='column'
                    className={cls.moviePage}
                    gap={20}
                >
                    <Breadcrumbs className={cls.breadcrumbs}>
                        {items}
                    </Breadcrumbs>
                    <MainMovieInfoCard movie={movie} />
                    <AdditionalMovieInfoCard movie={movie} />
                </Flex>
            }
        </>
    )
}