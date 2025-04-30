import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header.tsx";
import { Footer } from "../Footer.tsx";
import Modal from "@/shared/components/Modal.tsx";
import RoleSelector from "@/auth/components/RoleSelector.tsx";
import LoginForm from "@/auth/components/LoginForm.tsx";

export const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register" | null>(null);

  const handleOpenLogin = () => {
    setModalMode("login");
    setIsModalOpen(true);
  };

  const handleOpenRegister = () => {
    setModalMode("register");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalMode(null);
    setIsModalOpen(false);
  };

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header onOpenLogin={handleOpenLogin} onOpenModal={handleOpenRegister} />
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        normalText={modalMode === "login" ? "Inicia sesión en " : "Registrate en "}
        highlightedText="ECOS"
      >
        {modalMode === "login" ? <LoginForm /> : <RoleSelector />}
      </Modal>
      <Outlet />
      <Footer />
    </div>
  );
};
