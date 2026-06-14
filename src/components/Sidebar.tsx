// import { NavLink } from "react-router";
// import { useAuth } from "../custom-hooks/useAuth";
import { AnimatePresence, motion } from "motion/react";
import { TiTimes } from "react-icons/ti";

const itemForm: string[] = ["collections", "men", "women", "about", "collect"];

export const Sidebar = ({
  setShowMenu,
}: {
  setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  // const activeLink = ({ isActive }: { isActive: boolean }) =>
  //   isActive
  //     ? `bg-neutral text-neutral-content rounded-lg px-3 py-1 md:px-4 md:py-2 text-sm w-full block`
  //     : `text-base-content hover:bg-base-200 md:hover:bg-base-300 rounded-lg px-3 py-1 text-sm md:px-4 md:py-2 transition-all duration-500 w-full block`;

  const variants = {
    hidden: { opacity: 1, width: 0 },
    show: { opacity: 1, width: "100%" },
    staggerChildren: {
      beforeChildren: 0.3,
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        variants={variants}
        initial="hidden"
        animate="show"
        exit="hidden"
        transition={{ duration: 0.45, ease: "easeInOut" }}
        className="bg-base-100 fixed top-0 left-0 bottom-0 max-w-52 md:max-w-96 z-20 py-10 pointer-events-auto"
      >
        <button
          onClick={() => setShowMenu(false)}
          className="text-2xl px-4 md:px-8"
        >
          <TiTimes className="cursor-pointer hover:opacity-70 transition-all duration-500" />
        </button>
        <motion.ul layout className="flex flex-col font-extrabold py-10">
          {itemForm.map((item) => (
            <li
              key={item}
              className="cursor-pointer hover:bg-base-200 px-5 md:px-8 py-2 transition-all duration-500 uppercase"
            >
              {item}
            </li>
          ))}
        </motion.ul>
      </motion.aside>
    </AnimatePresence>
  );
};
