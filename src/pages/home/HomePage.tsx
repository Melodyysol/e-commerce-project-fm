import { useContext } from "react";
import Header from "../../components/Header";
import { SearchProduct } from "./components/SearchProduct";
import { ToastContext } from "../../hooks/useToast";
import Toast from "../../components/Toast";
import { RenderProduct } from "./components/RenderProduct";

export const HomePage = () => {
  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("toastContext must be use within ToastPrivider");
  }
  return (
    <main>
      <Header />
      <SearchProduct />
      <RenderProduct />
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
