import { createContext } from "react";
import type { ThemeContextType } from "../types/themeType";

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);
