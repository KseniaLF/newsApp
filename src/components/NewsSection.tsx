import { NewsList } from "./NewsList";
import {
  Article,
  getIsLoading,
  getNews,
  getTotalResults,
} from "../redux/articleSlice";
import { useSelector } from "react-redux";
import { getFilterValue } from "../redux/filterSlice";
import { FilterBox } from "./FilterBox";
import { LoadMoreButton } from "./LoadMoreButton";

const getFilteredNews = (articles: Article[], filterValue: string) => {
  return filterValue !== ""
    ? articles.filter((article) =>
        article.title.toLowerCase().includes(filterValue.toLowerCase())
      )
    : articles;
};

export const NewsSection = () => {
  const totalResults = useSelector(getTotalResults);
  const isLoading = useSelector(getIsLoading);

  const articles = useSelector(getNews);
  const filterValue = useSelector(getFilterValue);
  const filteredArticles = getFilteredNews(articles, filterValue);

  return (
    <section className="text-center mt-4">
      <FilterBox />

      <NewsList articles={filteredArticles} />

      {!isLoading && filteredArticles.length === 0 && (
        <p>There are no articles here 💔</p>
      )}

      {isLoading && <p className="p-6 my-12 text-lg">loader</p>}

      {!isLoading &&
        totalResults !== null &&
        articles.length < totalResults && <LoadMoreButton />}
    </section>
  );
};
