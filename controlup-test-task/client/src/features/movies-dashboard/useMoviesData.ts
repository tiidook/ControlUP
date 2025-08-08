import { useEffect, useRef, useState } from "react";
import type { GroupedMoviesResponse, Movie, MoviesListResponse } from "./types";
import { toast } from "react-toastify";
import axios from "axios";
import { isEmpty } from "lodash";
import { BASE_URL } from "./const";

export const useMovieData = () => {
    const [movieInput, setMovieInput] = useState<string>('');
    const prevMovieInput = useRef<string>('')

    const [error, setIsError] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>();

    const [moviesByGenres, setMoviesByGenres] = useState<Record<string, Movie[]> | null>()
    const [movies, setMovies] = useState<Movie[] | null>()


    const handleChangeSelectedGenre = (genre: string) => {
        setSelectedMovie(null);
        setSelectedGenre(genre);
    }

    const handleChangeInput = (value: string) => {
        setMovieInput(value)

        if (!value) {
            setIsError(true);
            return
        }

        setIsError(false)
    }

    const handleChangeSelectedMovie = (index: number) => {
        if (movies) {
            setSelectedMovie(movies[index])
        }
    }

    useEffect(() => {
        if (selectedGenre && moviesByGenres) {
            setMovies(moviesByGenres[selectedGenre])
        }
    }, [selectedGenre, moviesByGenres])

    const handleGetData = async () => {

        if (!movieInput) {
            return
        }

        if (prevMovieInput.current === movieInput) {
            return;
        }

        prevMovieInput.current = movieInput;

        setIsLoading(true);
        setMovies(null);
        setSelectedGenre('');
        setSelectedMovie(null);
        setMoviesByGenres(null);

        try {
            const groupedMoviesResponse = await axios.get<GroupedMoviesResponse>(BASE_URL, { params: { movieSubstring: movieInput, groupByGenre: true } });


            const data = groupedMoviesResponse.data;


            if (isEmpty(data)) {
                toast.warning(`Genres are empty, all the movie will be presented`);

                const moviesListResponse = await axios.get<MoviesListResponse>(BASE_URL, { params: { movieSubstring: movieInput } });
                const data = moviesListResponse.data;

                setMovies(data.data)

                return;
            }

            setMoviesByGenres(data.data)

        } catch (error: unknown) {
            toast.error('Something went wrong');
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }


    return {
        error,
        handleChangeInput,
        handleChangeSelectedGenre,
        handleChangeSelectedMovie,
        handleGetData,
        selectedMovie,
        selectedGenre,
        isLoading,
        movieInput,
        moviesByGenres,
        movies
    }
}