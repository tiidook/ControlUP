import axios from "axios";
import { ApiError, ErrorCode } from "../../errors/api.error.js";

class MovieService {
    async getMoviesBySubstring(substring, groupByGenre) {
        try {
            const moviesResponse = await axios.get(`https://api.tvmaze.com/search/shows?q=${substring}`)
            const moviesData = moviesResponse.data;

            if (groupByGenre) {
                const genreMoviesMap = moviesData.reduce((acc, movie) => {
                    const movieData = movie.show;
                    const genres = movieData.genres;

                    if (!genres) {
                        return acc;
                    }

                    genres.forEach((genre) => {
                        const movieDTO = { id: movieData.id, name: movieData.name, premierDate: movieData.premiered, imageUrl: movieData.image?.medium }
                        if (acc[genre]) {
                            acc[genre].push(movieDTO)
                        } else {
                            acc[genre] = [movieDTO]
                        }
                    })

                    return acc

                }, {})

                return { type: 'groupedByGenre', data: genreMoviesMap };
            }

            return { type: 'list', data: moviesData };
        } catch (e) {
            // Should be logged
            console.log('error', e)
            throw new ApiError(ErrorCode.INTERNAL_ERROR, 'TVMaze service error')
        }
    }
}

export default new MovieService();