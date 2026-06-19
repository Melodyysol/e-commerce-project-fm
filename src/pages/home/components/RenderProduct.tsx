import { useNavigate } from "react-router";
import { fetchProduct } from "../../../services/fetchProduct";
import { useQuery } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import { ToastContext } from "../../../hooks/useToast";
import { Loading } from "../../Loading";
import { useCart } from "../../../custom-hooks/useCart";

export const RenderProduct = () => {
  const navigate = useNavigate();

  const toastContext = useContext(ToastContext);
  if (!toastContext) {
    throw new Error("toastContext must be used within the ToastProvider");
  }

  const { addToBag } = useCart();

  const {
    data: products,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProduct,
  });

  useEffect(() => {
    if (isError) {
      const newToast = {
        id: crypto.randomUUID(),
        message: error.message || "Uncaught error",
      };

      toastContext.dispatch({
        type: "error",
        payload: newToast,
      });
      throw error;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, error]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-10/12 md:w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:pt-12 pt-10 gap-4">
        {products ? (
          products.map((product) => (
            <article
              key={product.id}
              className="shadow hover:shadow-2xl cursor-pointer md:h-110"
            >
              <div>
                <img
                  src={product.image}
                  alt={product.description}
                  className="w-full object-cover rounded-md h-52 md:h-64"
                />
              </div>
              <div className="p-4 h-full flex flex-col ">
                <h2 className="font-extrabold text-2xl ">{product.name}</h2>
                <p>{product.description}</p>
                <div className="flex items-center w-full justify-between pt-5">
                  <button
                    onClick={() => navigate(`/productItem/${product.id}`)}
                    className="btn btn-secondary capitalize"
                  >
                    Details
                  </button>
                  <button
                    onClick={() => addToBag(product.id)}
                    className="btn btn-accent capitalize"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))
        ) : (
          <p>No Content Try Again Later</p>
        )}
      </div>
    </section>
  );
};
