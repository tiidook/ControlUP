import { renderHook, act, waitFor } from '@testing-library/react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useMovieData } from '../useMoviesData';

jest.mock('react-toastify', () => ({
    toast: {
        warning: jest.fn(),
        error: jest.fn(),
    }
}));

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('useMovieData hook', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('handleChangeInput sets error when input is empty', () => {
        const { result } = renderHook(() => useMovieData());

        act(() => {
            result.current.handleChangeInput('');
        });

        expect(result.current.error).toBe(true);

        act(() => {
            result.current.handleChangeInput('some text');
        });

        expect(result.current.error).toBe(false);
    });

    test('handleGetData fetches grouped movies and updates state', async () => {
        const { result } = renderHook(() => useMovieData());

        act(() => {
            result.current.handleChangeInput('Matrix');
        });

        mockedAxios.get.mockResolvedValueOnce({
            data: { data: { Action: [{ id: 1, title: 'Matrix' }] } },
        });

        act(() => {
            result.current.handleGetData();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(mockedAxios.get).toHaveBeenCalledWith(
            expect.anything(),
            expect.objectContaining({
                params: expect.objectContaining({ movieSubstring: 'Matrix', groupByGenre: true }),
            })
        );

        expect(result.current.moviesByGenres).toEqual({
            Action: [{ id: 1, title: 'Matrix' }],
        });
    });

    test('handleGetData shows warning and fetches plain movies when grouped response is empty', async () => {
        const { result } = renderHook(() => useMovieData());

        act(() => {
            result.current.handleChangeInput('Matrix');
        });

        mockedAxios.get.mockResolvedValueOnce({
            data: {},
        });

        act(() => {
            result.current.handleGetData();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(toast.warning).toHaveBeenCalledWith(
            'Genres are empty, all the movie will be presented'
        );
    });

    test('handleGetData handles errors propertly', async () => {
        const { result } = renderHook(() => useMovieData());

        act(() => {
            result.current.handleChangeInput('Matrix');
        });

        mockedAxios.get.mockRejectedValueOnce(new Error('Network error'));

        act(() => {
            result.current.handleGetData();
        });

        await waitFor(() => expect(result.current.isLoading).toBe(false));

        expect(toast.error).toHaveBeenCalledWith('Something went wrong');
    });
});
