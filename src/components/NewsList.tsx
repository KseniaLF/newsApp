import { useEffect, useState } from "react";
import { getNews } from "../services/newsAPI";

interface Article {
  author: string;
  title: string;
  url: string;
  urlToImage: string;
  description: string;
}

export const NewsList = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalResults, setTotalResults] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

  return (
    <div className="text-center">
      <ul className="max-w-[500px] md:max-w-[800px] my-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        {articles.map((article) => (
          <li
            key={article.url}
            className="flex flex-col items-center gap-2 bg-stone-100 p-4 rounded-md"
          >
            <img
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "https://storage.googleapis.com/proudcity/mebanenc/uploads/2021/03/placeholder-image.png"
              }
              className="rounded-md max-h-[180px] object-cover"
              alt="article image"
              width={300}
              height={180}
            />

            <p className="text-center hide-text">{article.title}</p>

            <p className="hide-text">
              {article.description ? article.description : "No description"}
            </p>
          </li>
        ))}
      </ul>

      {!isLoading &&
        totalResults !== null &&
        articles.length < totalResults && (
          <button
            type="button"
            onClick={() => setPage((prev) => prev + 1)}
            className="py-4 px-6 bg-yellow-800 text-white rounded-lg my-12"
          >
            Load more
          </button>
        )}

      {isLoading && <span className="p-6 my-12">LOADER</span>}

      {!isLoading && articles.length === 0 && (
        <p>There are no articles here 💔</p>
      )}
    </div>
  );
};
