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
      className={`text-ecos-blue focus-within:border-ecos-orange flex w-full items-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-3 shadow-sm transition-colors focus-within:ring-3 focus-within:ring-orange-100 ${classNameContainer}`}
    >
      {startIcon}
      <input
        {...props}
        className={`w-full min-w-0 bg-transparent placeholder:text-slate-400 focus:outline-none ${className}`}
      />
      {endIcon}
    </div>
  );
};

export default Input;
