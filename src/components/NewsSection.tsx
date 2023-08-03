import { useEffect, useState } from "react";
import { getNews } from "../services/newsAPI";
import { NewsList } from "./NewsList";
import { useAppDispatch } from "../redux/store";
import { fetchNews } from "../redux/operations";
import { getIsLoading, getTotalResults } from "../redux/articleSlice";
import { useSelector } from "react-redux";

interface Article {
  url: string;
  urlToImage: string | null;
  title: string;
  description: string | null;
}

export const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [filterValue, setFilterValue] = useState("");

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  const dispatch = useAppDispatch();
  const totalResults = useSelector(getTotalResults);
  const isLoading = useSelector(getIsLoading);

  useEffect(() => {
    const fetchData = async () => {
      if (page === 1) dispatch(fetchNews(1));
      else dispatch(fetchNews(page));
    };

    fetchData();
  }, [dispatch, page]);

  useEffect(() => {
    const value =
      filterValue !== ""
        ? articles.filter((article) =>
            article.title.toLowerCase().includes(filterValue.toLowerCase())
          )
        : articles;

    setFilteredArticles(value);
  }, [articles, filterValue]);

  return (
    <section className="text-center mt-4">
      <input
        type="text"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
        placeholder="search..."
        className=" border-b-2 focus:px-4 p-2 text-[15px] border-yellow-800 focus:outline-none ease-in duration-300"
      />

      <NewsList />

      {!isLoading && filteredArticles.length === 0 && (
        <p>There are no articles here 💔</p>
      )}

      {isLoading && <p className="p-6 my-12 text-lg">loader</p>}

      {!isLoading &&
        totalResults !== null &&
        articles.length < totalResults && (
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="py-4 px-8 bg-yellow-800 hover:bg-yellow-700 text-white rounded-lg my-12 text-lg ease-in duration-200"
          >
            Load more
          </button>
        )}
    </section>
  );
};
