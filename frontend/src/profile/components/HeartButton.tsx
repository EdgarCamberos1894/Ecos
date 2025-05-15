import { ComponentProps } from "react";
import { Heart } from "./ui/Heart";

type HeartButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const HeartButton = ({ children, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Heart />
      {children}
    </button>
  );
};
