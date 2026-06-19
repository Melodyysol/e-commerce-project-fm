import { createContext } from "react";

type CartContextType = {
  id: string;
};



export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);