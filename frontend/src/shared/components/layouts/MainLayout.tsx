import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header.tsx";
import { Footer } from "../Footer.tsx";
import PopUp from "@/shared/components/PopUp.tsx";
import RoleSelector from "@/auth/components/RoleSelector.tsx";
import LoginForm from "@/auth/components/LoginForm.tsx";

export const MainLayout = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupMode, setPopupMode] = useState<"login" | "register" | null>(null);

  const handleOpenLogin = () => {
    setPopupMode("login");
    setIsPopupOpen(true);
  };

  const handleOpenRegister = () => {
    setPopupMode("register");
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setPopupMode(null);
  };

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header onOpenLogin={handleOpenLogin} onOpenPopup={handleOpenRegister} />
      <PopUp
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        normalText={popupMode === "login" ? "Inicia sesión en " : "Registrate en "}
        highlightedText=" ECOS"
      >
        {popupMode === "login" ? <LoginForm /> : <RoleSelector />}
      </PopUp>
      <Outlet />
      <Footer />
    </div>
  );
};
