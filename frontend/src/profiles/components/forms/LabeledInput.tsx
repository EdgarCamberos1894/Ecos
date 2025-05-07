import React from "react";
import Input from "@/app/ui/Input";

interface LabeledInputProps {
  label: string;
  htmlFor?: string;
  className?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  error?: string;
}

const LabeledInput = ({ label, htmlFor, className = "", inputProps, error }: LabeledInputProps) => {
  return (
    <div className={`flex w-full flex-col items-start gap-1 self-stretch ${className}`}>
      <label htmlFor={htmlFor} className="text-2xl">
        {label}
      </label>
      <Input
        {...inputProps}
        className="rounded-none placeholder:text-sm placeholder:text-black focus:placeholder-transparent"
      />
      {error && <span className="text-sm text-red-500">{error}</span>}
    </div>
  );
};

export default LabeledInput;
