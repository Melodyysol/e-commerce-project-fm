import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router";
import AuthProvider from "./contexts/AuthContext.tsx";
import ToastProvider from "./contexts/ToastContext.tsx";
import { ShowProvider } from "./contexts/ShowContext.tsx";
import { CartProvider } from "./contexts/CartContext.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import CategoryProvider from "./contexts/CategoryContext.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AuthProvider>
            <ToastProvider>
              <ShowProvider>
                <CategoryProvider>
                  <App />
                </CategoryProvider>
              </ShowProvider>
            </ToastProvider>
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
