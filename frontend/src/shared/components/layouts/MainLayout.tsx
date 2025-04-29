import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header.tsx";
import { Footer } from "../Footer.tsx";
import PopUp from "@/shared/components/PopUp.tsx";
import RoleSelector from "@/auth/components/RoleSelector.tsx";

export const MainLayout = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header
        onOpenPopup={() => {
          setIsPopupOpen(true);
        }}
      />
      <PopUp
        isOpen={isPopupOpen}
        onClose={() => {
          setIsPopupOpen(false);
        }}
        normalText="Registrate en "
        highlightedText=" ECOS"
      >
        <RoleSelector />
      </PopUp>
      <Outlet />
      <Footer />
    </div>
  );
};
