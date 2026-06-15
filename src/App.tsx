import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { Login } from "./form/Login";
import { Register } from "./form/Register";
import "./App.css";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
