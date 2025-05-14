import { ComponentProps } from "react";
import { Donate } from "./ui/Donate";

type HeartButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const DonateButton = ({ children, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Donate />
      {children}
    </button>
  );
};
