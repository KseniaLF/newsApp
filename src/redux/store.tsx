import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./articleSlice";
import { useDispatch } from "react-redux";
import { filterReducer } from "./filterSlice";

export const store = configureStore({
  reducer: {
    news: newsReducer,
    filterValue: filterReducer,
  },
});

type Article = {
  url: string;
  urlToImage: string | null;
  title: string;
  description: string | null;
};

export type RootState = {
  news: {
    articles: Article[];
    totalResults: number;
    isLoading: boolean;
  };
  filterValue: string;
};

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
