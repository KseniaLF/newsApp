import axios from "axios";
import { toast } from "react-hot-toast";

const NEWSAPI_KEY = import.meta.env.VITE_NEWSAPI_KEY;

export const getNews = async (page: number) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=cars+red+black+green+yellow&pageSize=10&page=${page}&sortBy=popularity&apiKey=${NEWSAPI_KEY}`
    );

    return response.data;
  } catch (e) {
    toast.error("Something went wrong. Try again.");
  }
};
