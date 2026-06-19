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

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <AuthProvider>
            <ToastProvider>
              <ShowProvider>
                <App />
              </ShowProvider>
            </ToastProvider>
          </AuthProvider>
        </CartProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
);
