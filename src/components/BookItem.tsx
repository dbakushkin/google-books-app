import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

const BookItem: FC = () => {
  const { id } = useParams();
  const book = useAppSelector((state) =>
    state.books.items.find((book) => book.id === id)
  );
  return (
    <div>
      <Link to="/">
        <span>Back to books list</span>
      </Link>

      {book && (
        <Card
          key={book.id}
          sx={{
            mt: 5,
          }}
        >
          <CardHeader
            title={book.title}
            subheader={book.authors.join(", ")}
          ></CardHeader>
          {book.coverImage && (
            <CardMedia
              sx={{
                width: 150,
                height: 150,
              }}
              image={book.coverImage}
              title={book.title}
            />
          )}

          <CardContent>
            <Typography>
              {" "}
              <b>Category:</b> {book.categories.join(", ")}
            </Typography>
            <Typography>
              <b>Description :</b>
              {book.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BookItem;
