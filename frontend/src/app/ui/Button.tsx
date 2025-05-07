import { ReactNode, MouseEventHandler } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
}

const Button = ({ startIcon, children, onClick, type = "button", className = "" }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className={`flex h-[50px] w-full items-center justify-center gap-2.5 rounded-[27px] border border-solid border-[#ECE6F0] bg-[#B4B4B4] px-4 py-2 font-medium text-[#291117] ${className}`}
    >
      {startIcon}
      {children}
    </button>
  );
};

export default Button;
