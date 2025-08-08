import movieService from './service.js'

class MovieController {
    async getMovies(req, res) {
        const movieSubstring = req.query.movieSubstring

        if (!movieSubstring) {
            return res.status(400).json({ message: 'Movie substring is required' });
        }

        const data = await movieService.getMoviesBySubstring(movieSubstring, req.query.groupByGenre);

        res.status(200).json(data)
    }

}

export default new MovieController()