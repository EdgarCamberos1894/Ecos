interface LoginButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const LoginButton = ({ onClick, className, label }: LoginButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`hover:text-ecos-orange-light focus-visible:outline-ecos-orange-light transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${className ?? ""}`}
  >
    {label ?? "Iniciar sesion"}
  </button>
);

interface RegisterButtonProps {
  onClick: () => void;
  className?: string;
  label?: string;
}

export const RegisterButton = ({ onClick, className, label }: RegisterButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`bg-ecos-orange-light text-ecos-blue focus-visible:outline-ecos-orange-light rounded-md px-4 py-2 font-semibold transition-colors hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 ${className ?? ""}`}
  >
    {label ?? "Crear cuenta"}
  </button>
);
