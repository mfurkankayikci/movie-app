import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async ({
    searchTerm = "Pokemon",
    page = 1,
    year = "",
    type = "",
    id = "",
  }) => {
    const response = await axios.get(
      `http://www.omdbapi.com/?i=${id}&s=${searchTerm}&y=${year}&type=${type}&page=${page}&apikey=3e72ac2`
    );

    return response.data.Search || new Array(response.data);
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    isLoading: false,
    error: null,
    currentPage: 1,
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.isLoading = false;
        state.movies = action.payload;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setPage } = movieSlice.actions;

export default movieSlice.reducer;
