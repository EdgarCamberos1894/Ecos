import { ComponentProps } from "react";
import { Donate } from "@/app/ui/Icons";

type HeartButtonProps = ComponentProps<"button"> & {
  fromDonateSection?: boolean;
  children: React.ReactNode;
};

export const DonateButton = ({ fromDonateSection, children, ...buttonProps }: HeartButtonProps) => {
  return (
    <button type="button" {...buttonProps}>
      <Donate className={fromDonateSection ? "size-8" : "size-5 sm:size-8"} />
      {children}
    </button>
  );
};
