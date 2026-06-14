import { BiCart, BiMinus, BiPlus } from "react-icons/bi";
import product1 from "../../../assets/images/image-product-1-thumbnail.jpg";
import { FcNext, FcPrevious } from "react-icons/fc";

export const ProductItem = () => {
  return (
    <div className="flex flex-col gap-4 md:mt-20 md:flex-row md:w-10/12 md:mx-auto md:justify-center md:items-center md:gap-10">
      <div className="relative">
        <img
          src={product1}
          alt="product-1"
          className="w-full h-50 object-cover md:rounded-md md:w-[20rem] md:h-72"
        />
        <div className="hidden md:flex mt-5 w-[20rem] justify-between">
          {Array.from({ length: 4 }, (_, i) => i + 1).map((_, index) => (
            <img
              key={index}
              src={product1}
              alt=""
              className="rounded-md w-16 cursor-pointer hover:opacity-50 border-2 border-accent opacity-30"
            />
          ))}
        </div>
        <button className="md:hidden absolute top-[50%] left-4 bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70">
          <FcPrevious />
        </button>
        <button className="md:hidden absolute top-[50%] right-4 bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70">
          <FcNext />
        </button>
      </div>
      <div>
        <div className="w-10/12 mx-auto mb-5 md:max-w-96">
          <span className="text-neutral-content text-xs font-bold">
            SNEAKER COMPANY
          </span>
          <h2 className="font-extrabold text-xl md:text-2xl">
            Fall Limited Edition Sneakers
          </h2>
          <p className="text-xs leading-loose">
            Thes low-profile sneakers are your perfect casual wear companion.
            Featuring a durable rubber outer sole, they'll withstand everything
            the weather can offer.
          </p>
        </div>
        <div className="w-10/12 mx-auto flex flex-col gap-4">
          <div className="flex items-center justify-between md:flex-col md:items-start md:gap-2">
            <div>
              <span className="text-xl font-extrabold">$125.00</span>
              <span className="bg-neutral text-neutral-content py-1 px-2 rounded-md text-xs ml-3">
                50%
              </span>
            </div>

            <del className="text-xs">$250.00</del>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-base-200 rounded-md py-2 px-4 flex justify-between">
              <button className="text-2xl text-accent cursor-pointer">
                <BiMinus />
              </button>
              <span>0</span>
              <button className="text-2xl text-accent cursor-pointer">
                <BiPlus />
              </button>
            </div>
            <button type="button" className="btn btn-accent btn-block">
              <BiCart />
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
