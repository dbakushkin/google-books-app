import { FormControl, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { ChangeEventHandler, FC } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  changeQueryTerm,
  changeCategory,
  fetchBooks,
  changeOrder,
} from "../features/books/booksSlice";
import SortBlock from "./SortBlock";

const SearchBlock: FC = () => {
  const dispatch = useAppDispatch();
  const { category, order, queryTerm } = useAppSelector((state) => state.books);

  const handleFormSubmit: any = (event: any) => {
    event.preventDefault();
    dispatch(fetchBooks());
  };

  const handleQueryTermChange: ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    dispatch(changeQueryTerm(event.target.value));
  };

  const handleCategoryChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(changeCategory(event.target.value));
    if (queryTerm) {
      dispatch(fetchBooks());
    }
  };

  const handleSortMethodChange: ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    dispatch(changeOrder(event.target.value));
    if (queryTerm) {
      dispatch(fetchBooks());
    }
  };

  return (
    <div>
      <FormControl onSubmit={handleFormSubmit} fullWidth>
        <TextField
          value={queryTerm}
          onChange={handleQueryTermChange}
          placeholder="Введите ваш запрос"
        />
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Поиск
        </Button>
      </FormControl>
      <SortBlock
        handleCategoryChange={handleCategoryChange}
        handleSortMethodChange={handleSortMethodChange}
        category={category}
        sortMethod={order}
      />
    </div>
  );
};

export default SearchBlock;
