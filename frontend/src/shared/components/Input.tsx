import { InputHTMLAttributes } from "react";

const Input = ({ ...props }: InputHTMLAttributes<HTMLInputElement>) => {
  return (
    <input
      {...props}
      className="rounded-[27px] border border-solid border-[#B4B4B4] px-4 py-2 text-[#291117] placeholder-[#291117] outline-none"
    />
  );
};

export default Input;
