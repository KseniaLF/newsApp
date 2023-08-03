import { useEffect, useState } from "react";
import { fetchNews } from "../redux/operations";
import { useAppDispatch } from "../redux/store";

export const LoadMoreButton = () => {
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    dispatch(fetchNews(page));
  }, [dispatch, page]);

  return (
    <button
      type="button"
      onClick={() => setPage((prev) => prev + 1)}
      className="py-4 px-8 bg-yellow-800 hover:bg-yellow-700 text-white rounded-lg my-12 text-lg ease-in duration-200"
    >
      Load more
    </button>
  );
};
