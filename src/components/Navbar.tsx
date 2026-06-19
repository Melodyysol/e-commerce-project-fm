import { useState, useContext } from "react";

import { BsCart3 } from "react-icons/bs";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../hooks/useTheme";
import { useAuth } from "../custom-hooks/useAuth";
import userImage from "../assets/images/image-avatar.png";
import logo from "../assets/images/logo.svg";
import { BiMenu } from "react-icons/bi";
import { Sidebar } from "./Sidebar";
import { Cart } from "../pages/product/component/Cart";
import { useShow } from "../custom-hooks/useShow";
import { NavLink } from "react-router";
const itemForm: string[] = ["collections", "men", "women", "about", "contact"];
const Navbar = () => {
  const context = useContext(ThemeContext);
  const { showCart, toggleShow } = useShow();

  const activeClassName = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-neutral-content capitalize text-sm cursor-pointer bg-base-content rounded-md px-2 py-1 transition-all duration-500"
      : "text-neutral-content capitalize text-sm cursor-pointer hover:bg-base-content rounded-md px-2 py-1 transition-all duration-500";

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
    <nav className="relative w-screen bg-base-200 py-2">
      {showMenu && (
        <div className="fixed inset-0 z-40 bg-neutral-300/30">
          <Sidebar setShowMenu={setShowMenu} />{" "}
        </div>
      )}
      <div className="mx-auto w-11/12 flex justify-between">
        <div className="relative flex items-center gap-5 justify-between flex-1">
          <div className="flex items-center gap-x-1 md:gap-x-20">
            <button
              onClick={() => setShowMenu(true)}
              className={`md:hidden hover:bg-base-300 rounded-md text-xl md:text-3xl p-2 md:px-4 md:py-3 cursor-pointer transition-all duration-500 tooltip tooltip-bottom`}
              data-tip="Menu"
            >
              <BiMenu />
            </button>
            <div>
              <img src={logo} alt="logo" />
            </div>
            <ul className="hidden md:flex gap-4 items-center">
              {itemForm.map((item) => (
                <li key={item}>
                  <NavLink
                    to={{
                      pathname: `/${item}`,
                      search: `${item}`,
                    }}
                    className={activeClassName}
                  >
                    {item}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex gap-5 items-center">
          <button
            onClick={toggleTheme}
            className="cursor-pointer text-xl md:text-2xl tooltip tooltip-bottom"
            data-tip={theme === "winter" ? "Light mode" : "Dark mode"}
          >
            {theme === "winter" ? (
              <MdDarkMode className="text-base-content" />
            ) : (
              <MdLightMode className="text-base-content" />
            )}
          </button>

          <div className="relative btn btn-ghost btn-circle btn-md">
            <button
              onClick={() => toggleShow("cart")}
              className="rounded-full cursor-pointer text-lg p-1 transition-all duration-500 text-base-content tooltip tooltip-bottom"
              data-tip="Cart"
            >
              <BsCart3 />
            </button>

            <span className="absolute top-0 right-0 badge badge-xs badge-primary">
              {totalQuantity}
            </span>
          </div>
          <div
            className="w-8 cursor-pointer rounded-full hover:border-2 border-accent transition-all duration-500 tooltip tooltip-bottom"
            data-tip="Profile"
          >
            <img src={userImage} alt="user-image" />
          </div>
        </div>
      </div>
      {showCart && <Cart />}
    </nav>
  );
};

export default Navbar;
