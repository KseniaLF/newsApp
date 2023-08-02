import { useEffect, useState } from "react";
import { getNews } from "../services/newsAPI";
import { NewsList } from "./NewsList";

interface Article {
  url: string;
  urlToImage: string | null;
  title: string;
  description: string | null;
}

export const NewsSection = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [filterValue, setFilterValue] = useState("");

  const [filteredArticles, setFilteredArticles] = useState<Article[]>(articles);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);

      const data = await getNews(page);

      if (data?.articles) {
        if (page === 1) {
          setArticles(data.articles);
          setTotalResults(data.totalResults);
        } else {
          setArticles((prev) => [...prev, ...data.articles]);
        }
      }

      setIsLoading(false);
    };

    fetchNews();
  }, [page]);

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
    <section className="text-center">
      <input
        type="text"
        onChange={(e) => {
          setFilterValue(e.target.value);
        }}
      />

      <NewsList articles={filteredArticles} />

      {!isLoading &&
        totalResults !== null &&
        articles.length < totalResults && (
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="py-4 px-6 bg-yellow-800 text-white rounded-lg my-12 text-lg"
          >
            Load more
          </button>
        )}

      {isLoading && <span className="p-6 my-12">loader</span>}

      {!isLoading && articles.length === 0 && (
        <p>There are no articles here 💔</p>
      )}
    </section>
  );
};
