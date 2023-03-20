import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import api from "../../helpers/api";

const initialState = {
  books: [],
};

export const getBooks = createAsyncThunk("chats/getBooks", async () => {
  const response = await api.get("/books");
  return response.data;
});

export const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBooks.fulfilled, (state: any, action: PayloadAction) => {
      state.books = action.payload;
    });
  },
});

export const booksChats = (state: any) => state.books;

export default booksSlice.reducer;
