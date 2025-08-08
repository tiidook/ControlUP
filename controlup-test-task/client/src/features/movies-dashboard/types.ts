export interface Movie {
    id: string,
    name: string,
    imageUrl: string,
    premierDate: string
}

export type GroupedMoviesResponse = { type: 'groupedByGenre', data: Record<string, Movie[]> }
export type MoviesListResponse = { type: 'list', data: Movie[] }

