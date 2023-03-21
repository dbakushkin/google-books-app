import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import Button from "@mui/material/Button";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { getBooks } from "../features/books/booksSlice";
import SortBlock from "./SortBlock";

type FormData = {
  text: string;
};

const;

const SearchBlock: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onFormSubmit = handleSubmit((data) => {
    console.log(data);
    getBooks(data);
    reset();
  });

  const [category, setCategory] = useState("");

  const [sortMethod, setSortMethod] = useState("");
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
  };

  const handleSortMethodChange = (event: SelectChangeEvent) => {
    setSortMethod(event.target.value);
  };

  return (
    <div>
      <FormControl onSubmit={onFormSubmit} fullWidth>
        <TextField
          {...register("text", { required: true })}
          placeholder="Введите ваш комментарий"
        />
        {errors.text && <Alert severity="error">Введите название книги</Alert>}
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Поиск
        </Button>
      </FormControl>
      <SortBlock
        handleCategoryChange={() => handleCategoryChange}
        handleSortMethodChange={() => handleSortMethodChange}
        category={category}
        sortMethod={sortMethod}
      />
    </div>
  );
};

export default SearchBlock;
