import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./contexts/AuthContext.tsx";
import ToastProvider from "./contexts/ToastContext.tsx";
import { ShowProvider } from "./contexts/ShowContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <ShowProvider>
            <App />
          </ShowProvider>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
