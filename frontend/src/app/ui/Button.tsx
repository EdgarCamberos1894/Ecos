import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  bgType?: "primary" | "secondary" | "";
}

const Button = ({
  startIcon,
  children,
  onClick,
  type = "button",
  className = "",
  bgType = "",
}: ButtonProps) => {
  const bgClass =
    bgType === "primary" ? "button-primary" : bgType === "secondary" ? "button-secondary" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex h-[50px] items-center justify-center px-4 py-2 font-medium ${bgClass} ${className}`}
    >
      {startIcon}
      {children}
    </button>
  );
};

export default Button;
