import { createContext } from "react";

type ShowContextType = {
  showModal: boolean;
  showCart: boolean;
  toggleShow: (show: "modal" | "cart") => void;
};

export const ShowContext = createContext<ShowContextType | undefined>(
  undefined,
);
