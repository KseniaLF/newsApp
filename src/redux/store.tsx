import { configureStore } from "@reduxjs/toolkit";
import { newsReducer } from "./articleSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    news: newsReducer,
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
};

// export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
