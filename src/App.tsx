import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BookItem from "./components/BookItem";
import MainPage from "./components/MainPage";

function App() {
  return (
    <Container maxWidth="sm">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/book/:id" element={<BookItem />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
