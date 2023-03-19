import { Alert, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { FC } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  text: string;
};

const SearchBlock: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  return (
    <div>
      <form>
        <TextField
          {...register("text", { required: true })}
          placeholder="Введите ваш комментарий"
        />
        {errors.text && <Alert severity="error">Введите название книги</Alert>}
        <Button variant="contained" color="primary" type="submit">
          {" "}
          Поиск
        </Button>
      </form>
    </div>
  );
};

export default SearchBlock;
