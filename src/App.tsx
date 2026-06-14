import { Route, Routes } from "react-router";
import { HomePage } from "./pages/home/HomePage";
import { Login } from "./form/Login";
import { Register } from "./form/Register";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
