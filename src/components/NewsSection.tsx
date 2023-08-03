import { useEffect, useState } from "react";
import { NewsList } from "./NewsList";
import { useAppDispatch } from "../redux/store";
import { fetchNews } from "../redux/operations";
import {
  Article,
  getIsLoading,
  getNews,
  getTotalResults,
} from "../redux/articleSlice";
import { useSelector } from "react-redux";
import { getFilterValue } from "../redux/filterSlice";
import { FilterBox } from "./FilterBox";

const getFilteredNews = (articles: Article[], filterValue: string) => {
  return filterValue !== ""
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(filterValue.toLowerCase())
      )
    : articles;
};

export const NewsSection = () => {
  const dispatch = useAppDispatch();
  const totalResults = useSelector(getTotalResults);
  const isLoading = useSelector(getIsLoading);

  const articles = useSelector(getNews);
  const filterValue = useSelector(getFilterValue);
  const filteredArticles = getFilteredNews(articles, filterValue);

  const [page, setPage] = useState<number>(1);
  useEffect(() => {
    dispatch(fetchNews(page));
  }, [dispatch, page]);

  return (
    <section className="text-center mt-4">
      <FilterBox />

      <NewsList articles={filteredArticles} />

      {!isLoading && filteredArticles.length === 0 && (
        <p>There are no articles here 💔</p>
      )}

      {isLoading && <p className="p-8 my-12 text-lg">loader</p>}

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
