import axios from "axios";

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;

export const getNews = async (page: number) => {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=cars&pageSize=10&page=${page}&sortBy=popularity&apiKey=${NEWSAPI_KEY}`
  );

  return response.data;
};
