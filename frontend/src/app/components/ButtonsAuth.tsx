interface LoginButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const LoginButton = ({ onClick, className, label }: LoginButtonProps) => (
  <button type="button" onClick={onClick} className={className}>
    {label ?? "Iniciar Sesión"}
  </button>
);

interface RegisterButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const RegisterButton = ({ onClick, className, label }: RegisterButtonProps) => (
  <button type="button" onClick={onClick} className={className}>
    {label ?? "Crear cuenta"}
  </button>
);
