import CloseIcon from "../../../assets/icons/icon-close.svg";
import { ProductImage } from "../../../components/ProductImage";
import { useShow } from "../../../custom-hooks/useShow";

export const Modal = () => {
  const { toggleShow } = useShow();
  return (
    <section className="fixed z-50 inset-0 bg-neutral-600/50 hidden md:flex justify-center items-center">
      <div className="relative">
        <button
          onClick={() => toggleShow("modal")}
          className="absolute -top-10 right-0 text-3xl hover:text-accent cursor-pointer"
        >
          <img src={CloseIcon} alt="close icon" className="hover:text-accent" />
        </button>
        <ProductImage isModal={true} />
      </div>
    </section>
  );
};
