import { useState } from "react";
import { Outlet } from "react-router";
import { Header } from "../Header.tsx";
import { Footer } from "../Footer.tsx";
import Modal from "@/shared/components/Modal.tsx";
import RoleSelector from "@/auth/components/RoleSelector.tsx";

export const MainLayout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
      <Header
        onOpenPopup={() => {
          setIsModalOpen(true);
        }}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        normalText="Registrate en"
        highlightedText="ECOS"
      >
        <RoleSelector />
      </Modal>
      <Outlet />
      <Footer />
    </div>
  );
};
