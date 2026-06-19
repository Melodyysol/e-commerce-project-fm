import { type ReactNode } from "react";
import { CartContext } from "../hooks/useCart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  return (
    <CartContext.Provider value={undefined}>{children}</CartContext.Provider>
  );
};
