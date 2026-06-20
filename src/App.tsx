import { Route, Routes } from "react-router";
import { ProductItem } from "./pages/product/ProductItem";
import { Login } from "./form/Login";
import { Register } from "./form/Register";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";
import { HomePage } from "./pages/home/HomePage";
import { AboutPage } from "./pages/AboutPage";
import { ContactPage } from "./pages/ContactPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/productItem/:id" element={<ProductItem />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFoundPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
}

export default App;
