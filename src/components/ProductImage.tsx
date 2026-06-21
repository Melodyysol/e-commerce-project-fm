import NextIcon from "../assets/icons/icon-next.svg";
import PrevIcon from "../assets/icons/icon-previous.svg";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useShow } from "../custom-hooks/useShow";
import { useQuery } from "@tanstack/react-query";
import { fetchProduct } from "../services/fetchProduct";

export const ProductImage = ({
  isModal,
  image,
}: {
  isModal: boolean;
  image?: string;
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { showModal, toggleShow } = useShow();

  const { data: products = [], isLoading } = useQuery({
    queryKey: ["product"],
    queryFn: () => fetchProduct(""),
    throwOnError: false,
  });

  if (isLoading || products.length === 0) {
    return (
      <div className="animate-pulse bg-base-300 rounded-md h-64 w-full md:w-[20rem]" />
    );
  }

  const startProduct = products.findIndex((product) => product.image === image);
  const safeStart = startProduct === -1 ? 0 : startProduct;
  const endProduct = safeStart + 4;
  const items = products.slice(safeStart, endProduct);

  if (items.length === 0) return <p>No Item Found!</p>;

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.img
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          key={currentImageIndex}
          src={items[currentImageIndex].image}
          alt={`product-${currentImageIndex}`}
          className={`${showModal && isModal ? "md:w-100 h-96" : "md:w-[20rem] h-64 w-full"} object-cover md:rounded-md md:cursor-pointer`}
          onClick={() => !isModal && toggleShow("modal")}
        />
      </AnimatePresence>
      <div className="hidden md:flex mt-5 w-[20rem] mx-auto justify-between">
        {items.map((item, index) => (
          <img
            onClick={() => setCurrentImageIndex(index)}
            key={item.id || index}
            src={item.image}
            alt={item.name}
            className={`rounded-md w-16 h-16 object-cover cursor-pointer hover:opacity-50  ${currentImageIndex === index ? "opacity-30 border-2 border-accent" : ""}`}
          />
        ))}
      </div>
      <button
        onClick={() => setCurrentImageIndex((prev) => prev - 1)}
        disabled={currentImageIndex <= 0}
        className={`${showModal && isModal ? "md:-left-4" : "md:hidden"} left-4  disabled:cursor-not-allowed disabled:opacity-50 absolute top-[35%] bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70`}
      >
        <img src={PrevIcon} alt="previous icon" />
      </button>
      <button
        onClick={() => setCurrentImageIndex((prev) => prev + 1)}
        disabled={currentImageIndex >= items.length - 1}
        className={`${showModal && isModal ? "md:-right-4" : "md:hidden"} right-4 disabled:cursor-not-allowed disabled:opacity-50 absolute top-[35%]  bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70`}
      >
        <img src={NextIcon} alt="next icon" />
      </button>
    </div>
  );
};
