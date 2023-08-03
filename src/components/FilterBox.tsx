import { setFilterValue } from "../redux/filterSlice";
import { useAppDispatch } from "../redux/store";

export const FilterBox = () => {
  const dispatch = useAppDispatch();

  return (
    <input
      type="text"
      onChange={(e) => {
        dispatch(setFilterValue(e.target.value));
      }}
      placeholder="search..."
      className=" border-b-2 focus:px-4 p-2 text-[15px] border-yellow-800 focus:outline-none ease-in duration-300"
    />
  );
};
