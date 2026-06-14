import { useEffect, useState, type ReactNode } from "react";
import { ThemeContext } from "../hooks/useTheme";
import type { Theme } from "../types/theme";

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "winter";
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "winter" ? "winter" : "dracula";
  });

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dracula" ? "winter" : "dracula"));
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
