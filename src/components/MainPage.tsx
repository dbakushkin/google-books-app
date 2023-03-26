import { Button, CircularProgress } from "@mui/material";
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
      <SearchBlock />
      {loading && <CircularProgress />}
      {totalItems && <h5>Found {totalItems} results</h5>}
      <ResultBlock books={books} />
      {areThereMore && (
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          fullWidth
          onClick={handleLoadMore}
        >
          {" "}
          Загрузить ещё
        </Button>
      )}
    </div>
  );
};

export default MainPage;
