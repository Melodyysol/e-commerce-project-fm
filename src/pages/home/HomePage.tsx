import { useEffect } from "react";
import Header from "../../components/Header";
import { ProductItem } from "./component/ProductItem";
import { Modal } from "./component/Modal";
import { useShow } from "../../custom-hooks/useShow";

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const { showModal } = useShow();

  return (
    <main>
      {showModal && <Modal />}
      <Header />
      <ProductItem />
    </main>
  );
};
