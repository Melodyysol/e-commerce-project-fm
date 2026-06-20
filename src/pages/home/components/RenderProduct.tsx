import { useNavigate } from "react-router";
import { useCart } from "../../../custom-hooks/useCart";
// import { useToast } from "../../../custom-hooks/useToast";
import type { Product } from "../../../schemas/productSchema";
import { useToast } from "../../../custom-hooks/useToast";
import { Loading } from "../../Loading";

export const RenderProduct = ({
  products,
  isError,
  isLoading,
  error,
}: {
  products: Product[];
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
}) => {
  const navigate = useNavigate();

  const { addToBag } = useCart();

  const toastContext = useToast();

  if (isError) {
    const newToast = {
      id: crypto.randomUUID(),
      message: error?.message || "Uncaugth error occurred",
    };
    toastContext.dispatch({ type: "error", payload: newToast });
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="w-10/12 md:w-11/12 mx-auto py-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:pt-12 pt-10 gap-4">
        {products.length === 0 && <p>No Product.</p>}

        {products.map((product) => (
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
        ))}
      </div>
    </section>
  );
};
