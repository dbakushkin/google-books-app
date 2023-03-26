import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardMedia,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";
import { Book } from "../types/book";

interface IBookProps {
  books: Book[];
}

const ResultBlock: FC<IBookProps> = ({ books }) => {
  return (
    <div>
      {books &&
        books.map((book) => (
          <Link
            to={`/book/${book.id}`}
            key={book.id}
            style={{ textDecoration: "none" }}
          >
            <Card
              key={book.id}
              sx={{
                mt: 5,
              }}
            >
              <CardHeader
                title={book.title}
                subheader={book.authors.join(", ")}
                sx={{
                  display: "flex",

                  alignItems: "center",
                }}
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
                  Category:{" "}
                  {book.categories.length > 0 ? book.categories[0] : null}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
    </div>
  );
};

export default ResultBlock;
