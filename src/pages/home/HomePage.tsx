import Header from "../../components/Header";
import { SearchProduct } from "./components/SearchProduct";
import Toast from "../../components/Toast";
import { RenderProduct } from "./components/RenderProduct";
import { useToast } from "../../custom-hooks/useToast";

export const HomePage = () => {
  const toastContext = useToast()
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
