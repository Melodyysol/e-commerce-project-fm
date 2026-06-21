import { AnimatePresence, motion } from "motion/react";
import CloseIcon from "../assets/icons/icon-close.svg";
import { useCategory } from "../custom-hooks/useCategory";
import { categoryItem, pageItem } from "../utilities/category";
import { NavLink, useNavigate } from "react-router";

export const Sidebar = ({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const variants = {
    hidden: { opacity: 1, width: 0 },
    show: { opacity: 1, width: "100%" },
    exit: { opacity: 1, width: "100%" },
    staggerChildren: {
      beforeChildren: 0.3,
    },
  };
  const navigate = useNavigate();

  const { category, changeCategory } = useCategory();

  const activeClassPage = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "cursor-pointer px-5 md:px-8 py-2 transition-all duration-500 capitalize bg-base-200"
      : "cursor-pointer px-5 md:px-8 py-2 transition-all duration-500 capitalize hover:bg-base-200";

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        variants={variants}
        initial="hidden"
        animate="show"
        exit="exit"
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="bg-base-100 fixed top-0 left-0 bottom-0 max-w-52 md:max-w-96 z-20 py-10 pointer-events-auto"
      >
        <button
          onClick={() => setShowMenu(false)}
          className="text-2xl px-4 md:px-8"
        >
          <img
            src={CloseIcon}
            alt="close icon"
            className="cursor-pointer hover:opacity-70 transition-all duration-500"
          />
        </button>
        <motion.ul layout className="flex flex-col font-extrabold py-10">
          {categoryItem.map((item) => (
            <li
              onClick={() => {
                changeCategory(item);
                navigate("/");
              }}
              key={item}
              className={`cursor-pointer px-5 md:px-8 py-2 transition-all duration-500 capitalize ${category === item ? "bg-base-200" : "hover:bg-base-200"}`}
            >
              {item}
            </li>
          ))}
          {pageItem.map((page) => (
            <NavLink className={activeClassPage} key={page} to={`/${page}`}>
              <li>{page}</li>
            </NavLink>
          ))}
        </motion.ul>
      </motion.aside>
    </AnimatePresence>
  );
};
