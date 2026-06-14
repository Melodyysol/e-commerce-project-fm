export type Theme = "dracula" | "winter";

export type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void
};
