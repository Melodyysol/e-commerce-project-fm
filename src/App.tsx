import { Route, Routes } from "react-router";
import { ProductItem } from "./pages/product/ProductItem";
import { Login } from "./form/Login";
import { Register } from "./form/Register";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import { HomePage } from "./pages/home/HomePage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/productItem/:id" element={<ProductItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
