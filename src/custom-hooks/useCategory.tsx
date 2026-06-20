import { useContext } from "react";
import { CategoryContext } from "../hooks/useCategory";

export const useCategory = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("categoryContext must be used within CategoryProvider");
  }
  return context;
};
