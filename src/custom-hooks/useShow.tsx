import { useContext } from "react";
import { ShowContext } from "../hooks/useShow";

export const useShow = () => {
  const context = useContext(ShowContext);
  if (!context) {
    throw new Error("useShow must be use within ShowProvider");
  }
  return context;
};
