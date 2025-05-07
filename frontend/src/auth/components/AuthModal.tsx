import { useState } from "react";
import Modal from "@/app/ui/Modal";
import LoginForm from "./LoginForm";
import RoleSelector from "./RoleSelector";
import RegistrationForm from "./RegistrationForm";
import ForgotPasswordForm from "./ForgotPasswordForm";

export type AuthMode = "login" | "register" | "forgot";

interface AuthModalProps {
  mode: AuthMode;
  onClose: () => void;
}

const AuthModal = ({ mode, onClose }: AuthModalProps) => {
  const [authMode, setAuthMode] = useState<AuthMode>(mode);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const switchToLogin = () => {
    setAuthMode("login");
    setSelectedRole(null);
  };

  const switchToRegister = () => {
    setAuthMode("register");
    setSelectedRole(null);
  };

  const switchToForgot = () => {
    setAuthMode("forgot");
  };

  return (
    <Modal
      onClose={onClose}
      firstNormalText={
        authMode === "login"
          ? "Inicia sesión en "
          : authMode === "register"
            ? "Registrate en "
            : "Olvidé mi contraseña"
      }
      highlightedText={authMode !== "forgot" ? "ECOS" : ""}
    >
      {authMode === "login" && (
        <div className="flex h-full flex-col items-center justify-center">
          <LoginForm />
          <div className="mt-9 flex flex-col items-center text-sm text-[#6E6E6E]">
            <u onClick={switchToForgot} className="hover:cursor-pointer">
              ¿Olvidaste tu contraseña?
            </u>
            <p>
              ¿No tienes una cuenta?{" "}
              <u onClick={switchToRegister} className="hover:cursor-pointer">
                Regístrate
              </u>
            </p>
          </div>
        </div>
      )}

      {authMode === "register" &&
        (selectedRole ? (
          <div className="flex h-full flex-col items-center justify-center">
            <RegistrationForm role={selectedRole} />
            <p className="mt-4 text-center text-sm">
              ¿Ya tenés cuenta?{" "}
              <u onClick={switchToLogin} className="hover:cursor-pointer">
                Iniciá sesión
              </u>
            </p>
          </div>
        ) : (
          <RoleSelector onSelectRole={setSelectedRole} />
        ))}

      {authMode === "forgot" && (
        <div className="flex h-full flex-col items-center justify-center">
          <ForgotPasswordForm onChange={switchToLogin} />
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
