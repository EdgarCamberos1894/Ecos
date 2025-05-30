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
          ? "Inicio de sesión en"
          : authMode === "register"
            ? "Regístrate en"
            : "Olvidé mi contraseña"
      }
      highlightedText={authMode !== "forgot" ? "ECOS" : ""}
      className="h-full max-h-[516px] w-full max-w-[700px] gap-12"
    >
      {authMode === "login" && (
        <div className="flex h-full flex-col items-center justify-start gap-9">
          <LoginForm />
          <div className="text-ecos-blue flex flex-col items-center pb-7 text-sm">
            <u onClick={switchToForgot} className="mb-2 hover:cursor-pointer">
              ¿Olvidaste tu contraseña?
            </u>
            <p onClick={switchToRegister} className="hover:cursor-pointer">
              ¿No tienes una cuenta? Regístrate
            </p>
          </div>
        </div>
      )}

      {authMode === "register" &&
        (selectedRole ? (
          <div className="flex h-full flex-col items-center justify-start gap-6">
            <RegistrationForm role={selectedRole} />
            <p className="text-ecos-blue text-center text-sm">
              ¿Ya tienes cuenta?{" "}
              <u onClick={switchToLogin} className="hover:cursor-pointer">
                Iniciar sesión
              </u>
            </p>
          </div>
        ) : (
          <RoleSelector onSelectRole={setSelectedRole} />
        ))}

      {authMode === "forgot" && (
        <div className="flex h-full flex-col items-center justify-start">
          <ForgotPasswordForm onChange={switchToLogin} />
        </div>
      )}
    </Modal>
  );
};

export default AuthModal;
