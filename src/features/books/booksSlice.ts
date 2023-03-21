import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  books: [],
  currentBook: [],
};

export const getBooks = createAsyncThunk(
  "books/getBooks",
  async (
    title,
    category = "+subject:all",
    sort,
    startIndex = 0,
    maxResult = 30
  ) => {
    const response = await api.get(
      `volumes?q=${title}${category}&orderBy=${sort}&startIndex=${startIndex}&maxResults=${maxResult}&key=${REACT_APP_API_KEY}`
    );
    return response.data;
  }
);

export const getCurrentBook = createAsyncThunk(
  "news/getCurrentNews",
  async (id) => {
    const { data } = await api.get(`item/${id}.json`);

    return data;
  }
);

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state: any, action: PayloadAction) => {
      state.books = action.payload;
    });
    builder.addCase(getCurrentBook.fulfilled, (state, action) => {
      state.currentBook = action.payload;
    });
  },
});

export const booksChats = (state: any) => state.books;

export default booksSlice.reducer;
