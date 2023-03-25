import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { FC } from "react";
import { Book } from "../types/book";

interface IBookProps {
  books: Book[];
}

const ResultBlock: FC<IBookProps> = ({ books }) => {
  return (
    <div>
      {books &&
        books.map((book) => (
          <Card sx={{ mt: 5 }}>
            <CardHeader
              title={book.title}
              subheader={book.authors}
            ></CardHeader>
            <CardMedia image={book.coverImage} title="Contemplative Reptile" />
            <CardContent>
              <Typography>
                {" "}
                By: {book.categories.length > 0 ? book.categories[0] : null}
              </Typography>
            </CardContent>
          </Card>
        ))}
    </div>
  );
};

export default ResultBlock;
