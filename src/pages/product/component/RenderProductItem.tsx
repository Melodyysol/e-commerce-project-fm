import CartIcon from "../../../../public/icons/icon-cart.svg";
import MinusIcon from "../../../../public/icons/icon-minus.svg";
import PlusIcon from "../../../../public/icons/icon-plus.svg";

import { ProductImage } from "../../../components/ProductImage";
import { useParams } from "react-router";
import fetchProductItem from "../../../services/fetchProductItem";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Loading } from "../../Loading";
import { formatCurrency } from "../../../utilities/money";
import { useToast } from "../../../custom-hooks/useToast";
import { useCart } from "../../../custom-hooks/useCart";

export const RenderProductItem = () => {
  const itemId = useParams<{ id: string }>();

  const toastContext = useToast();
  const { addToBag } = useCart();

  const photoId = itemId.id!;

  const {
    data: item,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["item"],
    queryFn: () => fetchProductItem(photoId),
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
      return;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, isError]);

  if (!item) {
    return;
  }

  if (isLoading) {
    return <Loading />;
  }

  const discount = 50;
  const amountWithoutDiscount = item.price || 0;
  const totalAmountWithDiscount = (amountWithoutDiscount * discount) / 100;

  return (
    <div className="flex flex-col gap-4 md:mt-20 md:flex-row md:w-10/12 md:mx-auto md:justify-center md:items-center md:gap-10 w-88 mx-auto">
      <ProductImage isModal={false} image={item.image} />
      <div>
        <div className="w-10/12 mx-auto mb-5 md:max-w-96">
          <span className="text-neutral-content text-xs font-bold">
            {item.name}
          </span>
          <h2 className="font-extrabold text-xl md:text-2xl">
            {item.description}
          </h2>
          <p className="text-xs leading-loose">{item.description}</p>
        </div>
        <div className="w-10/12 mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2">
            <div>
              <span className="text-xl font-extrabold">
                {formatCurrency(totalAmountWithDiscount)}
              </span>
              <span className="bg-neutral text-neutral-content py-1 px-2 rounded-md text-xs ml-3">
                {discount}%
              </span>
            </div>

            <del className="text-xs">
              {formatCurrency(amountWithoutDiscount)}
            </del>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            <div className="bg-base-200 rounded-md py-2 px-4 flex justify-between">
              <button className="text-2xl text-accent cursor-pointer hover:opacity-70">
                <img src={MinusIcon} alt="minus icon" />
              </button>
              <span>0</span>
              <button className="text-2xl text-accent cursor-pointer hover:opacity-70">
                <img src={PlusIcon} alt="plus icon" />
              </button>
            </div>
            <button
              onClick={() => addToBag(item.id)}
              type="button"
              className="btn btn-accent btn-block"
            >
              <img src={CartIcon} alt="cart icon" />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
