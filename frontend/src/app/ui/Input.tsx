import { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Input = ({ className = "", startIcon, endIcon, ...props }: InputProps) => {
  return (
    <div
      className={`border-ecos-blue text-ecos-blue placeholder-ecos-blue flex w-[361px] rounded-[1.75rem] border px-[1.875rem] py-2 md:w-[704px] xl:w-[1161px] ${className}`}
    >
      {startIcon}
      <input {...props} className={`w-full focus:outline-none ${className}`} />
      {endIcon}
    </div>
  );
};

export default Input;
