import { createContext } from "react";
import type { Category } from "../types/categoryType";

type categoryContextType = {
  category: Category;
  changeCategory: (category: Category) => void;
};

export const CategoryContext = createContext<categoryContextType | undefined>(
  undefined,
);
