import { Box, CircularProgress, Stack } from "@mui/material"
import { useMovieData } from "./useMoviesData"
import { Container, DataSection, MovieInput, SectionItem, SectionTitle } from "./styles"


export const MoviesDashboard = () => {
    const {
        isLoading,
        movieInput,
        moviesByGenres,
        movies,
        selectedMovie,
        handleChangeInput,
        handleChangeSelectedGenre,
        handleChangeSelectedMovie,
        handleGetData,
        error
    } = useMovieData()

    if (isLoading) {
        return <Stack sx={{ height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}><CircularProgress /></Stack>
    }

    return (
        <Container data-testid='movie-dashboard-body'>
            <div data-testid='movie-dashboard-header'>
                <MovieInput
                    value={movieInput}
                    onChange={(e) => handleChangeInput(e.target.value)}
                    onBlur={() => handleGetData()}
                    disabled={isLoading}
                    error={error}
                    label='Type the movie'
                    inputProps={{ 'data-testid': 'movie-input' }}
                />
            </div>

            {moviesByGenres && (
                <DataSection data-testid='genres-section'>
                    <SectionTitle data-testid='genres-title'>Genres:</SectionTitle>
                    {Object.keys(moviesByGenres).map((genre) => (<SectionItem clickable onClick={() => handleChangeSelectedGenre(genre)}>{genre}</SectionItem>))}
                </DataSection>
            )}

            {movies && (
                <DataSection data-testid='movies-section'>
                    <SectionTitle>Movies:</SectionTitle>
                    {movies.map((movie, index) => (<SectionItem clickable onClick={() => handleChangeSelectedMovie(index)}>{movie.name}</SectionItem>))}
                </DataSection>
            )}

            {selectedMovie && (
                <DataSection data-testid='movies-section'>
                    <SectionTitle data-testid='movie-info-title'>Movie info:</SectionTitle>
                    <SectionItem>Premier date: {selectedMovie.premierDate}</SectionItem>
                    {selectedMovie.imageUrl && (
                        <Box
                            component="img"
                            src={selectedMovie.imageUrl}
                            alt="Flag"
                            sx={{
                                width: 200,
                                height: 'auto',
                                padding: 0,
                                objectFit: 'cover',
                                borderRadius: 1,
                            }}
                            data-testid='flag-image'
                        />
                    )}
                </DataSection>
            )}
        </Container>
    )
}