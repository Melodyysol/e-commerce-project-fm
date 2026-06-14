import { useEffect } from "react";
import Header from "../../components/Header";
import { RenderHomePage } from "./component/RenderHomePage";

export const HomePage = () => {
  useEffect(() => {
    document.title = "Home";
  }, []);

  return (
    <main>
      <Header />
      <RenderHomePage />
    </main>
  );
};
