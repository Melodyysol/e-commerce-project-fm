import { useState, type ReactNode } from "react";
import { CategoryContext } from "../hooks/useCategory";
import type { Category } from "../types/categoryType";


const CategoryProvider = ({ children }: { children: ReactNode }) => {
  const [category, setCategory] = useState<Category>(
    "collections",
  );

  const changeCategory = (item: Category) => {
    setCategory(item);
  };

  return (
    <CategoryContext.Provider value={{ category, changeCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
