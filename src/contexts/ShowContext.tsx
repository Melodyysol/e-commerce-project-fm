import { useState, type ReactNode } from "react";
import { ShowContext } from "../hooks/useShow";

export const ShowProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const toggleShow = (show: "modal" | "cart" | "profile") => {
    if (show === "modal") {
      setShowModal((prev) => !prev);
    } else if (show === "cart" && !showProfile) {
      setShowCart((prev) => !prev);
    } else if (show === "cart" && showProfile) {
      setShowProfile(false);
      setShowCart((prev) => !prev);
    } else if (show === "profile" && !showCart) {
      setShowProfile((prev) => !prev);
    } else if (show === "profile" && showCart) {
      setShowCart(false);
      setShowProfile((prev) => !prev);
    }
  };

  return (
    <ShowContext.Provider
      value={{ showModal, showCart, showProfile, toggleShow }}
    >
      {children}
    </ShowContext.Provider>
  );
};
