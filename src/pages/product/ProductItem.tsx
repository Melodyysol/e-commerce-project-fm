import { useEffect } from "react";
import Header from "../../components/Header";
import { RenderProductItem } from "./component/RenderProductItem";
import { Modal } from "./component/Modal";
import { useShow } from "../../custom-hooks/useShow";

export const ProductItem = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const { showModal } = useShow();

  return (
    <main>
      {showModal && <Modal />}
      <Header />
      <RenderProductItem />
    </main>
  );
};
