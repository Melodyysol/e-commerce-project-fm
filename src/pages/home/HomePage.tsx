import { useEffect } from "react";
import Header from "../../components/Header";

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <Header />
    </main>
  );
};
