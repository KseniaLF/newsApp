import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (page: number) => {
    try {
      const response = await axios.get(
        `https://newsapi.org/v2/everything?q=news&pageSize=2&page=${page}&sortBy=popularity&apiKey=${NEWSAPI_KEY}`
      );

      return response.data;
    } catch (e) {
      toast.error("Something went wrong. Try again.");
      throw e;
    }
  }
);
