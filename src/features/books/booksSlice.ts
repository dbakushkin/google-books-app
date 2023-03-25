import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  Book,
  BooksState,
  FetchBooksItem,
  FetchBooksResponse,
} from "../../types/book";

const maxLength = 30;

const initialState: BooksState = {
  loading: false,
  items: [],
  error: null,
  areThereMore: false,
  category: "",
  order: "relevance",
  queryTerm: "",
  startIndex: 0,
};

export const fetchBooks = createAsyncThunk<
  FetchBooksResponse,
  void,
  { state: RootState }
>("books/fetch", async (_, { getState }) => {
  return fetchBooksHelper(getState);
});

export const loadMore = createAsyncThunk<
  FetchBooksResponse,
  void,
  { state: RootState }
>("books/loadMore", async (_, { getState }) => {
  return fetchBooksHelper(getState);
});

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    changeOrder: (state, action: PayloadAction<string>) => {
      state.order = action.payload;
    },
    changeQueryTerm: (state, action: PayloadAction<string>) => {
      state.queryTerm = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.startIndex = 0;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.totalItems = action.payload.totalItems;
        if (action.payload.items) {
          state.items = action.payload.items.map(mapResponseToBook);
          state.areThereMore = state.totalItems > state.items.length;
        } else {
          state.items = [];
        }
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      })
      .addCase(loadMore.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.startIndex += maxLength;
      })
      .addCase(loadMore.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload.items) {
          const newBooks = action.payload.items.map(mapResponseToBook);
          if (state.items) {
            state.items.push(...newBooks);
          }
        }
        if (!action.payload.items) {
          state.areThereMore = false;
        }
      })
      .addCase(loadMore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "";
      });
  },
});

export const { changeCategory, changeOrder, changeQueryTerm } =
  booksSlice.actions;

export default booksSlice.reducer;

const mapResponseToBook = (book: FetchBooksItem): Book => {
  return {
    id: book.id,
    title: book.volumeInfo.title,
    description: book.volumeInfo.description ?? "",
    authors: book.volumeInfo.authors ?? [],
    categories: book.volumeInfo.categories ?? [],
    coverImage: book.volumeInfo.imageLinks?.thumbnail ?? "",
  };
};

const fetchBooksHelper = async (getState: () => RootState) => {
  const state = getState();
  const { category, order, queryTerm, startIndex } = state.books;
  const url = getSearchUrl({ category, order, queryTerm, startIndex });
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.text();
    return Promise.reject(errorMessage);
  }

  return await response.json();
};

const getSearchUrl = ({
  category,
  order,
  queryTerm,
  startIndex,
}: {
  category: string;
  order: string;
  queryTerm: string;
  startIndex: number;
}) => {
  let query = queryTerm;
  if (category) {
    query += `+subject:${category}`;
  }

  const key = process.env.REACT_APP_API_KEY || "";

  const searchParams = new URLSearchParams({
    q: query,
    order,
    startIndex: String(startIndex),
    maxResults: String(maxLength),
    key,
  });

  const url = new URL("https://www.googleapis.com/books/v1/volumes");
  url.search = searchParams.toString();

  return url;
};
