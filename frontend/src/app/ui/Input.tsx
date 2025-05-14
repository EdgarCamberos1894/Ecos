import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Input = ({ className = "", startIcon, endIcon, ...props }: InputProps) => {
  return (
    <div
      className={`rounded-[27px] border border-[#19233A] px-4 py-2 text-[#291117] placeholder-[#19233A] ${className}`}
    >
      {startIcon}
      <input {...props} className={`w-full focus:outline-none ${className}`} />
      {endIcon}
    </div>
  );
};

export default Input;
