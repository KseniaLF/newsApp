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

  useEffect(() => {
    const fetchNews = async () => {
      const data = await getNews(page);

      if (data?.articles) {
        console.log(data.articles);

        if (page === 1) setArticles(data.articles);
        else setArticles((prev) => [...prev, ...data.articles]);
      }
    };

    fetchNews();
  }, [page]);

  return (
    <>
      <ul className="max-w-[500px] md:max-w-[800px] my-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
        {articles.map((article) => (
          <li
            key={article.url}
            className="flex flex-col items-center gap-2 bg-stone-100 p-4 rounded-md"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                className="rounded-md"
                alt="article image"
                width={300}
              />
            )}

            <p className="text-center">{article.title}</p>

            <p className="hide-text">{article.description}</p>
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => setPage((prev) => prev + 1)}>
        Load more
      </button>

      {articles.length === 0 && <p>There are no articles here 💔</p>}
    </>
  );
};
