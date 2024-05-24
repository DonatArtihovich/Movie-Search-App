const KEY = 'ratings';

export function getMoviesRatings (): RatedMovie[] | null {
    const movieRatings = localStorage.getItem(KEY);

    return movieRatings
        ? JSON.parse(movieRatings)
        : null;
}

export function getMovieRating(movieId: number): RatedMovie | null {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        const movie = JSON
            .parse(movieRatings)
            .find((m: RatedMovie) => m.id === movieId)

        return movie || null;
    }
    
    return null;
}

export function setMovieRating(movie: RatedMovie) {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        const movieRatingsArray = JSON.parse(movieRatings);

        if(movieRatingsArray.findIndex((m: RatedMovie) => m.id === movie.id) > -1) {
            localStorage.setItem(
                KEY, 
                JSON
                .stringify(
                    JSON
                    .parse(movieRatings)
                    .map((m: RatedMovie) => m.id === movie.id? {...movie} : m)
                )
            )
        } else {
            localStorage.setItem(
                KEY, 
                JSON
                .stringify(
                    [...JSON
                        .parse(movieRatings),
                        movie
                    ]
                )
            )
        }
    } else {
        localStorage.setItem(KEY, JSON.stringify([movie] satisfies RatedMovie[]));
    }
}

export function removeMovieRating(movieId: number) {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        localStorage.setItem(
            KEY, 
            JSON
            .stringify(
                JSON
                    .parse(movieRatings)
                    .filter((m: RatedMovie) => m.id !== movieId)
            )
        );
    } 
}