import { CircularProgress } from "@mui/material";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loadMore } from "../features/books/booksSlice";
import ResultBlock from "./ResultBlock";
import SearchBlock from "./SearchBlock";

const MainPage: FC = () => {
  const dispatch = useAppDispatch();
  const {
    loading,
    items: books,
    totalItems,
    areThereMore,
  } = useAppSelector((state) => state.books);

  const handleLoadMore = () => {
    dispatch(loadMore());
  };

  return (
    <div>
      {totalItems !== undefined && <h5>Found {totalItems} results</h5>}
      <SearchBlock />
      {loading && <CircularProgress />}
      <ResultBlock books={books} />
      {areThereMore && <button onClick={handleLoadMore}> Загрузить ещё</button>}
    </div>
  );
};

export default MainPage;
