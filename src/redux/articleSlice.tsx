import { createSlice } from "@reduxjs/toolkit";
import { fetchNews } from "./operations";
import { RootState } from "./store";

export type Article = {
  url: string;
  urlToImage: string | null;
  title: string;
  description: string | null;
};

type NewsState = {
  articles: Article[];
  totalResults: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: NewsState = {
  articles: [],
  totalResults: 0,
  isLoading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.articles = [...state.articles, ...action.payload.articles];

        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const newsReducer = newsSlice.reducer;

export const getNews = (state: RootState) => state.news.articles;

export const getTotalResults = (state: RootState) => state.news.totalResults;

export const getIsLoading = (state: RootState) => state.news.isLoading;
