import { useState, useContext } from "react";

import CartIcon from "../assets/icons/icon-cart.svg";
import MenuIcon from "../assets/icons/icon-menu.svg";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { ThemeContext } from "../hooks/useTheme";
import userImage from "../assets/images/image-avatar.png";
import logo from "../assets/images/logo.svg";
import { Sidebar } from "./Sidebar";
import { Cart } from "../pages/product/component/Cart";
import { useShow } from "../custom-hooks/useShow";
import { useQuery } from "@tanstack/react-query";
import { fetchCart } from "../services/fetchCart";
import { useCategory } from "../custom-hooks/useCategory";
import { categoryItem, pageItem } from "../utilities/category";
import { NavLink, useNavigate } from "react-router";
import { Profile } from "../pages/product/component/Profile";
const Navbar = () => {
  const context = useContext(ThemeContext);
  const { showCart, toggleShow, showProfile } = useShow();
  const navigate = useNavigate();

  const { data: carts = [] } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
    throwOnError: false,
  });

  if (!context) {
    throw new Error("themeContext must be use within ThemeProvider");
  }
  const { theme, toggleTheme } = context;

  const [showMenu, setShowMenu] = useState(false);
  const [userProfile, setUserProfile] = useState(userImage);
  const { category, changeCategory } = useCategory();

  const activeClassPage = ({ isActive }: { isActive: boolean }) =>
    isActive
      ? "text-neutral-content capitalize text-sm cursor-pointer rounded-md px-2 py-1 transition-all duration-500 bg-base-content"
      : "text-neutral-content capitalize text-sm cursor-pointer rounded-md px-2 py-1 transition-all duration-500 hover:bg-base-content";

  let totalQuantity = 0;
  // for (let i = 0; i < carts.length; i++) {
  //   const quantity = carts[i].quantity;
  //   totalQuantity += quantity;
  // }

  carts.map((cart) => {
    totalQuantity = totalQuantity + cart.quantity;
  });

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
              <img src={MenuIcon} alt="menu-icon" />
            </button>
            <div>
              <img src={logo} alt="logo" />
            </div>
            <ul className="hidden md:flex gap-4 items-center">
              {categoryItem.map((item) => (
                <li
                  key={item}
                  className={`text-neutral-content capitalize text-sm cursor-pointer rounded-md px-2 py-1 transition-all duration-500 ${category === item ? "bg-base-content" : "hover:bg-base-content"}`}
                  onClick={() => {
                    changeCategory(item);
                    navigate("/");
                  }}
                >
                  {item}
                </li>
              ))}
              {pageItem.map((page) => (
                <NavLink className={activeClassPage} key={page} to={`/${page}`}>
                  <li>{page}</li>
                </NavLink>
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

          <button
            onClick={() => toggleShow("cart")}
            className="relative btn btn-ghost btn-circle btn-md tooltip tooltip-bottom"
            data-tip="Cart"
          >
            <span className="rounded-full cursor-pointer text-lg p-1 transition-all duration-500 text-base-content">
              <img src={CartIcon} alt="cart-icon" />
            </span>

            <span className="absolute top-0 right-0 badge badge-xs badge-primary">
              {totalQuantity}
            </span>
          </button>
          <button
            onClick={() => toggleShow("profile")}
            className="w-8 h-8 cursor-pointer rounded-full hover:border-2 border-accent transition-all duration-500 tooltip tooltip-bottom"
            data-tip="Profile"
          >
            <img src={userProfile} alt="user-image" className="rounded-full" />
          </button>
        </div>
      </div>
      {showCart && <Cart />}
      {showProfile && (
        <Profile userProfile={userProfile} setUserProfile={setUserProfile} />
      )}
    </nav>
  );
};

export default Navbar;
