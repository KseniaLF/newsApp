import { Link } from "react-router-dom";
import { Article } from "../redux/articleSlice";

export const NewsList = ({ articles }: { articles: Article[] }) => {
  return (
    <ul className="max-w-[500px] md:max-w-[800px] my-8 grid grid-cols-1 md:grid-cols-2 gap-6 justify-center">
      {articles.map((article) => (
        <Link to={"/article"} state={{ from: "/" }} key={article.url}>
          <li className="flex flex-col items-center gap-2 bg-stone-100 p-4 rounded-md">
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
        </Link>
      ))}
    </ul>
  );
};
