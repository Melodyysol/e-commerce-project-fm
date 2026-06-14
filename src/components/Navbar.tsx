import { useState, useContext } from "react";

import { BsCart3 } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link } from "react-router";
// import { CartContext } from "../hooks/useCart";
import { ThemeContext } from "../hooks/useTheme";
import { useAuth } from "../custom-hooks/useAuth";
import userImage from "../assets/images/image-avatar.png";
import logo from "../assets/images/logo.svg";
import { BiMenu } from "react-icons/bi";
import { Sidebar } from "./Sidebar";

const Navbar = () => {
  // const { carts } = useContext(CartContext);
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("themeContext must be use within ThemeProvider");
  }
  const { theme, toggleTheme } = context;

  const currentUser = useAuth();

  const [showMenu, setShowMenu] = useState(false);

  const totalQuantity = 0;

  if (!currentUser) {
    throw new Error("useUser must be used within UserProvider");
  }

  // carts.map((cart) => {
  //   totalQuantity = totalQuantity + cart.quantity;
  // });

  return (
    <nav className="w-screen bg-base-200 py-2">
      {showMenu && (
        <div className="fixed inset-0 z-30 bg-neutral-300/30">
          <Sidebar setShowMenu={setShowMenu} />{" "}
        </div>
      )}
      <div className="mx-auto w-11/12 flex justify-between">
        <div className="relative flex items-center gap-5 justify-between flex-1">
          <div className="flex items-center gap-x-1">
            <button
              onClick={() => setShowMenu(true)}
              className={`hover:bg-base-300 rounded-md text-xl md:text-3xl p-2 md:px-4 md:py-3 cursor-pointer transition-all duration-500`}
            >
              <BiMenu />
            </button>
            <div>
              <img src={logo} alt="logo" />
            </div>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button
            onClick={toggleTheme}
            className="cursor-pointer text-xl md:text-2xl"
          >
            {theme === "winter" ? (
              <MdDarkMode className="text-base-content" />
            ) : (
              <MdLightMode className="text-base-content" />
            )}
          </button>

          <Link
            to="/cart"
            className="relative btn btn-ghost btn-circle btn-md cursor-pointer"
          >
            <div className="rounded-full text-lg p-1 transition-all duration-500 text-base-content">
              <BsCart3 />
            </div>

            <div className="absolute top-0 right-0 badge badge-xs badge-primary">
              {totalQuantity}
            </div>
          </Link>
          <div className="w-8">
            <img src={userImage} alt="user-image" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
