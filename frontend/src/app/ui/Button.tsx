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
  let bgColor = "";

  switch (bgType) {
    case "primary":
      bgColor = "var(--color-ecos-orange-light)";
      break;
    case "secondary":
      bgColor = "var(--color-ecos-blue)";
      break;
  }

  return (
    <button
      onClick={onClick}
      type={type}
      style={{ backgroundColor: bgColor }}
      className={`flex h-[50px] items-center justify-center gap-2.5 rounded-[27px] border border-solid px-4 py-2 font-medium text-[#291117] ${bgColor} ${className}`}
    >
      {startIcon}
      {children}
    </button>
  );
};

export default Button;
