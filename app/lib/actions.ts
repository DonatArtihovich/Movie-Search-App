'use server'
import axios from 'axios'

const apiInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjJhY2U0OTM0OWU0MjQ0OWYxYmJmMmMzNDllOTNlOSIsInN1YiI6IjY2NDlhN2QzZWZjYjI3NjdiMDc5NWIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.S9SbBslVjQTCKK4lbS205YoEJ6LZ8ffC6Y2tQmn4ESk'
    }
})

export async function fetchGenres(): Promise<{genres: Genre[]}> {
    return (await apiInstance.get('/genre/movie/list?language=en', {
        params: {
            next: {
                revalidate: 0
            }
        }
    })).data;
}

export async function getMovies(props: {
    genre: Genre['name'],
    year: number,
    sort: string,
    ratingFrom: number,
    ratingTo: number,
    page: number
}): Promise<MovieResults> {
    return (await apiInstance
                .get(
                    `https://api.themoviedb.org/3/discover/movie?page=${props.page}&with_genres=${props.genre}&year=${props.year}&vote_average.gte=${props.ratingFrom}&vote_average.lte=${props.ratingTo}&sort_by=${props.sort}`
                ).catch(e => console.error(e))
            )
            ?.data || {
                page: 1,
                results: [],
                total_pages: 0,
                total_results: 0
            };
}