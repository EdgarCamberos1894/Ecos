import { ComponentProps } from "react";
import { Heart } from "./ui/Heart";

type HeartButtonProps = ComponentProps<"button"> & {
  children: React.ReactNode;
};

export const HeartButton = ({ children, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Heart className="size-5 sm:size-8" />
      {children}
    </button>
  );
};
