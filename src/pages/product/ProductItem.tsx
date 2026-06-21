import { useEffect } from "react";
import Header from "../../components/Header";
import { RenderProductItem } from "./component/RenderProductItem";
import { Modal } from "./component/Modal";
import { useShow } from "../../custom-hooks/useShow";
import { useToast } from "../../custom-hooks/useToast";
import Toast from "../../components/Toast";

export const ProductItem = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  const { showModal } = useShow();
  const toastContext = useToast();

  return (
    <main>
      {showModal && <Modal />}
      <Header />
      <RenderProductItem />
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
