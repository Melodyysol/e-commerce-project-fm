import { FcNext, FcPrevious } from "react-icons/fc";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import product1 from "../assets/images/image-product-1.jpg";
import product2 from "../assets/images/image-product-2.jpg";
import product3 from "../assets/images/image-product-3.jpg";
import product4 from "../assets/images/image-product-4.jpg";
import thumbnail1 from "../assets/images/image-product-1-thumbnail.jpg";
import thumbnail2 from "../assets/images/image-product-2-thumbnail.jpg";
import thumbnail3 from "../assets/images/image-product-3-thumbnail.jpg";
import thumbnail4 from "../assets/images/image-product-4-thumbnail.jpg";
import { useShow } from "../custom-hooks/useShow";

const items: { id: number; images: string[]; thumbnails: string[] }[] = [
  {
    id: 1,
    images: [product1, product2, product3, product4],
    thumbnails: [thumbnail1, thumbnail2, thumbnail3, thumbnail4],
  },
];

export const ProductImage = () => {
  const [currentImage, setCurrentImage] = useState(1);
  const { showModal, toggleShow } = useShow();

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        <motion.img
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 40 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          key={currentImage}
          src={items[0].images[currentImage <= 1 ? 0 : currentImage - 1]}
          alt={`product-${currentImage}`}
          className={`${showModal ? "md:w-100" : "md:w-[20rem]"} object-cover md:rounded-md md:cursor-pointer`}
          onClick={() => toggleShow("modal")}
        />
      </AnimatePresence>
      <div className="hidden md:flex mt-5 w-[20rem] mx-auto justify-between">
        {items.map((item) =>
          item.thumbnails.map((thumbnail, index) => (
            <img
              onClick={() => setCurrentImage(index + 1)}
              key={index}
              src={thumbnail}
              alt={thumbnail}
              className={`rounded-md w-16 cursor-pointer hover:opacity-50  ${currentImage === index + 1 ? "opacity-30 border-2 border-accent" : ""}`}
            />
          )),
        )}
      </div>
      <button
        onClick={() => setCurrentImage((prev) => prev - 1)}
        disabled={currentImage <= 1}
        className={`${showModal ? "md:-left-4 left-4" : "left-4"} disabled:cursor-not-allowed disabled:opacity-50 absolute top-[35%] bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70`}
      >
        <FcPrevious />
      </button>
      <button
        onClick={() => setCurrentImage((prev) => prev + 1)}
        disabled={currentImage >= items[0].images.length}
        className={`${showModal ? "md:-right-4 right-4" : "right-4"} disabled:cursor-not-allowed disabled:opacity-50 absolute top-[35%]  bg-base-100 rounded-full p-2 cursor-pointer hover:opacity-70`}
      >
        <FcNext />
      </button>
    </div>
  );
};
