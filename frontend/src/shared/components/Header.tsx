import { useState } from "react";
import Modal from "./Modal";
import LoginForm from "@/auth/components/LoginForm";
import RoleSelector from "@/auth/components/RoleSelector";
import ForgotPasswordForm from "@/auth/components/ForgotPasswordForm";

export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"login" | "register" | "forgot">();

  const handleOpenLogin = () => {
    setModalMode("login");
    setIsModalOpen(true);
  };

  const handleOpenRegister = () => {
    setModalMode("register");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeModal = () => {
    if (modalMode === "login") {
      setModalMode("register");
      return;
    }

    setModalMode("login");
  };

  return (
    <>
      <header className="flex w-full items-center justify-around bg-[#B1B1B1] p-4 shadow">
        <button type="button" onClick={handleOpenLogin}>
          Iniciar Sesión
        </button>
        <button type="button" onClick={handleOpenRegister}>
          Crear cuenta
        </button>
      </header>
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        normalText={
          modalMode === "login"
            ? "Inicia sesión en "
            : modalMode === "register"
              ? "Registrate en "
              : "Olvidé mi contraseña"
        }
        highlightedText="ECOS"
      >
        {modalMode === "login" && (
          <div className="flex h-full flex-col items-center justify-center">
            <LoginForm />
            <div className="mt-9 flex flex-col items-center text-sm text-[#6E6E6E]">
              <u
                onClick={() => {
                  setModalMode("forgot");
                }}
                className="hover:cursor-pointer"
              >
                ¿Olvidaste tu contraseña?
              </u>
              <p>
                ¿No tienes una cuenta?{" "}
                <u onClick={handleChangeModal} className="hover:cursor-pointer">
                  Regístrate
                </u>
              </p>
            </div>
          </div>
        )}
        {modalMode === "register" && <RoleSelector onChange={handleChangeModal} />}

        {modalMode === "forgot" && (
          <div className="flex h-full flex-col items-center justify-center">
            <ForgotPasswordForm onChange={handleChangeModal} />
          </div>
        )}
      </Modal>
    </>
  );
};
