import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  classNameContainer?: string;
}

const Input = ({
  className = "",
  startIcon,
  endIcon,
  classNameContainer = "",
  ...props
}: InputProps) => {
  return (
    <div
      className={`border-ecos-blue placeholder-ecos-blue rounded-[1.688rem] border px-4 py-2 text-[#291117] ${classNameContainer}`}
    >
      {startIcon}
      <input {...props} className={`w-full focus:outline-none ${className}`} />
      {endIcon}
    </div>
  );
};

export default Input;
