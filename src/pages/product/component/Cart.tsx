import { BiTrash } from "react-icons/bi";
import thumbnail1 from "../../../assets/images/image-product-1-thumbnail.jpg";
import { motion, AnimatePresence } from "motion/react";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../../../services/fetchCart";
import { useToast } from "../../../custom-hooks/useToast";
import { useCart } from "../../../custom-hooks/useCart";

export const Cart = () => {
  const toastContext = useToast();
  const { removeFromCart } = useCart();

  const {
    data: carts = [],
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  });

  if (isError) {
    const newToast = {
      id: crypto.randomUUID(),
      message: error.message,
    };
    toastContext.dispatch({ type: "error", payload: newToast });
    return;
  }

  return (
    <section className="absolute z-30 w-screen top-15 flex justify-center md:justify-end md:right-5">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="bg-base-200 rounded-md w-11/12 py-5 flex flex-col gap-5 shadow-2xl md:w-84"
        >
          <div className="w-10/12 mx-auto">
            <h1 className="font-extrabold">Cart</h1>
          </div>

          <hr className="border-base-300" />
          {isLoading && (
            <div className="text-center py-10">
              <p>Loading...</p>
            </div>
          )}
          {!isLoading && carts.length === 0 ? (
            <div className="text-center py-10">
              <p>Your cart is empty</p>
            </div>
          ) : (
            carts.map((cart) => (
              <>
                <article className="flex justify-between w-10/12 mx-auto items-center">
                  <div>
                    <img
                      src={thumbnail1}
                      alt="img-1"
                      className="rounded-md w-12 object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="capitalize text-neutral-content text-sm">
                      Fall limited edition sneakers
                    </h4>
                    <p className="text-sm mt-1 text-neutral-content">
                      $125.00 * ${cart.quantity}{" "}
                      <span className="font-extrabold text-base-content ml-2">
                        $375.00
                      </span>
                    </p>
                  </div>
                  <BiTrash
                    onClick={() => removeFromCart(cart.product_id)}
                    className="hover:opacity-50 cursor-pointer tooltip tooltip-bottom"
                    data-tip="Delete"
                  />
                </article>
                <div className="w-10/12 mx-auto">
                  <button className="btn btn-accent btn-block">Checkout</button>
                </div>
              </>
            ))
          )}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};
