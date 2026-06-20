import { createContext } from "react";

type ShowContextType = {
  showModal: boolean;
  showCart: boolean;
  showProfile: boolean;
  toggleShow: (show: "modal" | "cart" | "profile") => void;
};

export const ShowContext = createContext<ShowContextType | undefined>(
  undefined,
);
