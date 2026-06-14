import { useEffect } from "react";
import Header from "../../components/Header";
import { ProductItem } from "./component/ProductItem";

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <Header />
      <ProductItem />
    </main>
  );
};
