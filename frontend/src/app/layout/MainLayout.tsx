import { Outlet } from "react-router";
import { Header } from "./Header/Header.tsx";
import { Footer } from "./Footer/Footer.tsx";

export const MainLayout = () => {
  return (
    <div className="min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
};
