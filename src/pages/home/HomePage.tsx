import Header from "../../components/Header";
import { SearchProduct } from "./components/SearchProduct";
import Toast from "../../components/Toast";
import { RenderProduct } from "./components/RenderProduct";
import { useToast } from "../../custom-hooks/useToast";
import { fetchProduct } from "../../services/fetchProduct";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useCategory } from "../../custom-hooks/useCategory";

export const HomePage = () => {
  const toastContext = useToast();
  const [search, setSearch] = useState("");
  const { category } = useCategory();

  const {
    data: products = [],
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["product", search],
    queryFn: () => fetchProduct(search),
    throwOnError: false,
  });

  let filteredProduct = [...products];

  filteredProduct = filteredProduct.filter((product) =>
    category === "collections" ? product : category === product.category,
  );

  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <Header />
      <SearchProduct setSearch={setSearch} />
      <RenderProduct
        products={filteredProduct}
        isError={isError}
        isLoading={isLoading}
        error={error}
      />
      <div className=" gap-4 flex flex-col fixed top-5 left-0 right-0 pointer-events-none">
        {toastContext.toasts.map((toast) => (
          <Toast
            key={toast.id}
            message={toast.message}
            type={toast.type}
            onClose={() => {
              toastContext.dispatch({
                type: "removeToast",
                payload: { id: toast.id },
              });
            }}
          />
        ))}
      </div>
    </main>
  );
};
