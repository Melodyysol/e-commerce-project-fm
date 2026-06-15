import { useState, type ReactNode } from "react";
import { ShowContext } from "../hooks/useShow";

export const ShowProvider = ({ children }: { children: ReactNode }) => {
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const toggleShow = (show: "modal" | "cart") => {
    if (show === "modal") {
      setShowModal((prev) => !prev);
    }else {
      setShowCart((prev) => !prev);
    }
  };

  return (
    <ShowContext.Provider value={{ showModal, showCart, toggleShow }}>
      {children}
    </ShowContext.Provider>
  );
};
