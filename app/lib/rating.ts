const KEY = 'ratings';

export function getMoviesRatings (): MovieRating[] | null {
    const movieRatings = localStorage.getItem(KEY);

    return movieRatings
        ? JSON.parse(movieRatings)
        : null;
}

export function getMovieRating(movieId: number): MovieRating | null {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        const movie = JSON
            .parse(movieRatings)
            .find((m: MovieRating) => m.id === movieId)

        return movie || null;
    }
    
    return null;
}

export function setMovieRating(movieId: number, rating: number) {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        const movieRatingsArray = JSON.parse(movieRatings);

        if(movieRatingsArray.findIndex((m: MovieRating) => m.id === movieId) > -1) {
            localStorage.setItem(
                KEY, 
                JSON
                .stringify(
                    JSON
                    .parse(movieRatings)
                    .map((m: MovieRating) => m.id === movieId? {...m, rating} : m)
                )
            )
        } else {
            localStorage.setItem(
                KEY, 
                JSON
                .stringify(
                    [...JSON
                        .parse(movieRatings),
                        {
                            id: movieId,
                            rating
                        }
                    ]
                )
            )
        }
    } else {
        localStorage.setItem(KEY, JSON.stringify([{id: movieId, rating}] satisfies MovieRating[]));
    }
}

export function removeMovieRating(movieId: number) {
    const movieRatings = localStorage.getItem(KEY);

    if(movieRatings) {
        localStorage.setItem(
            KEY, 
            JSON
                .parse(movieRatings)
                .filter((m: MovieRating) => m.id !== movieId)
        );
    } 
}